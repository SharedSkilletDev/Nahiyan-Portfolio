import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, ExternalLink, Quote } from 'lucide-react';

const Publications = () => {
  const publications = [
    {
      title: 'Comparing Toxicity Across Social Media Platforms for COVID 19 Discourse',
      venue: 'The Ninth International Conference on Human and Social Analytics (HUSO 2023)',
      type: 'Best Paper Award',
      year: '2023',
      description: 'Comprehensive analysis of toxicity patterns across different social media platforms during COVID-19 discourse.',
      citations: 15,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Association between different modalities of opioid use disorder-related care delivery and patient outcomes',
      venue: 'Addictive Behaviors Reports',
      type: 'Journal Article',
      year: '2023',
      description: 'Analysis of care delivery modalities and their impact on opioid use disorder patient outcomes.',
      citations: 28,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Development and validation of machine-learning algorithms predicting retention, overdoses, and all-cause mortality among US military veterans',
      venue: 'Journal of Addictive Diseases',
      type: 'Journal Article',
      year: '2023',
      description: 'Machine learning models for predicting critical outcomes in military veteran populations.',
      citations: 42,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Toxicity in Reddit Discussion Threads: Impacts and Predictive Insights',
      venue: '16th International Conference on Social Computing, Behavioral-Cultural Modeling Prediction',
      type: 'Conference Paper',
      year: '2023',
      description: 'Predictive modeling of toxicity in online discussion threads with behavioral insights.',
      citations: 31,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Comparative Study Between Decision Tree, SVM, and KNN to Predict Anaemic Condition',
      venue: 'IEEE Xplore',
      type: 'Conference Paper',
      year: '2022',
      description: 'Comparative analysis of machine learning algorithms for anemia prediction.',
      citations: 36,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const stats = [
    { label: 'Total Citations', value: '152+', icon: Quote },
    { label: 'Publications', value: '15+', icon: BookOpen },
    { label: 'Best Paper Awards', value: '1', icon: Award }
  ];

  return (
    <section id="publications" className="py-12 sm:py-16 lg:py-20 bg-gray-50/50 dark:bg-dark-800/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Publications & Research
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Active contributor to the scientific community with significant research impact
          </p>
        </motion.div>

        {/* Research Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
                  <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-base text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Publications List */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  {/* Publication Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${pub.color} flex items-center justify-center`}>
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Publication Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                          {pub.title}
                        </h3>
                        <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-medium mb-1">
                          {pub.venue}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {pub.type}
                          </span>
                          <span>{pub.year}</span>
                          <span>{pub.citations} citations</span>
                        </div>
                      </div>
                      <button className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 self-start">
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        View
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {pub.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Scholar Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            View Full Publication List on Google Scholar
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;