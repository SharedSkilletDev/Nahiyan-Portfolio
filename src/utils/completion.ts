import axios from 'axios';

const EURI_API_BASE = 'https://api.euri.ai/v1';

export async function generateCompletion(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_EURI_API_KEY;
  
  if (!apiKey) {
    throw new Error('EURI API key not found. Please set VITE_EURI_API_KEY in your environment variables.');
  }

  try {
    const response = await axios.post(
      `${EURI_API_BASE}/chat/completions`,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid response format from completion API');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Completion API error:', error.response?.data || error.message);
      throw new Error(`Failed to generate completion: ${error.response?.data?.error?.message || error.message}`);
    }
    throw error;
  }
}