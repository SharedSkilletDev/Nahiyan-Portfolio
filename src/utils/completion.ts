export async function generateCompletion(prompt: string): Promise<string> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  
  if (!supabaseUrl) {
    throw new Error('Supabase URL not found. Please set VITE_SUPABASE_URL in your environment variables.');
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/euri-completion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`Failed to generate completion: ${errorData.error || response.statusText}`);
    }

    const data = await response.json();

    if (data?.content) {
      return data.content;
    } else {
      throw new Error('Invalid response format from completion API');
    }
  } catch (error) {
    console.error('Completion API error:', error);
    throw error;
  }
}