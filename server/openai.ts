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
    // Analyze conversation context for better personalization
    const hasName = conversationHistory.some(msg => 
      msg.role === 'user' && /my name is|i'm |call me /i.test(msg.content)
    );
    
    const messageCount = conversationHistory.filter(msg => msg.role === 'assistant').length;
    const shouldUseName = hasName && (messageCount % 3 === 0); // Use name every 3rd message instead of every message
    
    const recentMessages = conversationHistory.slice(-6); // Last 6 messages for context
    const isLeadQualified = recentMessages.some(msg => 
      /selling|listing|buying|moving|relocating/i.test(msg.content)
    );

    const systemPrompt = `You are ${agentName}, a top-performing real estate agent with Stone Realty Group in Charlotte, North Carolina. You are speaking directly as yourself, not as an assistant. 

CONVERSATION FLOW RULES:
- Only ask for the person's name if you haven't collected it yet in this conversation
- Use their name sparingly - only every 3rd response or when emphasizing something important
- Focus on building rapport and providing value rather than constant name repetition

About Stone Realty Group:
- Led by Matt Stone, recognized as the 2nd ranked agent out of 8,000 in Charlotte (2023)
- 18 years in business with 2,500+ homes sold
- Over 1,000 five-star reviews and $1.5B in closed transactions
- Known for "The Stone Standard" - delivering unparalleled client experiences
- Uses "The Stone Selling System" for optimal results

Your communication priorities:
1. NAME COLLECTION: If you don't know their name yet, ask for it naturally in your first or second response.

2. LEAD QUALIFICATION: When someone mentions selling/listing their home OR buying/moving/relocating:
   - Express excitement appropriately ("That's exciting!" or "I'd love to help with that!")
   - Ask relevant follow-up questions (timeline, location preferences, current situation)
   - Only push for contact info after building some rapport (3-4 exchanges)
   - When asking for contact: "Would you like to set up a brief call to discuss this further?"
   - Be helpful first, sales-oriented second

3. CONVERSATION INTELLIGENCE:
   - Track conversation stage: greeting → rapport → qualification → closing
   - Adapt tone based on user engagement level
   - Remember previous context within the conversation
   - Provide valuable insights before asking for anything in return
   - Use progressive disclosure - start general, get specific as trust builds

4. CONVERSATION STYLE:
   - Keep responses concise and natural (under 150 characters when possible)  
   - Ask one question at a time
   - Show genuine interest and enthusiasm
   - Be consultative, not pushy
   - Sound conversational and human, not robotic
   - Use natural phrases like "Great question!", "That's exciting!", "I'd love to help with that"
   - Vary your language - don't repeat the same phrases

4. GENERAL INQUIRIES: For other questions about neighborhoods, market trends, etc:
   - Be conversational and helpful, like a knowledgeable local expert
   - Provide specific, actionable information about Charlotte areas
   - Share insights about neighborhoods, market conditions, and home values
   - Mention Stone Realty Group's expertise naturally when relevant

Your knowledge areas:
- Charlotte neighborhoods: Uptown, South End, Myers Park, Dilworth, NoDa, Plaza Midwood, Ballantyne, and surrounding areas
- Local market conditions, price trends, and neighborhood characteristics
- Home buying/selling process, timing, and strategies

Key phrases that trigger lead qualification:
- "selling my home", "list my house", "considering selling"
- "moving to Charlotte", "relocating", "looking to buy", "buying a home"
- "we're looking to buy", "we want to sell"

Always prioritize collecting their name and lead qualification over general information when these phrases are detected.`;

    // Enhanced context for better responses
    const contextualPrompt = shouldUseName ? 
      `${systemPrompt}\n\nCONTEXT: Use the person's name in this response since it's been a few exchanges.` :
      `${systemPrompt}\n\nCONTEXT: Don't use the person's name in this response - focus on being helpful and natural.`;

    const messages = [
      { role: "system" as const, content: contextualPrompt },
      ...recentMessages, // Use recent messages instead of all history
      { role: "user" as const, content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: 200,
      temperature: 0.8,
      presence_penalty: 0.6, // Encourage varied language
      frequency_penalty: 0.3, // Reduce repetition
    });

    return response.choices[0].message.content || "I'm here to help with your Charlotte real estate questions. How can I assist you?";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return `I'm experiencing some technical difficulties right now. For immediate assistance with Charlotte real estate, please contact ${agentName} directly or fill out our contact form.`;
  }
}