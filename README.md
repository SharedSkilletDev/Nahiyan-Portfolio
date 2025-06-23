# Nahiyan Bin Noor - Professional Portfolio

A modern, responsive portfolio website with an AI-powered chatbot built using React, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, professional design with glass morphism effects and smooth animations
- **AI Chatbot**: RAG-based chatbot that can answer questions about Nahiyan's background, skills, and experience
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Sections**: 
  - Hero section with social links
  - About section with skills showcase
  - Professional experience timeline
  - Featured projects gallery
  - Publications and research
  - Education and certifications
  - Contact form

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Backend**: Supabase Edge Functions
- **AI Integration**: Custom RAG implementation with vector embeddings

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Supabase account and project
- EURI.ai API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nahiyan-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. **Configure Environment Variables**:

   **Frontend Configuration (.env file)**:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Supabase Edge Functions Configuration**:
   
   ⚠️ **CRITICAL**: The Edge Functions require the EURI API key to be configured in your Supabase project:
   
   1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
   2. Select your project
   3. Navigate to **Edge Functions** → **Environment Variables** (or **Settings** → **Edge Functions**)
   4. Add a new environment variable:
      - **Name**: `EURI_API_KEY`
      - **Value**: Your EURI.ai API key
   5. Save the configuration
   6. **Redeploy your Edge Functions** to pick up the new environment variable

   Without this configuration, you'll encounter "Embedding API error" and "RAG query failed" errors.

4. **Deploy Edge Functions to Supabase**:
   
   The project includes two Edge Functions that need to be deployed:
   - `euri-embedding`: Handles text embedding generation
   - `euri-completion`: Handles AI text completion
   
   These functions are located in the `supabase/functions/` directory and must be deployed to your Supabase project.

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── components/          # React components
│   ├── About.tsx       # About section
│   ├── ChatBot.tsx     # AI chatbot component
│   ├── Contact.tsx     # Contact form
│   ├── Education.tsx   # Education section
│   ├── Experience.tsx  # Work experience
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── Projects.tsx    # Projects showcase
│   └── Publications.tsx # Research publications
├── utils/              # Utility functions
│   ├── chunking.ts     # Text chunking for RAG
│   ├── completion.ts   # AI completion API
│   ├── embedding.ts    # Text embedding API
│   ├── ragSystem.ts    # RAG system implementation
│   └── retrieval.ts    # Vector similarity search
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
supabase/
└── functions/          # Supabase Edge Functions
    ├── euri-embedding/ # Text embedding function
    └── euri-completion/ # AI completion function
```

## AI Chatbot Features

The portfolio includes an intelligent chatbot that can answer questions about:
- Professional background and experience
- Technical skills and expertise
- Research projects and publications
- Education and certifications
- Contact information

The chatbot uses:
- **RAG (Retrieval-Augmented Generation)**: Combines vector search with LLM generation
- **Vector Embeddings**: Text chunks are embedded for semantic search
- **Context-Aware Responses**: Provides accurate, contextual answers based on the knowledge base

## Troubleshooting

### Common Issues

**1. "Embedding API error" or "RAG query failed"**
- **Cause**: EURI API key not configured in Supabase Edge Functions
- **Solution**: 
  1. Add `EURI_API_KEY` environment variable in your Supabase project settings
  2. Redeploy your Edge Functions
  3. Ensure the API key is valid and has sufficient credits

**2. "Supabase URL not found"**
- **Cause**: Missing or incorrect Supabase configuration
- **Solution**: Check your `.env` file has the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**3. Edge Functions not responding**
- **Cause**: Functions not deployed or incorrectly configured
- **Solution**: Ensure both `euri-embedding` and `euri-completion` functions are deployed to your Supabase project

## Environment Variables Reference

### Frontend (.env)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Supabase Edge Functions (Project Settings)
```
EURI_API_KEY=your_euri_api_key_here
```

## Customization

To customize this portfolio for your own use:

1. Update the content in `data/About_Me.txt` with your information
2. Modify the components to reflect your experience, projects, and skills
3. Update the color scheme in `tailwind.config.js`
4. Replace social media links and contact information
5. Configure your own Supabase project and EURI.ai API keys
6. Deploy the Edge Functions to your Supabase project

## Deployment

The project can be deployed to various platforms:

- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Import your GitHub repo for seamless deployment
- **GitHub Pages**: Use GitHub Actions for automated deployment

**Note**: Ensure your Supabase Edge Functions are properly deployed and configured before deploying the frontend.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Nahiyan Bin Noor
- Email: nahiyan.cuet@gmail.com
- LinkedIn: [nahiyan-bin-noor](https://www.linkedin.com/in/nahiyan-bin-noor-0a2170158/)
- GitHub: [Nahiyan140212](https://github.com/Nahiyan140212)

## Acknowledgments

- Built with modern web technologies for optimal performance
- AI integration powered by advanced language models and EURI.ai
- Design inspired by contemporary portfolio trends
- Supabase Edge Functions for serverless backend functionality