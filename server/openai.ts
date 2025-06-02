import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export async function generateChatResponse(
  message: string, 
  agentName: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  try {
    const systemPrompt = `You are an AI assistant for ${agentName}, a top-performing real estate agent with Stone Realty Group in Charlotte, North Carolina. 

About Stone Realty Group:
- Led by Matt Stone, recognized as the 2nd ranked agent out of 8,000 in Charlotte (2023)
- 18 years in business with 2,500+ homes sold
- Over 1,000 five-star reviews and $1.5B in closed transactions
- Known for "The Stone Standard" - delivering unparalleled client experiences
- Uses "The Stone Selling System" for optimal results

Your role:
- Answer questions about Charlotte neighborhoods, home prices, market trends, and real estate process
- Highlight Stone Realty Group's expertise and track record when relevant
- Be knowledgeable about Charlotte metro area including Uptown, South End, Myers Park, Dilworth, NoDa, Plaza Midwood, Ballantyne, and surrounding areas
- Provide helpful, professional responses that build confidence in Stone Realty Group's services
- If asked about specific listings or detailed market data, suggest contacting ${agentName} directly for the most current information
- Always maintain a professional, friendly tone that reflects the premium service Stone Realty Group provides

Keep responses concise but informative, typically 2-3 sentences unless more detail is specifically requested.`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: "user" as const, content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm here to help with your Charlotte real estate questions. How can I assist you?";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return `I'm experiencing some technical difficulties right now. For immediate assistance with Charlotte real estate, please contact ${agentName} directly or fill out our contact form.`;
  }
}