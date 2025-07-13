import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { cv, jobAd } = await request.json();

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

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.7,
      }
    });

    const prompt = `You are an expert cover letter writer with 10+ years of experience helping candidates secure interviews across various industries. Your specialty is crafting compelling "why I should be hired" narratives that immediately capture hiring managers' attention.

**CHAIN OF THOUGHT PROCESS:**
Follow this step-by-step approach to create a superior cover letter:

**STEP 1: HOOK DEVELOPMENT**
First, craft a compelling hook by identifying:
- What makes this candidate uniquely qualified for THIS specific role?
- What's their strongest value proposition that would make a hiring manager stop and read?
- What specific achievement or skill combination sets them apart?

Examples of strong hooks:
- "Having increased e-commerce conversion rates by 35% through UX optimization..."
- "As a data scientist who reduced customer churn by 22% at my previous company..."
- "With 5 years of experience scaling startup teams from 10 to 100+ employees..."

**STEP 2: "WHY I SHOULD BE HIRED" CORE MESSAGE**
Then, develop the central argument:
- What's the main problem this role needs to solve?
- How does this candidate solve that problem better than others?
- What specific results can they deliver based on their track record?

**STEP 3: SUPPORTING EVIDENCE GATHERING**
Finally, gather supporting details:
- 2-3 specific examples from CV that prove the core message
- Quantifiable achievements that demonstrate impact
- Skills that directly match job requirements
- Company culture/values alignment (if apparent from job ad)

**INPUT MATERIALS:**

**CV:**
${cv}

**JOB ADVERTISEMENT:**
${jobAd}

**GENERATION REQUIREMENTS:**
Now, using your chain of thought analysis, create a professional cover letter:

**Opening Paragraph (Lead with your hook):**
- Start with the compelling hook you developed in Step 1
- Immediately establish your unique value proposition
- Reference the specific role and company
- Preview your "why I should be hired" message from Step 2

**Body Paragraphs (Prove your case):**
- **Primary Value**: Expand on your core "why hire me" message with the strongest example from Step 3
- **Supporting Evidence**: Add 1-2 additional examples that reinforce your value proposition
- **Company Fit**: Show how your approach aligns with their needs and culture (if apparent)

**Closing Paragraph:**
- Strong call to action expressing enthusiasm for next steps
- Professional closing with availability for interview
- Thank them for their consideration

**QUALITY STANDARDS:**
- Length: EXACTLY 3 paragraphs (200-250 words maximum)
- Tone: Professional but personable, confident without being arrogant
- Include specific examples from CV (not generic statements)
- Use active voice and strong action verbs
- Incorporate 2-3 keywords from the job posting naturally
- Ensure every sentence answers "why should they hire me?"

**FALLBACK STRATEGIES:**
- When skills don't perfectly match: Focus on transferable skills and learning agility
- When company information is limited: Use industry-standard challenges and solutions
- When achievements aren't quantifiable: Use qualitative impacts and outcomes

**IMPORTANT OUTPUT INSTRUCTION:**
Generate ONLY the final cover letter - do not show your thinking process or chain-of-thought steps. Start directly with the letter content. The letter must be complete and end with a proper closing and signature line.


Generate a complete, personalized cover letter following this comprehensive framework:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const coverLetter = response.text();

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'API key configuration error. Please check your Gemini API key.' },
        { status: 500 }
      );
    }
    
    if (error.message?.includes('quota') || error.message?.includes('rate')) {
      return NextResponse.json(
        { error: 'API rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate cover letter. Please try again.' },
      { status: 500 }
    );
  }
}