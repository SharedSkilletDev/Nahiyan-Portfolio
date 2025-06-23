import axios from 'axios';

const EURI_API_BASE = 'https://api.euri.ai/v1';

export async function createEmbedding(text: string): Promise<number[]> {
  const apiKey = import.meta.env.VITE_EURI_API_KEY;
  
  if (!apiKey) {
    throw new Error('EURI API key not found. Please set VITE_EURI_API_KEY in your environment variables.');
  }

  try {
    const response = await axios.post(
      `${EURI_API_BASE}/embeddings`,
      {
        input: text,
        model: 'text-embedding-ada-002'
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data?.data?.[0]?.embedding) {
      return response.data.data[0].embedding;
    } else {
      throw new Error('Invalid response format from embedding API');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Embedding API error:', error.response?.data || error.message);
      throw new Error(`Failed to create embedding: ${error.response?.data?.error?.message || error.message}`);
    }
    throw error;
  }
}