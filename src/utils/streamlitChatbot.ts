export interface StreamlitResponse {
  response: string;
  status: 'success' | 'sleeping' | 'error';
}

export async function queryStreamlitChatbot(message: string): Promise<StreamlitResponse> {
  const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
  
  try {
    console.log('Attempting to query Streamlit chatbot:', message);
    
    // Create a more robust API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout
    
    // Construct the API URL exactly as your Streamlit app expects
    const apiUrl = `${STREAMLIT_URL}/?api=chat&message=${encodeURIComponent(message)}`;
    
    console.log('Making request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/html, */*',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Portfolio-Chatbot/1.0',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const contentType = response.headers.get('content-type') || '';
      console.log('Content type:', contentType);
      
      // Try to get the response text first
      const responseText = await response.text();
      console.log('Response text (first 200 chars):', responseText.substring(0, 200));
      
      // Check if it's JSON
      if (contentType.includes('application/json')) {
        try {
          const data = JSON.parse(responseText);
          
          if (data.response && data.status === 'success') {
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
        } catch (parseError) {
          console.warn('Failed to parse JSON response:', parseError);
        }
      }
      
      // If we get here, the app is awake but might not be returning proper JSON
      // This could happen if the Streamlit app is running but the API endpoint isn't working
      if (responseText.includes('Nahiyan') || responseText.includes('AI Assistant')) {
        console.log('Streamlit app is awake, suggesting direct access');
        return {
          response: `The enhanced AI assistant is available! For the most comprehensive responses about Nahiyan's background, experience, and projects, please visit: ${STREAMLIT_URL}

I can provide basic information here. What would you like to know?`,
          status: 'success'
        };
      }
      
      // If response doesn't seem to be from our app, treat as sleeping
      return {
        response: '',
        status: 'sleeping'
      };
      
    } else if (response.status >= 500 || response.status === 502 || response.status === 503) {
      console.log('Streamlit app appears to be sleeping (status:', response.status, ')');
      return {
        response: '',
        status: 'sleeping'
      };
    } else {
      console.log('Unexpected response status:', response.status);
      return {
        response: '',
        status: 'error'
      };
    }
    
  } catch (error) {
    console.warn('Error connecting to Streamlit app:', error);
    
    if (error.name === 'AbortError') {
      console.log('Streamlit request timed out - likely sleeping');
      return {
        response: '',
        status: 'sleeping'
      };
    }
    
    // Network errors often indicate the service is sleeping or unreachable
    if (error.message.includes('fetch') || 
        error.message.includes('network') || 
        error.message.includes('connection') ||
        error.message.includes('Failed to fetch') ||
        error.message.includes('ERR_NETWORK') ||
        error.message.includes('ERR_INTERNET_DISCONNECTED')) {
      console.log('Network error - treating as sleeping');
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
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout for health check
    
    // Try the health API endpoint first
    const healthUrl = `${STREAMLIT_URL}/?api=health`;
    console.log('Health check URL:', healthUrl);
    
    const response = await fetch(healthUrl, {
      method: 'GET',
      headers: { 
        'Accept': 'application/json, text/html, */*',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    console.log('Health check response status:', response.status);
    
    if (response.ok) {
      const contentType = response.headers.get('content-type') || '';
      const responseText = await response.text();
      
      console.log('Health check content type:', contentType);
      console.log('Health check response (first 100 chars):', responseText.substring(0, 100));
      
      // Check if it's a proper JSON health response
      if (contentType.includes('application/json')) {
        try {
          const data = JSON.parse(responseText);
          if (data.status === 'healthy') {
            return 'available';
          }
        } catch (e) {
          console.warn('Failed to parse health check JSON');
        }
      }
      
      // If we get any successful response, the app is at least awake
      if (responseText.includes('Nahiyan') || responseText.includes('AI Assistant') || responseText.includes('healthy')) {
        return 'available';
      }
      
      return 'sleeping';
    } else if (response.status >= 500) {
      return 'sleeping';
    } else {
      return 'error';
    }
    
  } catch (error) {
    console.log('Health check error:', error.message);
    
    if (error.name === 'AbortError' || 
        error.message.includes('fetch') || 
        error.message.includes('network') ||
        error.message.includes('ERR_NETWORK')) {
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
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    
    console.log('Wake-up response status:', response.status);
    
    if (response.ok) {
      console.log('Streamlit app wake-up request successful');
      
      // Wait a moment for the app to fully initialize
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Try the health check to confirm API is working
      const healthStatus = await checkStreamlitHealth();
      console.log('Post-wakeup health status:', healthStatus);
      return healthStatus === 'available';
    }
    
    return false;
  } catch (error) {
    console.log('Wake-up request failed:', error.message);
    return false;
  }
}

// Test function to debug the connection
export async function testStreamlitConnection(): Promise<void> {
  console.log('=== Testing Streamlit Connection ===');
  
  const STREAMLIT_URL = 'https://askme-about-nahiyan.streamlit.app';
  
  // Test 1: Basic connectivity
  try {
    console.log('Test 1: Basic connectivity to', STREAMLIT_URL);
    const response = await fetch(STREAMLIT_URL, { method: 'HEAD' });
    console.log('Basic connectivity status:', response.status);
  } catch (error) {
    console.log('Basic connectivity failed:', error.message);
  }
  
  // Test 2: Health endpoint
  try {
    console.log('Test 2: Health endpoint');
    const healthStatus = await checkStreamlitHealth();
    console.log('Health status:', healthStatus);
  } catch (error) {
    console.log('Health check failed:', error.message);
  }
  
  // Test 3: Chat endpoint
  try {
    console.log('Test 3: Chat endpoint');
    const chatResponse = await queryStreamlitChatbot('test');
    console.log('Chat response:', chatResponse);
  } catch (error) {
    console.log('Chat test failed:', error.message);
  }
  
  console.log('=== End Connection Test ===');
}