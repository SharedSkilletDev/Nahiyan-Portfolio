import { findBestResponse } from './fallbackResponses';

export async function ragQuery(query: string): Promise<string> {
  try {
    console.log('Processing RAG query:', query);
    
    // For debugging - you can remove this later
    if (query.toLowerCase().includes('test connection')) {
      return 'Connection test completed. The Enhanced AI Assistant is available via the embedded interface. Click the "Enhanced AI" button for the full experience with advanced RAG capabilities.';
    }
    
    // Always use fallback responses for the basic chatbot
    // The enhanced AI is now available through the embedded interface
    const fallbackResponse = findBestResponse(query);
    
    // Add a note about the enhanced AI being available
    return `${fallbackResponse}

💡 **For more comprehensive responses**, try the Enhanced AI Assistant with advanced RAG capabilities by clicking the "Enhanced AI" button!`;
    
  } catch (error) {
    console.error('RAG query failed:', error);
    console.log('Using fallback response system');
    return findBestResponse(query);
  }
}

// Function to check if Streamlit app is available (for status indicators)
export async function checkStreamlitStatus(): Promise<'available' | 'sleeping' | 'error'> {
  const STREAMLIT_URLS = [
    'https://askme-about-nahiyan.streamlit.app',
    'https://nahiyan-ai-assistant.streamlit.app',
    'https://nahiyan-portfolio-ai.streamlit.app'
  ];

  for (const url of STREAMLIT_URLS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors'
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok || response.type === 'opaque') {
        return 'available';
      }
    } catch (error) {
      console.log(`Failed to check ${url}:`, error);
      continue; // Try next URL
    }
  }
  
  return 'sleeping'; // All URLs failed, likely sleeping
}