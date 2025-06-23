import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Brain, Search, Heart, TrendingUp, MessageSquare, Activity, Microscope, BarChart3 } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Clinical Summarization System & AI Research Tools',
      description: 'HIPAA-compliant, serverless NLP pipeline on AWS (Bedrock, Lambda, S3) to automate summarization of complex clinical notes from MIMIC-IV dataset using RAG architecture with LLaMA-7B.',
      icon: Microscope,
      tech: ['AWS Bedrock', 'Lambda', 'S3', 'RAG', 'LLaMA-7B', 'HIPAA Compliance'],
      color: 'from-emerald-500 to-teal-500',
      github: '#',
      demo: '#'
    },
    {
      title: 'Comparative Analysis of SOTA Vision Models',
      description: 'Created novel dataset (BanglaFood-45) and benchmarked ViT, CLIP, and Large Multi-modal Models (GPT-4o, LLaVA) across zero-shot, fine-tuning, and LoRA paradigms for culturally-specific data.',
      icon: Brain,
      tech: ['ViT', 'CLIP', 'GPT-4o', 'LLaVA', 'LoRA', 'Computer Vision'],
      color: 'from-purple-500 to-pink-500',
      github: '#',
      demo: '#'
    },
    {
      title: 'PubMedSearch - Medical Research Assistant',
      description: 'AI-powered research assistant built with Python and Streamlit that helps medical professionals efficiently search, analyze, and query PubMed literature using advanced NLP techniques.',
      icon: Search,
      tech: ['Python', 'Streamlit', 'OpenAI API', 'NLP', 'Medical Research'],
      color: 'from-blue-500 to-cyan-500',
      github: '#',
      demo: '#'
    },
    {
      title: 'USMLE Step 1 Assistant',
      description: 'A sophisticated medical education tool leveraging a RAG architecture with long-term memory to provide context-aware answers to complex medical questions.',
      icon: Brain,
      tech: ['RAG', 'LLM', 'Medical Education', 'Context-Aware AI'],
      color: 'from-indigo-500 to-purple-500',
      github: '#',
      demo: '#'
    },
    {
      title: 'Chest Disease Classification Pipeline',
      description: 'End-to-end ML pipeline for classifying chest diseases from CT scan images using TensorFlow, MLflow for experiment tracking, and DVC for version control.',
      icon: Activity,
      tech: ['TensorFlow', 'MLflow', 'DVC', 'Computer Vision', 'Medical Imaging'],
      color: 'from-red-500 to-orange-500',
      github: '#',
      demo: '#'
    },
    {
      title: 'Predicting Dropout from MOUD',
      description: 'Healthcare predictive analytics project focused on predicting patient dropout from Medication for Opioid Use Disorder using advanced machine learning techniques.',
      icon: Heart,
      tech: ['Machine Learning', 'Healthcare Analytics', 'Predictive Modeling', 'Clinical Data'],
      color: 'from-pink-500 to-rose-500',
      github: '#',
      demo: '#'
    },
    {
      title: 'Stock Market Analyzer & Reporter',
      description: 'Comprehensive Streamlit web app that integrates financial data APIs and LLMs to provide technical analysis, sentiment analysis, SWOT reports, and voice-generated summaries.',
      icon: TrendingUp,
      tech: ['Financial Analysis', 'LLM', 'API Integration', 'Streamlit', 'Voice Synthesis'],
      color: 'from-yellow-500 to-orange-500',
      github: '#',
      demo: '#'
    },
    {
      title: 'ResearchBuddy AI',
      description: 'Versatile, multi-model AI chatbot that integrates with OpenAI, Gemini, and Llama APIs and supports analysis of various document formats (PDF, TXT, CSV).',
      icon: MessageSquare,
      tech: ['Multi-model AI', 'Document Analysis', 'Chatbot', 'API Integration'],
      color: 'from-violet-500 to-purple-500',
      github: '#',
      demo: '#'
    },
    {
      title: 'Anemia Detection from Eye Images',
      description: 'Computer vision project using machine learning to detect anemia from conjunctiva images, showcasing expertise in medical image analysis and diagnostic AI.',
      icon: BarChart3,
      tech: ['Computer Vision', 'Medical Imaging', 'Deep Learning', 'Diagnostic AI'],
      color: 'from-green-500 to-teal-500',
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-white/5 dark:bg-dark-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            A showcase of production ML systems, healthcare AI applications, and research projects 
            demonstrating expertise in AWS cloud services and large-scale distributed systems
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full p-4 sm:p-6 rounded-2xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105">
                {/* Project Icon */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center mb-3 sm:mb-4`}>
                  <project.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex space-x-3 sm:space-x-4">
                  <a
                    href={project.github}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;