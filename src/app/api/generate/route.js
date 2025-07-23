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

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.7,
      }
    });

    const languageInstructions = language === 'swedish' 
      ? `Generate the cover letter in Swedish. Follow the reference example's direct, personal Swedish style with "Hej!" opening and "Vänliga hälsningar" closing. Use natural Swedish expressions and professional but approachable tone.`
      : `Generate the cover letter in English. Use professional business letter format with "Dear Hiring Manager" or similar opening and "Sincerely" closing. Maintain professional but personable tone appropriate for international business context.`;

    const prompt = `You are an expert cover letter writer. Create a compelling cover letter that answers "why should they hire me?" 

**APPROACH:**
1. **Lead with impact** - Start with the most important information. Write a brief and compelling introduction, explaining the job you are applying for and why you are the right fit. This will immediately capture the reader's attention.
2. **Customize precisely** - Customize your letter for the specific job you are applying to. Include exactly what the employer is looking for, so that your letter addresses their requirements.
3. **Professional but accessible** - Express yourself professionally, but avoid being overly formal or using industry-specific jargon that may not be understood by everyone. Avoid getting too detailed.
4. **Show, don't tell** - Provide examples that illustrate your personal qualities. Rather than listing your personal qualities, describing situations that demonstrate them will leave a lasting impression on the reader. You can draw examples from your work, studies, or leisure activities.
5. **Eliminate clichés** - Avoid using clichés. Instead of generic phrases like "I work well under pressure" or "I'm outgoing", be specific and provide examples of how you work and what kind of person you are.
6. **End positively** - You can end your letter with a positive statement, such as: "I look forward to meeting you and having the opportunity to share more about myself."

**INPUT MATERIALS:**
**CV:** ${cv}
**JOB ADVERTISEMENT:** ${jobAd}

**REFERENCE EXAMPLE:**
Here's an example of effective cover letter structure and tone:

"Hej!
Jag heter Simon och söker en ny utmaning inom webbutveckling – en roll där jag får växa tekniskt, samarbeta i team och bidra till lösningar med samhällsnytta.

De senaste åren har jag arbetat som frontendutvecklare på Keeros AB med nyutveckling och refaktorering av molnbaserade plattformar. Jag har byggt användarvänliga gränssnitt i Vue.js, integrerat med PHP/MySQL, och jobbat med Figma, Jest, Cypress och teknisk support.

Min grund i React kommer från studier och praktik, och jag har vidareutvecklat den genom egna projekt i React/Next.js, där jag bl.a. integrerat LLM-baserade AI-funktioner.

Det som driver mig är att skapa tydliga, lättanvända gränssnitt och skriva genomtänkt kod. Jag trivs i agila team där man delar idéer och samarbetar för att utveckla smarta lösningar. Med mitt öga för användarupplevelse och sinne för detaljer hoppas jag kunna bidra positivt till ert team.

Jag ser fram emot att höra från er och berätta mer om hur jag kan bidra.

Vänliga hälsningar,
Simon Beijer"

Notice: Direct personal opening, specific technical examples, growth narrative, collaboration emphasis, and positive forward-looking close.

**LANGUAGE INSTRUCTIONS:**
${languageInstructions}

**REQUIREMENTS:**
- 3 paragraphs, 200-250 words total
- Professional but personable tone (avoid over-formality and jargon)
- Include specific achievements with numbers/results when possible
- Reference the company/role specifically
- Use active voice and relevant keywords from job posting
- **NO CLICHÉS**: Avoid generic phrases like "I work well under pressure", "I'm a team player", "I'm detail-oriented"
- **Use specific examples**: Instead of listing qualities, describe situations that demonstrate them
- End with positive, forward-looking statement and professional closing

Generate only the final cover letter - no explanations or thinking steps.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const coverLetter = response.text();

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    
    const status = error.message?.includes('rate') || error.message?.includes('quota') ? 429 : 500;
    const message = status === 429 
      ? 'Rate limit exceeded. Please try again later.'
      : 'Failed to generate cover letter. Please try again.';
    
    return NextResponse.json({ error: message }, { status });
  }
}