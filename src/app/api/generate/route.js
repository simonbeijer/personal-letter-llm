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

    const analysisPrompt = `Analyze the match between this CV and job posting. Extract key insights for writing a compelling cover letter.

**CV:** ${cv}

**JOB POSTING:** ${jobAd}

Focus on finding the MOST IMPORTANT information first:
1. Top 3 specific job requirements from the posting
2. Best CV examples that demonstrate these requirements (with specific details/numbers)
3. 1-2 quantifiable achievements from CV that prove value
4. What makes this candidate uniquely qualified (not generic qualities)
5. Extract candidate name from CV

Return ONLY a valid JSON object with this structure:
{
  "topJobRequirements": ["requirement 1", "requirement 2", "requirement 3"],
  "matchingExamples": ["specific CV example 1", "specific CV example 2", "specific CV example 3"],
  "bestAchievements": ["quantifiable achievement 1", "quantifiable achievement 2"],
  "uniqueQualification": "what makes them special for this specific role",
  "candidateName": "extract their name from CV",
  "targetRole": "extract the job title they're applying for"
}`;

    console.log('🔍 Step 1: Strategic Analysis...');
    const analysisResult = await analysisModel.generateContent(analysisPrompt);
    const analysisText = analysisResult.response.text();
    
    // Parse JSON response
    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      console.error('JSON parsing failed, using fallback analysis');
      analysis = {
        topJobRequirements: ["relevant skills", "experience", "team collaboration"],
        matchingExamples: ["relevant work experience", "matching technical skills", "proven results"],
        bestAchievements: ["proven track record", "successful projects"],
        uniqueQualification: "strong combination of skills and experience",
        candidateName: "Candidate",
        targetRole: "the position"
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

    const openingPrompt = `Create a simple, direct opening for a cover letter using this analysis:

**ANALYSIS:** ${JSON.stringify(analysis, null, 2)}

Requirements for the opening:
- Start with simple "${language === 'swedish' ? 'Hej' : 'Hello'}" greeting
- Add candidate's name naturally
- Mention the specific role they're applying for
- Brief reason why they're the right fit (most important qualification)
- Keep it professional but accessible (no jargon)
- Maximum 2 sentences
- Language: ${languageStyle}

Example format:
- English: "Hello! I'm [name] and I'm applying for the [role] position because [main qualification]."
- Swedish: "Hej! Jag heter [name] och söker tjänsten som [role] eftersom [main qualification]."

Generate ONLY the opening, nothing else.`;

    console.log('👋 Step 2: Simple Opening Generation...');
    const openingResult = await openingModel.generateContent(openingPrompt);
    const opening = openingResult.response.text().trim();
    
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

    const letterPrompt = `Write a complete cover letter using this opening and analysis:

**OPENING TO USE:** ${opening}

**STRATEGIC ANALYSIS:** ${JSON.stringify(analysis, null, 2)}

**ORIGINAL CV:** ${cv}

**JOB POSTING:** ${jobAd}

Structure following the 6 guidelines:
1. **Opening**: Use the provided opening exactly as written
2. **Body paragraph**: Show don't tell - Use 2-3 specific examples from analysis that demonstrate qualities (no clichés like "team player" or "work under pressure")
3. **Closing paragraph**: End with positive statement like ${closingStyle}

Requirements:
- Total length: 140-200 words (concise and focused)
- Language: ${language}
- Professional but accessible (no jargon, not overly formal)
- Customize for this specific job (address their exact requirements)
- Use specific examples with details/numbers when possible
- NO CLICHÉS - be specific about how they work and what kind of person they are
- End positively and professionally

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