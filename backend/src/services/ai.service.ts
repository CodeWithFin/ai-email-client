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
}