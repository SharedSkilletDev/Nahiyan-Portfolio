export interface StreamlitResponse {
  response: string;
  status: 'success' | 'sleeping' | 'error';
}

export async function queryStreamlitChatbot(message: string): Promise<StreamlitResponse> {
  const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
  
  try {
    console.log('Attempting to query Streamlit chatbot:', message);
    
    // First, try the chat API endpoint
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    // Construct the API URL with query parameters as your Streamlit app expects
    const apiUrl = `${STREAMLIT_URL}/?api=chat&message=${encodeURIComponent(message)}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        // If we get JSON response, parse it
        const data = await response.json();
        
        if (data.response) {
          console.log('Streamlit chatbot responded successfully');
          return {
            response: data.response,
            status: 'success'
          };
        } else if (data.error) {
          console.warn('Streamlit chatbot returned error:', data.error);
          return {
            response: '',
            status: 'error'
          };
        }
      } else {
        // If we get HTML response, the app is awake but not returning JSON
        // This means the API endpoint might not be working as expected
        console.log('Streamlit app is awake but API endpoint not responding correctly');
        return {
          response: `The enhanced AI assistant is available! For the most comprehensive responses about Nahiyan's background, experience, and projects, please visit: ${STREAMLIT_URL}

I can provide basic information here. What would you like to know?`,
          status: 'success'
        };
      }
    } else if (response.status >= 500) {
      console.log('Streamlit app appears to be sleeping (status:', response.status, ')');
      return {
        response: '',
        status: 'sleeping'
      };
    }
    
    // Fallback: try health check
    return await fallbackHealthCheck();
    
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

async function fallbackHealthCheck(): Promise<StreamlitResponse> {
  const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
  
  try {
    const healthUrl = `${STREAMLIT_URL}/?api=health`;
    const response = await fetch(healthUrl, { 
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      return {
        response: `The enhanced AI assistant is available! Visit ${STREAMLIT_URL} for the most detailed responses about Nahiyan's background, experience, and projects.

I can provide basic information here. What would you like to know?`,
        status: 'success'
      };
    } else {
      return { response: '', status: 'sleeping' };
    }
  } catch (error) {
    return { response: '', status: 'sleeping' };
  }
}

// Health check to see if the app is responsive
export async function checkStreamlitHealth(): Promise<'available' | 'sleeping' | 'error'> {
  const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout for health check
    
    // Try the health API endpoint first
    const healthUrl = `${STREAMLIT_URL}/?api=health`;
    const response = await fetch(healthUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return 'available';
      } else {
        // App is awake but API might not be working perfectly
        return 'available';
      }
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
      
      // Wait a moment for the app to fully initialize
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Try the health check to confirm API is working
      const healthStatus = await checkStreamlitHealth();
      return healthStatus === 'available';
    }
    
    return false;
  } catch (error) {
    console.log('Wake-up request failed:', error.message);
    return false;
  }
}