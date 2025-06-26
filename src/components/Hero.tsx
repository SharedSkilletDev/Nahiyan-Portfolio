import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ChevronDown, Award, MapPin, Calendar } from 'lucide-react';

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Nahiyan140212', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/nahiyan-bin-noor-0a2170158/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:nahiyan.cuet@gmail.com', label: 'Email' },
    { icon: Phone, href: 'tel:+15015393633', label: 'Phone' }
  ];

  const achievements = [
    { icon: Award, label: 'Best Paper Award', value: 'HUSO 2023' },
    { icon: Calendar, label: 'Experience', value: '4+ Years' },
    { icon: MapPin, label: 'Location', value: 'Little Rock, AR' }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/30 dark:from-dark-950 dark:via-blue-950/40 dark:to-indigo-950/50 px-4">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Subtle Animated Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto text-center relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8 sm:space-y-12"
        >
          {/* Professional Header */}
          <motion.div
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Name with Professional Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white leading-tight">
              <span className="block">Nahiyan</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Bin Noor
              </span>
            </h1>

            {/* Professional Title */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Data Scientist & Machine Learning Engineer
              </h2>
              <div className="flex items-center justify-center space-x-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Ph.D. Candidate in Biomedical Informatics</span>
              </div>
            </div>
          </motion.div>

          {/* Professional Summary */}
          <motion.div
            className="max-w-4xl mx-auto space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed px-4 font-medium">
              Specialized in Healthcare AI & AWS Cloud Architecture
            </p>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed px-4 max-w-3xl mx-auto">
              4+ years developing production ML systems with expertise in clinical decision support, 
              HIPAA-compliant architectures, and large-scale distributed systems. 
              <span className="font-semibold text-blue-600 dark:text-blue-400"> 16 publications, 155+ citations.</span>
            </p>
          </motion.div>

          {/* Achievement Badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-full border border-white/20 dark:border-gray-700/50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <achievement.icon className="w-4 h-4 text-blue-500" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  {achievement.label}:
                </span>
                <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                  {achievement.value}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Professional Social Links */}
          <motion.div
            className="flex justify-center space-x-4 sm:space-x-6 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 sm:p-4 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <link.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {link.label}
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Professional CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center px-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.a
              href="#resume"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm sm:text-base font-semibold flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Award className="w-4 h-4" />
              <span>View Resume</span>
            </motion.a>
            <motion.a
              href="#contact"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-dark-900 transition-all duration-300 text-center text-sm sm:text-base font-semibold flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </motion.a>
          </motion.div>

          {/* Key Specializations */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
              {[
                { label: 'AWS Certified', icon: '☁️' },
                { label: 'Healthcare AI', icon: '🏥' },
                { label: 'RAG Systems', icon: '🤖' },
                { label: 'MLOps', icon: '⚡' }
              ].map((spec, index) => (
                <motion.div
                  key={spec.label}
                  className="text-center p-3 rounded-lg bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm border border-white/10 dark:border-gray-700/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-lg sm:text-xl mb-1">{spec.icon}</div>
                  <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                    {spec.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Professional Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
              Explore Portfolio
            </span>
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;