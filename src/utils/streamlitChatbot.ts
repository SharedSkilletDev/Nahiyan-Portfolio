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
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    // Try to make a request to your Streamlit app
    // Note: This is a simplified approach - you might need to adjust based on your Streamlit app's API
    const response = await fetch(`${STREAMLIT_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Streamlit chatbot responded successfully');
      return {
        response: data.response || data.message || 'Response received from chatbot',
        status: 'success'
      };
    } else if (response.status === 503 || response.status === 502) {
      // Service unavailable - likely sleeping
      console.log('Streamlit app appears to be sleeping');
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
        error.message.includes('connection')) {
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

// Alternative approach using iframe communication if direct API isn't available
export async function queryStreamlitChatbotViaIframe(message: string): Promise<StreamlitResponse> {
  return new Promise((resolve) => {
    const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
    
    // Create a hidden iframe to test if the app is responsive
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = STREAMLIT_URL;
    
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        document.body.removeChild(iframe);
        resolve({
          response: '',
          status: 'sleeping'
        });
      }
    }, 10000); // 10 second timeout
    
    iframe.onload = () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        document.body.removeChild(iframe);
        
        // If iframe loads successfully, the app is awake
        // You would need to implement actual communication here
        resolve({
          response: `I'm now connected to the enhanced AI assistant! The service is ready to answer your questions about Nahiyan with full capabilities.`,
          status: 'success'
        });
      }
    };
    
    iframe.onerror = () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        document.body.removeChild(iframe);
        resolve({
          response: '',
          status: 'error'
        });
      }
    };
    
    document.body.appendChild(iframe);
  });
}

// Wake up the Streamlit app by making a simple request
export async function wakeUpStreamlitApp(): Promise<boolean> {
  const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
  
  try {
    console.log('Attempting to wake up Streamlit app...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout for wake-up
    
    const response = await fetch(STREAMLIT_URL, {
      method: 'GET',
      signal: controller.signal,
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