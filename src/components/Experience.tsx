import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, TrendingUp } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Intermediate Data Analyst',
      company: 'Institute for Digital Health and Innovation, UAMS',
      location: 'Little Rock, AR',
      period: 'June 2023 - Present',
      achievements: [
        'Design and deploy ML-powered clinical decision support tools with AUC-ROC: 0.76, F1-score: 0.88',
        'Engineer predictive models using Gradient Boosting on large VHA datasets for opioid misuse prediction',
        'Collaborate with clinical teams to develop capacity forecasting models for workforce optimization',
        'Evaluate telehealth impact on OUD outcomes using Epic Cosmos data from ~180k patients'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Data Scientist & Research Assistant',
      company: 'COSMOS Research Center, UALR',
      location: 'Little Rock, AR',
      period: 'Aug 2021 - May 2023',
      achievements: [
        'Developed NLP-based toxicity classification model with 83% accuracy for content moderation',
        'Mined and analyzed over 2 million Reddit posts using Pushshift API',
        'Presented findings at international conferences on online toxicity and community dynamics',
        'Published research on social media toxicity with significant academic impact'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Electrical Data Analyst',
      company: 'Renata Limited',
      location: 'Bangladesh',
      period: 'Nov 2019 - July 2021',
      achievements: [
        'Led predictive maintenance projects resulting in 20% reduction in equipment downtime',
        'Supervised team of 30+ engineers to optimize HVAC systems',
        'Boosted energy efficiency and reduced operational costs through data-driven insights',
        'Implemented IoT solutions for real-time equipment monitoring'
      ],
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 bg-gray-50/50 dark:bg-dark-800/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Over 4 years of experience applying data science and machine learning 
            in diverse and challenging environments
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline Line - Hidden on mobile */}
              {index < experiences.length - 1 && (
                <div className="hidden sm:block absolute left-6 sm:left-8 top-16 sm:top-20 w-0.5 h-24 sm:h-32 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600"></div>
              )}

              <div className="flex items-start space-x-4 sm:space-x-6">
                {/* Timeline Dot */}
                <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${exp.color} flex items-center justify-center shadow-lg`}>
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300">
                    <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2 sm:mb-0">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col text-xs sm:text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start text-sm sm:text-base text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;