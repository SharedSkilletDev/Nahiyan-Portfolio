import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Cloud, Brain } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: 'EPIC COSMOS Data Model',
      issuer: 'Epic Systems',
      description: 'Specialized certification in Epic Cosmos healthcare data model and analytics',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      year: '2023'
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      description: 'Foundational understanding of AWS cloud services and architecture',
      icon: Cloud,
      color: 'from-orange-500 to-yellow-500',
      year: '2023'
    },
    {
      title: 'AWS AI Practitioner',
      issuer: 'Amazon Web Services',
      description: 'Expertise in AWS AI and machine learning services and best practices',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      year: '2024'
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-gray-50/50 dark:bg-dark-800/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Certifications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional certifications demonstrating expertise in cloud computing, healthcare data, and AI technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full p-6 rounded-2xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105">
                {/* Certification Icon */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${cert.color} flex items-center justify-center mb-6 mx-auto`}>
                  <cert.icon className="w-8 h-8 text-white" />
                </div>

                {/* Certification Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
                    {cert.issuer}
                  </p>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {cert.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                    <Award className="w-4 h-4 mr-1" />
                    {cert.year}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credly Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
            Verified Badges
          </h3>
          <div className="flex justify-center items-center space-x-8">
            <div 
              data-iframe-width="200" 
              data-iframe-height="360" 
              data-share-badge-id="a94a6cf2-a484-4ca2-a39d-21dc530f2de5" 
              data-share-badge-host="https://www.credly.com"
              className="bg-white/10 dark:bg-gray-800/50 rounded-lg p-4"
            ></div>
            <div 
              data-iframe-width="150" 
              data-iframe-height="270" 
              data-share-badge-id="cad5e674-60e1-4a51-8271-f762201653a4" 
              data-share-badge-host="https://www.credly.com"
              className="bg-white/10 dark:bg-gray-800/50 rounded-lg p-4"
            ></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;