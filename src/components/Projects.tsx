import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Brain, Search, Heart, TrendingUp, MessageSquare, Activity, Microscope, BarChart3, Lock, X } from 'lucide-react';

const Projects = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [currentProject, setCurrentProject] = useState('');

  const handlePrivateProjectClick = (projectTitle: string, linkType: string) => {
    setCurrentProject(`${projectTitle} - ${linkType}`);
    setShowPrivacyModal(true);
  };

  const projects = [
    {
      title: 'Clinical Summarization System & AI Research Tools',
      description: 'HIPAA-compliant, serverless NLP pipeline on AWS (Bedrock, Lambda, S3) to automate summarization of complex clinical notes from MIMIC-IV dataset using RAG architecture with LLaMA-7B.',
      icon: Microscope,
      tech: ['AWS Bedrock', 'Lambda', 'S3', 'RAG', 'LLaMA-7B', 'HIPAA Compliance'],
      color: 'from-emerald-500 to-teal-500',
      github: 'private',
      demo: 'private',
      isPrivate: true
    },
    {
      title: 'Comparative Analysis of SOTA Vision Models',
      description: 'Created novel dataset (BanglaFood-45) and benchmarked ViT, CLIP, and Large Multi-modal Models (GPT-4o, LLaVA) across zero-shot, fine-tuning, and LoRA paradigms for culturally-specific data.',
      icon: Brain,
      tech: ['ViT', 'CLIP', 'GPT-4o', 'LLaVA', 'LoRA', 'Computer Vision'],
      color: 'from-purple-500 to-pink-500',
      github: 'https://github.com/Nahiyan140212/Traditional-Bangladeshi-Food-Classification-with-LLM',
      demo: 'https://github.com/Nahiyan140212/Traditional-Bangladeshi-Food-Classification-with-LLM'
    },
    {
      title: 'PubMedSearch - Medical Research Assistant',
      description: 'AI-powered research assistant built with Python and Streamlit that helps medical professionals efficiently search, analyze, and query PubMed literature using advanced NLP techniques.',
      icon: Search,
      tech: ['Python', 'Streamlit', 'OpenAI API', 'NLP', 'Medical Research'],
      color: 'from-blue-500 to-cyan-500',
      github: 'https://github.com/Nahiyan140212/Pubmed-Article-Search-and-Summarizer',
      demo: 'https://noor-pubmed-summarizer.streamlit.app/'
    },
    {
      title: 'USMLE Step 1 Assistant',
      description: 'A sophisticated medical education tool leveraging a RAG architecture with long-term memory to provide context-aware answers to complex medical questions.',
      icon: Brain,
      tech: ['RAG', 'LLM', 'Medical Education', 'Context-Aware AI'],
      color: 'from-indigo-500 to-purple-500',
      github: 'https://github.com/Nahiyan140212/MedPrepAI-RAG',
      demo: 'https://huggingface.co/spaces/Nahiyan14/USMLEPrepAI'
    },
    {
      title: 'Chest Disease Classification Pipeline',
      description: 'End-to-end ML pipeline for classifying chest diseases from CT scan images using TensorFlow, MLflow for experiment tracking, and DVC for version control.',
      icon: Activity,
      tech: ['TensorFlow', 'MLflow', 'DVC', 'Computer Vision', 'Medical Imaging'],
      color: 'from-red-500 to-orange-500',
      github: 'https://github.com/Nahiyan140212/Chest-Disease-Classification-from-Chest-CT-Scan-Image',
      demo: 'https://github.com/Nahiyan140212/Chest-Disease-Classification-from-Chest-CT-Scan-Image'
    },
    {
      title: 'Predicting Dropout from MOUD',
      description: 'Healthcare predictive analytics project focused on predicting patient dropout from Medication for Opioid Use Disorder using advanced machine learning techniques.',
      icon: Heart,
      tech: ['Machine Learning', 'Healthcare Analytics', 'Predictive Modeling', 'Clinical Data'],
      color: 'from-pink-500 to-rose-500',
      github: 'https://github.com/Nahiyan140212/Predicting-Dropout-from-Medication-for-Opioid-Use-Disorder',
      demo: 'https://huggingface.co/spaces/Nahiyan14/Retention_Prediction_App'
    },
    {
      title: 'Stock Market Analyzer & Reporter',
      description: 'Comprehensive Streamlit web app that integrates financial data APIs and LLMs to provide technical analysis, sentiment analysis, SWOT reports, and voice-generated summaries.',
      icon: TrendingUp,
      tech: ['Financial Analysis', 'LLM', 'API Integration', 'Streamlit', 'Voice Synthesis'],
      color: 'from-yellow-500 to-orange-500',
      github: 'https://github.com/Nahiyan140212/StockAnalyzerAI',
      demo: 'https://smart-stock-analyzer.streamlit.app/'
    },
    {
      title: 'ResearchBuddy AI',
      description: 'Versatile, multi-model AI chatbot that integrates with OpenAI, Gemini, and Llama APIs and supports analysis of various document formats (PDF, TXT, CSV).',
      icon: MessageSquare,
      tech: ['Multi-model AI', 'Document Analysis', 'Chatbot', 'API Integration'],
      color: 'from-violet-500 to-purple-500',
      github: 'https://github.com/Nahiyan140212/ResearchBuddyAI',
      demo: 'https://researchbuddyai.streamlit.app/'
    },
    {
      title: 'Anemia Detection from Eye Images',
      description: 'Computer vision project using machine learning to detect anemia from conjunctiva images, showcasing expertise in medical image analysis and diagnostic AI.',
      icon: BarChart3,
      tech: ['Computer Vision', 'Medical Imaging', 'Deep Learning', 'Diagnostic AI'],
      color: 'from-green-500 to-teal-500',
      github: 'https://github.com/Nahiyan140212/Detection-of-Anemia-from-Eye-Conjunctiva-Images-using-Deep-Learning',
      demo: 'https://huggingface.co/spaces/Nahiyan14/Conjuctiva_Image_Based_Anemia_Prediction'
    }
  ];

  const handleLinkClick = (project: any, linkType: 'github' | 'demo') => {
    if (project.isPrivate) {
      handlePrivateProjectClick(project.title, linkType === 'github' ? 'Source Code' : 'Demo');
    } else {
      const url = linkType === 'github' ? project.github : project.demo;
      window.open(url, '_blank');
    }
  };

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
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center mb-3 sm:mb-4 relative`}>
                  <project.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  {project.isPrivate && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Lock className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                  {project.title}
                  {project.isPrivate && (
                    <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full">
                      Private
                    </span>
                  )}
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
                  <button
                    onClick={() => handleLinkClick(project, 'github')}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {project.isPrivate ? (
                      <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    ) : (
                      <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    )}
                    Code
                  </button>
                  <button
                    onClick={() => handleLinkClick(project, 'demo')}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    {project.isPrivate ? (
                      <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    ) : (
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    )}
                    Demo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Privacy Modal */}
        <AnimatePresence>
          {showPrivacyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowPrivacyModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white/10 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-gray-700/50 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                      Private Project
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowPrivacyModal(false)}
                    className="p-2 hover:bg-white/20 dark:hover:bg-gray-700/50 rounded-full transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                    <p className="text-sm sm:text-base text-yellow-700 dark:text-yellow-300 font-medium mb-2">
                      🔒 Confidential Project
                    </p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      <strong>{currentProject}</strong>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      This project involves sensitive healthcare data and proprietary algorithms that cannot be publicly shared due to:
                    </p>
                    
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>HIPAA Compliance:</strong> Contains protected health information</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Institutional Policy:</strong> Proprietary research and clinical data</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Privacy Protection:</strong> Patient data confidentiality requirements</span>
                      </li>
                    </ul>

                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-4">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        💡 <strong>Interested in learning more?</strong> I'd be happy to discuss the technical approach, methodologies, and results in a professional setting. Please feel free to contact me directly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <motion.button
                    onClick={() => setShowPrivacyModal(false)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Understood
                  </motion.button>
                  <motion.a
                    href="#contact"
                    onClick={() => setShowPrivacyModal(false)}
                    className="flex-1 px-4 py-2 border-2 border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:hover:bg-blue-400 dark:hover:text-dark-900 transition-all duration-300 text-center text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Me
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;