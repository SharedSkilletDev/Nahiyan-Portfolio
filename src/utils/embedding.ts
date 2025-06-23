export async function createEmbedding(text: string): Promise<number[]> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  
  if (!supabaseUrl) {
    throw new Error('Supabase URL not found. Please set VITE_SUPABASE_URL in your environment variables.');
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/euri-embedding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`Failed to create embedding: ${errorData.error || response.statusText}`);
    }

    const data = await response.json();

    if (data?.embedding) {
      return data.embedding;
    } else {
      throw new Error('Invalid response format from embedding API');
    }
  } catch (error) {
    console.error('Embedding API error:', error);
    throw error;
  }
}