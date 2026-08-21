import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
import { IMessage } from '../models/Chat.js';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

export const callOpenAI = async (message: string, messages: IMessage[]): Promise<string> => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      })),
      max_tokens: 2000,
      temperature: 0.7
    });

    return response.data.choices[0]?.message?.content || 'No response received';
  } catch (error: any) {
    console.error('OpenAI API error:', error.message);
    throw error;
  }
};

export const callGemini = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ]
      }
    );

    return response.data.candidates[0]?.content?.parts[0]?.text || 'No response received';
  } catch (error: any) {
    console.error('Gemini API error:', error.message);
    throw error;
  }
};
