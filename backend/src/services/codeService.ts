import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

export const completeCode = async (
  code: string,
  language: string,
  context: string = ''
): Promise<string> => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a code completion expert. Complete the following ${language} code. Only provide the completion, not the full code.`
        },
        {
          role: 'user',
          content: `${context ? `Context: ${context}\n` : ''}Code to complete:\n${code}`
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    });

    return response.data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Code completion error:', error);
    throw error;
  }
};

export const explainCode = async (code: string, language: string): Promise<string> => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert ${language} developer. Explain the following code in detail, including what it does, any functions/methods used, and potential optimizations.`
        },
        {
          role: 'user',
          content: `Explain this ${language} code:\n${code}`
        }
      ],
      max_tokens: 1000,
      temperature: 0.5
    });

    return response.data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Code explanation error:', error);
    throw error;
  }
};

export const refactorCode = async (
  code: string,
  language: string,
  improvements: string = 'performance, readability, best practices'
): Promise<string> => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert ${language} developer. Refactor the following code focusing on: ${improvements}. Provide only the refactored code without explanation.`
        },
        {
          role: 'user',
          content: `Refactor this ${language} code:\n${code}`
        }
      ],
      max_tokens: 1000,
      temperature: 0.3
    });

    return response.data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Code refactoring error:', error);
    throw error;
  }
};
