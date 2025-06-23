import { queryStreamlitChatbot, checkStreamlitHealth, wakeUpStreamlitApp } from './streamlitChatbot';
import { findBestResponse } from './fallbackResponses';

export async function ragQuery(query: string): Promise<string> {
  try {
    console.log('Processing RAG query:', query);
    
    // First, try to query the Streamlit chatbot
    const streamlitResult = await queryStreamlitChatbot(query);
    
    if (streamlitResult.status === 'success') {
      console.log('Streamlit chatbot responded successfully');
      return streamlitResult.response;
    } else if (streamlitResult.status === 'sleeping') {
      console.log('Streamlit app is sleeping, attempting to wake it up...');
      
      // Try to wake up the app in the background
      wakeUpStreamlitApp().then(success => {
        if (success) {
          console.log('Streamlit app wake-up successful');
        } else {
          console.log('Streamlit app wake-up failed');
        }
      });
      
      // Return fallback response while the app wakes up
      const fallbackResponse = findBestResponse(query);
      return `${fallbackResponse}

*Note: I'm currently running in basic mode. The enhanced AI assistant is starting up and will be available shortly. For the most comprehensive responses, you can also visit: https://askme-about-nahiyan.streamlit.app*`;
    } else {
      console.log('Streamlit chatbot error, using fallback');
      return findBestResponse(query);
    }
    
  } catch (error) {
    console.error('RAG query failed:', error);
    console.log('Using fallback response system');
    return findBestResponse(query);
  }
}

// Function to check if Streamlit app is available
export async function checkStreamlitStatus(): Promise<'available' | 'sleeping' | 'error'> {
  try {
    return await checkStreamlitHealth();
  } catch (error) {
    return 'error';
  }
}