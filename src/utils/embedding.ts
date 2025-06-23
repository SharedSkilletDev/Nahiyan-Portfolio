export async function createEmbedding(text: string): Promise<number[]> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl) {
    throw new Error('Supabase URL not found. Please set VITE_SUPABASE_URL in your environment variables.');
  }

  if (!supabaseAnonKey) {
    throw new Error('Supabase anonymous key not found. Please set VITE_SUPABASE_ANON_KEY in your environment variables.');
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // Increased timeout to 12 seconds

    const response = await fetch(`${supabaseUrl}/functions/v1/euri-embedding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Embedding API detailed error:', errorData);
      
      // Check if this is a service unavailable error that should trigger fallback
      if (response.status === 503 || errorData.fallback) {
        const fallbackError = new Error(`Embedding service unavailable: ${errorData.error || response.statusText}`);
        (fallbackError as any).shouldFallback = true;
        throw fallbackError;
      }
      
      // For other errors, provide detailed information
      const errorMessage = errorData.debug || errorData.error || response.statusText;
      throw new Error(`Failed to create embedding (${response.status}): ${errorMessage}`);
    }

    const data = await response.json();

    if (data?.embedding) {
      return data.embedding;
    } else {
      console.error('Invalid embedding response:', data);
      const invalidResponseError = new Error('Invalid response format from embedding API');
      (invalidResponseError as any).shouldFallback = true;
      throw invalidResponseError;
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Embedding API request timed out');
      const timeoutError = new Error('Embedding request timed out');
      (timeoutError as any).shouldFallback = true;
      throw timeoutError;
    }
    
    // Re-throw with fallback flag if it's already set
    if ((error as any).shouldFallback) {
      throw error;
    }
    
    console.error('Embedding API error:', error);
    
    // For network errors or connection issues, suggest fallback
    if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('connection')) {
      const networkError = new Error(`Network error: ${error.message}`);
      (networkError as any).shouldFallback = true;
      throw networkError;
    }
    
    throw error;
  }
}