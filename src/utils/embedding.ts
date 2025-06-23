export async function createEmbedding(text: string): Promise<number[]> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  
  if (!supabaseUrl) {
    throw new Error('Supabase URL not found. Please set VITE_SUPABASE_URL in your environment variables.');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(`${supabaseUrl}/functions/v1/euri-embedding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Embedding API detailed error:', errorData);
      
      // Provide more detailed error information
      const errorMessage = errorData.debug || errorData.error || response.statusText;
      throw new Error(`Failed to create embedding (${response.status}): ${errorMessage}`);
    }

    const data = await response.json();

    if (data?.embedding) {
      return data.embedding;
    } else {
      console.error('Invalid embedding response:', data);
      throw new Error('Invalid response format from embedding API');
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Embedding API request timed out');
      throw new Error('Request timed out');
    }
    console.error('Embedding API error:', error);
    throw error;
  }
}