import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, Eye, Loader } from 'lucide-react';

const Resume = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Replace this with your actual S3 bucket URL
  const resumeUrl = "https://s3.us-east-1.amazonaws.com/sharedskillet.com/resume_June_2025_nahiyan.pdf";
  
  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Nahiyan_Bin_Noor_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct link
      window.open(resumeUrl, '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <section id="resume" className="py-12 sm:py-16 lg:py-20 bg-white/5 dark:bg-dark-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Download or view my complete professional resume with detailed experience, skills, and achievements
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Resume Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Resume Icon/Preview */}
              <div className="flex-shrink-0">
                <div className="w-24 h-32 sm:w-32 sm:h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
              </div>

              {/* Resume Info */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3">
                  Professional Resume
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Comprehensive overview of my experience as a Data Scientist and ML Engineer, including 
                  technical skills, professional achievements, education, certifications, and research contributions.
                </p>
                
                {/* Resume Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">4+</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400">16+</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Publications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400">3</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">AWS Certs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400">155+</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Citations</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.button
                    onClick={handleView}
                    className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    View Resume
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </motion.button>

                  <motion.button
                    onClick={handleDownload}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white dark:hover:bg-blue-400 dark:hover:text-dark-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <Loader className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    )}
                    {isLoading ? 'Downloading...' : 'Download PDF'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Resume Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Resume Highlights
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Technical Expertise',
                  description: 'Python, AWS, TensorFlow, PyTorch, RAG, NLP, Computer Vision',
                  icon: '🔧',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Healthcare AI',
                  description: 'Clinical decision support, HIPAA compliance, Epic Cosmos data',
                  icon: '🏥',
                  color: 'from-green-500 to-teal-500'
                },
                {
                  title: 'Research Impact',
                  description: 'Best Paper Award, 155+ citations, international conferences',
                  icon: '📚',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'Production Systems',
                  description: 'ML models improving patient outcomes, F1-score 0.88',
                  icon: '⚡',
                  color: 'from-orange-500 to-red-500'
                },
                {
                  title: 'Leadership',
                  description: 'Team supervision, project management, cross-functional collaboration',
                  icon: '👥',
                  color: 'from-indigo-500 to-purple-500'
                },
                {
                  title: 'Education',
                  description: 'Ph.D. Biomedical Informatics, MS Information Science, AWS Certified',
                  icon: '🎓',
                  color: 'from-yellow-500 to-orange-500'
                }
              ].map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${highlight.color} flex items-center justify-center mb-3 sm:mb-4 text-lg sm:text-xl`}>
                    {highlight.icon}
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 rounded-2xl p-4 sm:p-6 backdrop-blur-md border border-white/20 dark:border-gray-700/50">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                📄 <strong>Updated:</strong> Latest version includes recent projects, AWS certifications, and research publications. 
                The resume is optimized for both ATS systems and human reviewers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;