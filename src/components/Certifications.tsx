import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Cloud, Brain } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      description: 'Foundational understanding of AWS cloud services and architecture including EC2, S3, Lambda, and core security practices',
      icon: Cloud,
      color: 'from-orange-500 to-yellow-500',
      year: 'May 2024',
      badgeImage: '/images/aws-certified-cloud-practitioner copy.png'
    },
    {
      title: 'AWS AI Practitioner',
      issuer: 'Amazon Web Services',
      description: 'Expertise in AWS AI and machine learning services including Bedrock, SageMaker, and best practices for ML deployment',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      year: 'May 2024',
      badgeImage: '/images/aws-certified-ai-practitioner (1) copy.png'
    },
    {
      title: 'EPIC COSMOS Data Model',
      issuer: 'Epic Systems',
      description: 'Specialized certification in Epic Cosmos healthcare data model and analytics for clinical research and population health',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      year: 'October 2023'
    }
  ];

  return (
    <section id="certifications" className="py-12 sm:py-16 lg:py-20 bg-gray-50/50 dark:bg-dark-800/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Certifications
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Professional certifications demonstrating expertise in AWS cloud services, healthcare data, and AI technologies
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full p-4 sm:p-6 rounded-2xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105">
                {/* Certification Badge/Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  {cert.badgeImage ? (
                    <img 
                      src={cert.badgeImage} 
                      alt={`${cert.title} Badge`}
                      className="w-full h-full object-contain rounded-lg shadow-lg"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-full h-full rounded-full bg-gradient-to-r ${cert.color} flex items-center justify-center ${cert.badgeImage ? 'hidden' : 'flex'}`}
                    style={{ display: cert.badgeImage ? 'none' : 'flex' }}
                  >
                    <cert.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>

                {/* Certification Content */}
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                    {cert.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-semibold mb-2 sm:mb-3">
                    {cert.issuer}
                  </p>
                  
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed">
                    {cert.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {cert.year}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AWS Digital Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8">
            Verified AWS Digital Badges
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
            {/* AWS Cloud Practitioner Badge */}
            <motion.div 
              className="bg-white/10 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6 backdrop-blur-md border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-3 flex items-center justify-center">
                <img 
                  src="/images/aws-certified-cloud-practitioner copy.png" 
                  alt="AWS Cloud Practitioner Badge"
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    // Fallback to gradient background if image fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 hidden items-center justify-center">
                  <Cloud className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                AWS Cloud Practitioner
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                May 2024
              </p>
            </motion.div>
            
            {/* AWS AI Practitioner Badge */}
            <motion.div 
              className="bg-white/10 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6 backdrop-blur-md border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-3 flex items-center justify-center">
                <img 
                  src="/images/aws-certified-ai-practitioner (1) copy.png" 
                  alt="AWS AI Practitioner Badge"
                  className="w-full h-full object-contain rounded-lg shadow-lg"
                  onError={(e) => {
                    // Fallback to gradient background if image fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hidden items-center justify-center">
                  <Brain className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                AWS AI Practitioner
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                May 2024
              </p>
            </motion.div>
          </div>
          
          {/* Additional info */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>These digital badges verify my expertise in AWS cloud services and AI technologies. 
              <a href="https://www.credly.com/users/nahiyan-bin-noor.be33caad" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 ml-1">
                View all badges on Credly →
              </a>
            </p>
          </div>
        </motion.div>

        {/* Credly Badges Section - Alternative Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 text-center"
        >
          <h4 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
            Official Credly Badges
          </h4>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            {/* Credly Badge Embeds */}
            <div 
              data-iframe-width="150" 
              data-iframe-height="270" 
              data-share-badge-id="a94a6cf2-a484-4ca2-a39d-21dc530f2de5" 
              data-share-badge-host="https://www.credly.com"
              className="bg-white/10 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4"
            ></div>
            <div 
              data-iframe-width="150" 
              data-iframe-height="270" 
              data-share-badge-id="cad5e674-60e1-4a51-8271-f762201653a4" 
              data-share-badge-host="https://www.credly.com"
              className="bg-white/10 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4"
            ></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;