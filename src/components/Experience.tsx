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
        'Improved the identification of high-risk veterans from a 50% baseline to an F1-score of 0.88 (AUC-ROC 0.76) by engineering a Gradient Boosting model with Python',
        'Deployed clinical decision support dashboards in Power BI for real-time patient risk stratification',
        'Demonstrated improved outcomes for telehealth-based OUD care through regression analysis on ~180,000 patients, linking it to fewer ER visits and increased medication receipt',
        'Collaborate with clinical, operational, and HR teams to develop capacity forecasting models for workforce optimization'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Data Scientist',
      company: 'COSMOS, University of Arkansas at Little Rock',
      location: 'Little Rock, AR',
      period: 'August 2021 - May 2023',
      achievements: [
        'Improved real-time content moderation capabilities by developing a Python-based NLP toxicity model that correctly identified toxic content with 83% accuracy',
        'Generated novel insights into online toxicity by conducting an end-to-end analysis of more than 2 million Reddit posts',
        'Revealed actionable patterns and sentiment shifts in online community dynamics',
        'Presented findings at international conferences on social media toxicity and behavioral analysis'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Electrical Data Analyst',
      company: 'Renata Limited',
      location: 'Bangladesh',
      period: 'November 2019 - July 2021',
      achievements: [
        'Spearheaded a predictive maintenance program that leveraged machine learning on equipment sensor data',
        'Successfully reduced machinery downtime by 20% and generated over $20,000 in annual cost savings',
        'Directed a team of over 30 engineers to optimize large-scale HVAC systems',
        'Led the collection and analysis of sensor data to implement data-driven efficiency improvements'
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
            4+ years of experience developing production ML systems in healthcare AI, 
            NLP, and large-scale distributed systems
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