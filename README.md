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
- **AI Integration**: Custom RAG implementation with vector embeddings

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

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

3. Create a `.env` file in the root directory and add your API key:
```env
VITE_EURI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

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
│   ├── prompt.ts       # Prompt engineering
│   └── retrieval.ts    # Vector similarity search
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
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

## Customization

To customize this portfolio for your own use:

1. Update the content in `data/About_Me.txt` with your information
2. Modify the components to reflect your experience, projects, and skills
3. Update the color scheme in `tailwind.config.js`
4. Replace social media links and contact information
5. Add your own API keys for the chatbot functionality

## Deployment

The project can be deployed to various platforms:

- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Import your GitHub repo for seamless deployment
- **GitHub Pages**: Use GitHub Actions for automated deployment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Nahiyan Bin Noor
- Email: nahiyan.cuet@gmail.com
- LinkedIn: [nahiyan-bin-noor](https://www.linkedin.com/in/nahiyan-bin-noor-0a2170158/)
- GitHub: [Nahiyan140212](https://github.com/Nahiyan140212)

## Acknowledgments

- Built with modern web technologies for optimal performance
- AI integration powered by advanced language models
- Design inspired by contemporary portfolio trends