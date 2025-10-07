import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { cookies } from 'next/headers';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Simple in-memory rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 1000;

function checkRateLimit(userId) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(userId) || [];
  const recentRequests = userRequests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(userId, recentRequests);
  return true;
}

export async function POST(request) {
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

  if (!checkRateLimit(user.id)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please wait before making another request.' },
      { status: 429 }
    );
  }

  try {
    const { cv, jobAd, language = 'english' } = await request.json();

    // Validation
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

    if (!['english', 'swedish'].includes(language)) {
      return NextResponse.json(
        { error: 'Language must be either "english" or "swedish"' },
        { status: 400 }
      );
    }

    // ONE AI CALL - That's it!
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    });

    const prompt = `You are a professional cover letter writer. Write a personalized cover letter in ${language}.

**CANDIDATE'S CV:**
${cv}

**JOB POSTING:**
${jobAd}

**INSTRUCTIONS:**

Write a cover letter that is:
- 150-250 words total
- Written in ${language}
- Natural and conversational (NOT corporate or robotic)
- Specific to THIS job and THIS candidate

**STRUCTURE:**

1. **Opening** (1-2 sentences):
   ${language === 'swedish' 
     ? '- Start with "Hej!" or "Hej [hiring manager name if visible]!"'
     : '- Start with "Hello!" or "Dear [hiring manager name if visible],"'
   }
   - Mention the specific job title
   - Include ONE impressive achievement from the CV with numbers/specifics

2. **Body** (2-3 sentences):
   - Pick 2-3 CONCRETE examples from the CV that match job requirements
   - Use specific numbers, technologies, or results (e.g., "built a React platform with 50,000 users")
   - Connect these examples to what the job needs
   - NO generic phrases like "team player" or "strong skills"

3. **Closing** (1-2 sentences):
   ${language === 'swedish'
     ? '- Express interest in discussing further\n   - End with "Vänliga hälsningar" or "Med vänlig hälsning"'
     : '- Express interest in discussing further\n   - End with "Best regards" or "Kind regards"'
   }

**CRITICAL RULES:**

✅ DO:
- Use ONLY information from the CV provided (don't invent facts)
- Include specific numbers, percentages, or metrics if they're in the CV
- Mention actual companies, technologies, and tools from the CV
- Make it feel like a real person wrote it

❌ DON'T:
- Invent achievements, companies, or technologies not in the CV
- Use clichés: "passion for", "team player", "detail-oriented", "proven track record"
- Be overly formal or robotic
- Make generic claims without backing them up

**EXAMPLE GOOD OPENING (Swedish):**
"Hej! Jag är intresserad av fullstackrollen på CodeFlow eftersom jag har byggt en React e-handelsplattform med över 50 000 aktiva användare på Techlify."

**EXAMPLE GOOD OPENING (English):**
"Hello! I'm excited about the Full Stack Developer position because I've built a React e-commerce platform serving over 50,000 active users."

Write the complete cover letter now:`;

    console.log('📝 Generating cover letter...');
    const result = await model.generateContent(prompt);
    const coverLetter = result.response.text().trim();
    
    console.log('✅ Cover letter generated');
    console.log('📊 Length:', coverLetter.length, 'characters');

    return NextResponse.json({ 
      coverLetter,
      metadata: {
        language,
        length: coverLetter.length,
        model: 'gemini-2.0-flash'
      }
    });

  } catch (error) {
    console.error('❌ Error:', error);
    
    const status = error.message?.includes('rate') || error.message?.includes('quota') ? 429 : 500;
    const message = status === 429 
      ? 'Rate limit exceeded. Please try again later.'
      : 'Failed to generate cover letter. Please try again.';
    
    return NextResponse.json({ 
      error: message,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status });
  }
}
