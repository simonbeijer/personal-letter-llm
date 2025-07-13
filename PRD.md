Personal Letter LLM - Product Requirements Document
Product Overview
An AI-powered tool that generates personalized cover letters by analyzing user CVs and job advertisements using Google Gemini API. The application creates tailored, professional letters with emphasis on "why you should be hired" messaging.

Success Criteria
Generate relevant, professional cover letters that match CV skills to job requirements
Self-evaluated quality rating by primary user
Reliable generation within reasonable response times
Core Features (V1)
1. CV Input
Text area for users to paste CV content
Basic validation for minimum content length
Clear labeling and instructions
2. Job Advertisement Input
Text area for job posting content
Validation for minimum job description length
Clear formatting guidance
3. Cover Letter Generation
Integration with Google Gemini free API
Prompt engineering focused on "why I should be hired" angle
Complete generation with CSS-simulated streaming effect
Loading state with progress indicators
4. Results Display
Generated letter shown in read-only text area
Copy-to-clipboard button
Clean, readable formatting
Option to generate new letter with same inputs
Technical Requirements
API Integration
Google Gemini free API implementation (@google/generative-ai package)
Environment variable: GEMINI_API_KEY
Error handling for API failures and rate limits
Timeout handling for slow responses
Create /api/generate endpoint
Rate Limiting
One generation per IP address per time period
Exception handling for primary user access
Clear messaging when limits are reached
User Interface
Single-page application flow
Responsive design for desktop/mobile
CSS animations for streaming effect during generation
Clear visual hierarchy and intuitive layout
Authentication
Utilize existing auth system
Single user access (expandable later)
Session management
Data Handling
Stateless generation (no storage of CVs or letters)
Input sanitization and validation
No persistent data beyond session
User Flow
User lands on main page
User pastes CV content in designated area
User pastes job advertisement in second area
User clicks "Generate Cover Letter" button
Loading animation displays with streaming effect
Generated letter appears in results section
User can copy letter to clipboard
Technical Stack
Frontend: Next.js with existing template
Database: PostgreSQL with Prisma (for auth only)
AI Provider: Google Gemini free API
Deployment: Vercel-ready configuration
Styling: CSS animations for streaming effects
Out of Scope (Future Versions)
PDF file uploads for CV
Multiple letter variations/refinements
PDF output format
CV storage and reuse
Multiple user support
Advanced formatting templates
Letter editing capabilities
Risk Mitigation
API key security and environment variable management
Graceful degradation for API failures
Clear error messaging for users
Rate limiting to prevent abuse
Input validation to prevent malformed requests
Immediate Implementation Needs
Install @google/generative-ai package
Add GEMINI_API_KEY to environment variables
Create /api/generate route handler
Connect generate button to API endpoint
Display API response in results text area
Basic error handling for API failures
Development Priority
Phase 1 (Today): Get basic generation working Phase 2 (Later): Add polish, animations, and production features

Metrics & Evaluation
Personal quality assessment of generated letters
Response time monitoring
Error rate tracking
Usage pattern analysis (when expanded to multiple users)
