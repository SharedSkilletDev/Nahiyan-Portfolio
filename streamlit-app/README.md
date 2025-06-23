# Nahiyan's AI Assistant - Streamlit App

This is a separate Streamlit application that provides enhanced AI capabilities for the portfolio chatbot.

## Setup Instructions

1. **Create a new directory for the Streamlit app:**
   ```bash
   mkdir nahiyan-streamlit-app
   cd nahiyan-streamlit-app
   ```

2. **Copy the files:**
   - Copy `app.py` from this folder
   - Copy `requirements.txt` from this folder
   - Copy your existing `utils/` folder with all the RAG system files

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up your environment variables:**
   Create a `.env` file with your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Run locally:**
   ```bash
   streamlit run app.py
   ```

6. **Deploy to Streamlit Cloud:**
   - Push your code to a GitHub repository
   - Go to [share.streamlit.io](https://share.streamlit.io)
   - Connect your GitHub repository
   - Deploy the app

## File Structure

```
nahiyan-streamlit-app/
├── app.py                 # Main Streamlit application
├── requirements.txt       # Python dependencies
├── utils/                 # Your existing RAG system utilities
│   ├── embedding.py
│   ├── chunking.py
│   ├── retrieval.py
│   ├── prompt.py
│   └── completion.py
├── faiss_store/          # Your FAISS index files
│   ├── index.faiss
│   └── chunk_mapping.pkl
└── data/                 # Your knowledge base files
    └── About_Me.txt
```

## API Endpoints

Once deployed, your Streamlit app will provide these API endpoints:

- **Health Check:** `https://your-app.streamlit.app/?api=health`
- **Chat Query:** `https://your-app.streamlit.app/?api=chat&message=your_question`

## Integration with Portfolio

The portfolio chatbot will automatically detect and use this enhanced AI assistant when it's available. The integration handles:

- Automatic fallback to basic responses when the Streamlit app is sleeping
- Wake-up detection and status updates
- Seamless user experience with status indicators

## Notes

- The Streamlit app may go to sleep after inactivity (this is normal for free Streamlit Cloud hosting)
- The portfolio chatbot will automatically try to wake it up when needed
- Users can always access the full Streamlit app directly for the best experience