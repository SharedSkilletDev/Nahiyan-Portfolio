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
      console.error('Completion API detailed error:', errorData);
      
      // Provide more detailed error information
      const errorMessage = errorData.debug || errorData.error || response.statusText;
      throw new Error(`Failed to generate completion (${response.status}): ${errorMessage}`);
    }

    const data = await response.json();

    if (data?.content) {
      return data.content;
    } else {
      console.error('Invalid completion response:', data);
      throw new Error('Invalid response format from completion API');
    }
  } catch (error) {
    console.error('Completion API error:', error);
    throw error;
  }
}