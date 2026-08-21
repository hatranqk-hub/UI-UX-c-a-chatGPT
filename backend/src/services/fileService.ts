import fs from 'fs';
import pdfParse from 'pdf-parse';
import axios from 'axios';

export const extractTextFromFile = async (
  filepath: string,
  mimetype: string
): Promise<string> => {
  try {
    if (mimetype === 'application/pdf') {
      const fileBuffer = fs.readFileSync(filepath);
      const pdfData = await pdfParse(fileBuffer);
      return pdfData.text;
    } else if (mimetype === 'text/plain') {
      return fs.readFileSync(filepath, 'utf-8');
    } else if (
      mimetype === 'application/msword' ||
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      // For Word documents, you may need to use additional libraries
      return 'Word document extraction requires additional setup';
    } else if (
      mimetype === 'application/vnd.ms-excel' ||
      mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      // For Excel files, you may need to use additional libraries
      return 'Excel file extraction requires additional setup';
    }

    return '';
  } catch (error) {
    console.error('Error extracting text:', error);
    throw error;
  }
};

export const analyzeFileContent = async (content: string): Promise<any> => {
  try {
    // Use OpenAI to analyze file content
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a document analyzer. Analyze the following content and provide key insights.'
          },
          {
            role: 'user',
            content: `Analyze this document:\n${content.substring(0, 4000)}`
          }
        ],
        max_tokens: 1000
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    return {
      summary: response.data.choices[0]?.message?.content,
      wordCount: content.split(/\s+/).length,
      characterCount: content.length
    };
  } catch (error) {
    console.error('Error analyzing file:', error);
    throw error;
  }
};
