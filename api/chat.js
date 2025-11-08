import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, system, studentContext } = req.body;

    // Build enhanced system prompt with student context
    let enhancedSystemPrompt = system;
    
    if (studentContext) {
      enhancedSystemPrompt += `\n\n## Student Context (Use this naturally in conversation):\n\n`;
      enhancedSystemPrompt += `**Student Name:** ${studentContext.studentName}\n\n`;
      
      if (studentContext.currentGoals && studentContext.currentGoals.length > 0) {
        enhancedSystemPrompt += `**Current Learning Goals:**\n`;
        studentContext.currentGoals.forEach((goal) => {
          enhancedSystemPrompt += `- ${goal}\n`;
        });
        enhancedSystemPrompt += `\n`;
      }
      
      if (studentContext.lastSession) {
        enhancedSystemPrompt += `**Last Tutoring Session:**\n`;
        enhancedSystemPrompt += `- Date: ${studentContext.lastSession.date}\n`;
        enhancedSystemPrompt += `- Tutor: ${studentContext.lastSession.tutor}\n`;
        enhancedSystemPrompt += `- Subject: ${studentContext.lastSession.subject}\n`;
        enhancedSystemPrompt += `- Topics covered: ${studentContext.lastSession.topics.join(', ')}\n`;
        if (studentContext.lastSession.struggles && studentContext.lastSession.struggles.length > 0) {
          enhancedSystemPrompt += `- Struggled with: ${studentContext.lastSession.struggles.join(', ')}\n`;
        }
        enhancedSystemPrompt += `\n`;
      }
      
      if (studentContext.emotionalPatterns && studentContext.emotionalPatterns.length > 0) {
        enhancedSystemPrompt += `**Known Emotional Patterns:**\n`;
        studentContext.emotionalPatterns.forEach((pattern) => {
          enhancedSystemPrompt += `- ${pattern}\n`;
        });
        enhancedSystemPrompt += `\n`;
      }

      if (studentContext.interests && studentContext.interests.length > 0) {
        enhancedSystemPrompt += `**Personal Interests:** ${studentContext.interests.join(', ')}\n\n`;
      }
      
      enhancedSystemPrompt += `Remember to reference this context naturally when relevant, but don't dump it all at once. Build rapport by showing you remember their journey.`;
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: enhancedSystemPrompt,
      messages: messages,
    });

    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response from Claude' });
  }
}

