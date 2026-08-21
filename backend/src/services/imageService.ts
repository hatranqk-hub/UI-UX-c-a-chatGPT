import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
);

export const generateImage = async (
  prompt: string,
  model: string = 'dall-e-3',
  size: string = '1024x1024'
): Promise<string> => {
  try {
    if (model === 'dall-e-2' || model === 'dall-e-3') {
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: size as '256x256' | '512x512' | '1024x1024'
      });

      return response.data.data[0]?.url || '';
    } else if (model === 'stable-diffusion') {
      // Using Hugging Face Stable Diffusion API
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`
          },
          responseType: 'arraybuffer'
        }
      );

      const base64 = Buffer.from(response.data).toString('base64');
      return `data:image/png;base64,${base64}`;
    }

    throw new Error('Unsupported image model');
  } catch (error: any) {
    console.error('Image generation error:', error.message);
    throw error;
  }
};
