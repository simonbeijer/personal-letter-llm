import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { cookies } from 'next/headers';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Simple in-memory rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT = 5; // requests per minute per user
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

function checkRateLimit(userId) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(userId) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimitMap.set(userId, recentRequests);
  return true;
}

export async function POST(request) {
  // Check authentication
  let user;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    user = await verifyAuth(token);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid or expired authentication' },
      { status: 401 }
    );
  }

  // Check rate limit
  if (!checkRateLimit(user.id)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please wait before making another request.' },
      { status: 429 }
    );
  }
  try {
    const { cv, jobAd, language = 'english' } = await request.json();

    if (!cv || !jobAd) {
      return NextResponse.json(
        { error: 'CV and job advertisement are required' },
        { status: 400 }
      );
    }

    if (cv.length < 50 || jobAd.length < 50) {
      return NextResponse.json(
        { error: 'CV and job advertisement must be at least 50 characters' },
        { status: 400 }
      );
    }

    if (language && !['english', 'swedish'].includes(language)) {
      return NextResponse.json(
        { error: 'Language must be either "english" or "swedish"' },
        { status: 400 }
      );
    }

    // ===== CHAIN OF THOUGHT IMPLEMENTATION =====
    
    // STEP 1: STRATEGIC ANALYSIS - Extract most important job requirements and CV matches
    const analysisModel = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.3, // Lower temperature for analysis
      }
    });

    const analysisPrompt = `Analyze the match between this CV and job posting. Extract CONCRETE, SPECIFIC information for a compelling cover letter.

**CV:** ${cv}

**JOB POSTING:** ${jobAd}

CRITICAL: Focus on CONCRETE, MEASURABLE information:

1. **Name Extraction**: Look for person's name in various formats:
   - "Name: John Smith" or "John Smith" at top
   - Email signatures like "john.smith@email.com" 
   - Contact sections, headers, or introductions
   - If unclear, look for "I am [name]" or similar patterns

2. **Job Requirements**: Extract 3 SPECIFIC technical/role requirements (not generic skills)

3. **Concrete Achievements**: Find CV examples WITH NUMBERS/METRICS:
   - "increased sales by X%", "managed team of X people", "reduced costs by X"
   - "built X systems", "improved X by Y%", "delivered X projects"
   - NO generic phrases like "strong experience" or "good skills"

4. **Unique Hook**: ONE specific, measurable achievement most relevant to this job
   - Must include numbers, concrete results, or specific technologies
   - FORBIDDEN: "strong combination", "well-suited", "proven track record"
   - REQUIRED: Specific accomplishment with measurable impact

Return ONLY a valid JSON object:
{
  "topJobRequirements": ["specific requirement 1", "specific requirement 2", "specific requirement 3"],
  "matchingExamples": ["concrete example with details", "another specific example", "third specific example"],
  "bestAchievements": ["achievement with numbers", "another measurable result"],
  "uniqueHook": "ONE specific achievement with numbers/metrics most relevant to this job",
  "candidateName": "actual name extracted from CV or 'Unknown' if not found",
  "targetRole": "exact job title from posting"
}`;

    console.log('🔍 Step 1: Strategic Analysis...');
    const analysisResult = await analysisModel.generateContent(analysisPrompt);
    const analysisText = analysisResult.response.text();
    
    // Parse JSON response
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
      
      // Validate that we got concrete information
      if (!analysis.candidateName || analysis.candidateName === 'Unknown') {
        console.warn('Name extraction failed, using better fallback');
        analysis.candidateName = 'the applicant'; // More natural than "Candidate"
      }
      
      // Ensure uniqueHook is concrete
      if (!analysis.uniqueHook || analysis.uniqueHook.includes('strong combination') || analysis.uniqueHook.includes('well-suited')) {
        console.warn('uniqueHook too generic, using better fallback');
        analysis.uniqueHook = 'proven experience in relevant technology and successful project delivery';
      }
      
    } catch (parseError) {
      // Better fallback if JSON parsing fails
      console.error('JSON parsing failed, using concrete fallback analysis');
      analysis = {
        topJobRequirements: ["technical proficiency", "project experience", "problem-solving ability"],
        matchingExamples: ["hands-on technical experience", "successful project delivery", "relevant industry knowledge"],
        bestAchievements: ["delivered successful projects", "gained valuable experience"],
        uniqueHook: "proven ability to deliver results in technical projects",
        candidateName: "the applicant",
        targetRole: "this role"
      };
    }

    console.log('📊 Strategic Analysis:', analysis);

    // STEP 2: SIMPLE OPENING GENERATION - Hello/Hej format
    const openingModel = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.6,
      }
    });

    const languageStyle = language === 'swedish' 
      ? 'Swedish starting with "Hej" (simple and direct)'
      : 'English starting with "Hello" (simple and direct)';

    const openingPrompt = `Create a natural, conversational opening that avoids corporate speak using this analysis:

**ANALYSIS:** ${JSON.stringify(analysis, null, 2)}

STRICT REQUIREMENTS:
- Start with "${language === 'swedish' ? 'Hej' : 'Hello'}" greeting
- Use candidate name or "I'm" if name unclear  
- Express genuine interest/excitement about the specific role
- Include the concrete achievement from uniqueHook (with specifics/numbers if available)
- Sound natural and conversational, NOT corporate
- Maximum 2 sentences
- Language: ${languageStyle}

FORBIDDEN PHRASES (will be rejected):
- "strong combination of skills"
- "aligns well with requirements" 
- "proven track record"
- "well-suited for"
- "applying for the position"

GOOD EXAMPLES:
- English: "Hello! I'm Sarah, and I'm excited about the Frontend Developer role because I built interfaces that increased user engagement by 40%."
- Swedish: "Hej! Jag heter Erik och är intresserad av utvecklartjänsten eftersom jag har ökat försäljningen med 25% genom e-handelslösningar."

Use "excited about" or "interested in" instead of "applying for".
Focus on ONE concrete achievement that matters for THIS job.

Generate ONLY the opening, nothing else.`;

    console.log('👋 Step 2: Simple Opening Generation...');
    const openingResult = await openingModel.generateContent(openingPrompt);
    let opening = openingResult.response.text().trim();
    
    // Validate opening doesn't contain forbidden phrases
    const forbiddenPhrases = [
      'strong combination', 'aligns well', 'proven track record', 
      'well-suited', 'applying for the position', 'skills and experience'
    ];
    
    const containsForbidden = forbiddenPhrases.some(phrase => 
      opening.toLowerCase().includes(phrase.toLowerCase())
    );
    
    if (containsForbidden) {
      console.warn('Opening contains corporate speak, using fallback');
      if (language === 'swedish') {
        const name = analysis.candidateName !== 'the applicant' ? `Jag heter ${analysis.candidateName} och` : 'Jag';
        opening = `Hej! ${name} är intresserad av ${analysis.targetRole}.`;
      } else {
        const name = analysis.candidateName !== 'the applicant' ? `I'm ${analysis.candidateName}, and I'm` : "I'm";
        opening = `Hello! ${name} excited about the ${analysis.targetRole} role.`;
      }
    }
    
    console.log('✨ Generated Opening:', opening);

    // STEP 3: CUSTOMIZED LETTER ASSEMBLY - Following the 6 guidelines
    const letterModel = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      }
    });

    const closingStyle = language === 'swedish' 
      ? '"Jag ser fram emot att höra från er och berätta mer om hur jag kan bidra." + "Vänliga hälsningar"'
      : '"I look forward to meeting you and having the opportunity to share more about myself." + "Best regards"';

    const letterPrompt = `Write a complete, natural cover letter using this opening and analysis:

**OPENING TO USE EXACTLY:** ${opening}

**STRATEGIC ANALYSIS:** ${JSON.stringify(analysis, null, 2)}

Structure following the 6 guidelines:
1. **Opening**: Use the provided opening EXACTLY as written
2. **Body paragraph**: Use 2-3 concrete examples from matchingExamples and bestAchievements 
   - Show specific results with numbers when available
   - Demonstrate qualities through actions, not generic claims
   - Address the topJobRequirements specifically
3. **Closing**: End with positive statement like ${closingStyle}

CRITICAL REQUIREMENTS:
- Total length: 140-200 words (concise and focused)
- Language: ${language}
- Sound conversational and natural, NOT corporate
- Use concrete examples with specific details/numbers
- Address their exact job requirements from analysis

ABSOLUTELY FORBIDDEN PHRASES:
- "team player", "work under pressure", "detail-oriented"
- "strong combination", "proven track record", "well-suited"
- "extensive experience", "passion for", "dedicated to"
- Generic claims without specific examples

FOCUS ON:
- Specific technologies, tools, or methods used
- Measurable results and achievements  
- Concrete examples of problem-solving
- Natural, conversational tone throughout

Generate the complete cover letter now.`;

    console.log('📝 Step 3: Customized Letter Assembly...');
    const letterResult = await letterModel.generateContent(letterPrompt);
    const coverLetter = letterResult.response.text();

    console.log('✅ Chain of thought generation completed successfully');

    // Return the result with debug information like your example
    return NextResponse.json({ 
      coverLetter,
      // Optional debug info for development
      debug: {
        analysis,
        opening,
        steps: ['Strategic Analysis', 'Simple Opening Generation', 'Customized Letter Assembly']
      }
    });
  } catch (error) {
    console.error('Error in chain of thought generation:', error);
    
    const status = error.message?.includes('rate') || error.message?.includes('quota') ? 429 : 500;
    const message = status === 429 
      ? 'Rate limit exceeded. Please try again later.'
      : 'Failed to generate cover letter. Please try again.';
    
    return NextResponse.json({ error: message }, { status });
  }
}