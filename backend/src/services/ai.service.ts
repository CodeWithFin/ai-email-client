import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIService {
  static async summarizeEmail(content: string): Promise<string> {
    const prompt = `
    Please summarize the following email in 1-2 concise sentences. 
    Focus on the key points and action items.
    
    Email content:
    ${content}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert email assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content || 'No summary available';
  }
  static async generateResponseSuggestions(
    emailContent: string,
    context: string = ''
  ): Promise<string[]> {
    const prompt = `
    Please suggest 3 possible professional responses to the following email.
    The responses should vary in tone (formal, neutral, friendly) and length.
    
    Email content:
    ${emailContent}
    
    ${context ? `Context: ${context}` : ''}
    `;
  
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert email assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });
  
    // Split the response into individual suggestions
    const suggestions = response.choices[0]?.message?.content?.split('\n') || [];
    return suggestions.filter(s => s.trim().length > 0);
  }
}