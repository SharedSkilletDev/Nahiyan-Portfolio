export interface StreamlitResponse {
  response: string;
  status: 'success' | 'sleeping' | 'error';
}

export async function queryStreamlitChatbot(message: string): Promise<StreamlitResponse> {
  const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
  
  try {
    console.log('Attempting to query Streamlit chatbot:', message);
    
    // Since Streamlit doesn't have built-in API endpoints, we'll try a different approach
    // Option 1: Check if the app is accessible at all
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    // Try to access the main Streamlit app
    const response = await fetch(STREAMLIT_URL, {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      // If the main app is accessible, we know it's awake
      // But we can't directly query it, so we'll return a message indicating the user should use the app directly
      console.log('Streamlit app is accessible');
      return {
        response: `I can see that the enhanced AI assistant is available! For the most detailed and accurate responses about Nahiyan's background, please visit the full AI assistant at: ${STREAMLIT_URL}

In the meantime, I can provide basic information about his experience, education, and projects. What would you like to know?`,
        status: 'success'
      };
    } else if (response.status >= 500) {
      console.log('Streamlit app appears to be sleeping (status:', response.status, ')');
      return {
        response: '',
        status: 'sleeping'
      };
    } else {
      console.warn('Streamlit app returned error:', response.status);
      return {
        response: '',
        status: 'error'
      };
    }
    
  } catch (error) {
    console.warn('Error connecting to Streamlit app:', error.message);
    
    if (error.name === 'AbortError') {
      console.log('Streamlit request timed out - likely sleeping');
      return {
        response: '',
        status: 'sleeping'
      };
    }
    
    // Network errors often indicate the service is sleeping
    if (error.message.includes('fetch') || 
        error.message.includes('network') || 
        error.message.includes('connection') ||
        error.message.includes('Failed to fetch')) {
      return {
        response: '',
        status: 'sleeping'
      };
    }
    
    return {
      response: '',
      status: 'error'
    };
  }
}

// Health check to see if the app is responsive
export async function checkStreamlitHealth(): Promise<'available' | 'sleeping' | 'error'> {
  const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout for health check
    
    const response = await fetch(STREAMLIT_URL, {
      method: 'GET',
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      return 'available';
    } else if (response.status >= 500) {
      return 'sleeping';
    } else {
      return 'error';
    }
    
  } catch (error) {
    if (error.name === 'AbortError' || 
        error.message.includes('fetch') || 
        error.message.includes('network')) {
      return 'sleeping';
    }
    return 'error';
  }
}

// Wake up the Streamlit app by making a simple request
export async function wakeUpStreamlitApp(): Promise<boolean> {
  const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
  
  try {
    console.log('Attempting to wake up Streamlit app...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout for wake-up
    
    // Make a simple GET request to wake up the app
    const response = await fetch(STREAMLIT_URL, { 
      method: 'GET', 
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      console.log('Streamlit app is now awake');
      return true;
    }
    
    return false;
  } catch (error) {
    console.log('Wake-up request failed:', error.message);
    return false;
  }
}