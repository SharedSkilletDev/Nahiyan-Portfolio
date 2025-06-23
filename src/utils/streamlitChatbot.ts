export interface StreamlitResponse {
  response: string;
  status: 'success' | 'sleeping' | 'error';
}

export async function queryStreamlitChatbot(message: string): Promise<StreamlitResponse> {
  const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
  
  try {
    console.log('Querying Streamlit chatbot:', message);
    
    // Create a timeout controller for the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout
    
    // Make request to your Streamlit app's API endpoint
    const response = await fetch(`${STREAMLIT_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': window.location.origin,
      },
      body: JSON.stringify({ 
        message: message,
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Streamlit chatbot responded successfully');
      return {
        response: data.response || data.answer || 'Response received from enhanced AI assistant',
        status: 'success'
      };
    } else if (response.status === 503 || response.status === 502 || response.status === 504) {
      // Service unavailable - likely sleeping
      console.log('Streamlit app appears to be sleeping (status:', response.status, ')');
      return {
        response: '',
        status: 'sleeping'
      };
    } else {
      console.warn('Streamlit chatbot returned error:', response.status);
      return {
        response: '',
        status: 'error'
      };
    }
    
  } catch (error) {
    console.warn('Error connecting to Streamlit chatbot:', error.message);
    
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
    
    const response = await fetch(`${STREAMLIT_URL}/api/health`, {
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
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout for wake-up
    
    // Make multiple requests to ensure wake-up
    const wakeUpPromises = [
      fetch(STREAMLIT_URL, { method: 'GET', signal: controller.signal }),
      fetch(`${STREAMLIT_URL}/api/health`, { method: 'GET', signal: controller.signal }),
    ];
    
    const responses = await Promise.allSettled(wakeUpPromises);
    clearTimeout(timeoutId);
    
    // If any request succeeds, the app is awake
    const hasSuccess = responses.some(result => 
      result.status === 'fulfilled' && result.value.ok
    );
    
    if (hasSuccess) {
      console.log('Streamlit app is now awake');
      return true;
    }
    
    return false;
  } catch (error) {
    console.log('Wake-up request failed:', error.message);
    return false;
  }
}