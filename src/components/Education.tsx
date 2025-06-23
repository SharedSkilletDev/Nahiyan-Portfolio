import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: 'Ph.D. in Biomedical Informatics',
      school: 'University of Arkansas for Medical Sciences (UAMS)',
      location: 'Little Rock, AR',
      period: 'Expected Dec 2027',
      status: 'Part-time',
      gpa: 'In Progress',
      description: 'Research focuses on leveraging large-scale healthcare data (including Epic Cosmos) to build predictive models and clinical decision support tools.',
      color: 'from-blue-500 to-cyan-500',
      achievements: []
    },
    {
      degree: 'Master of Science in Information Science',
      school: 'University of Arkansas at Little Rock (UALR)',
      location: 'Little Rock, AR',
      period: 'May 2023',
      status: 'Completed',
      gpa: '3.90/4.00',
      description: 'Specialized in data science, machine learning, and information systems with focus on healthcare applications.',
      color: 'from-purple-500 to-pink-500',
      achievements: [
        'Outstanding Graduate Student (2022-2023)',
        'Outstanding Masters Student (2021-2022)'
      ]
    },
    {
      degree: 'Graduate Certificate in Data Science',
      school: 'University of Arkansas at Little Rock (UALR)',
      location: 'Little Rock, AR',
      period: 'May 2023',
      status: 'Completed',
      gpa: '4.00/4.00',
      description: 'Specialized expertise in database architecture, data privacy, and visualization.',
      color: 'from-green-500 to-teal-500',
      achievements: ['Perfect GPA Achievement']
    },
    {
      degree: 'B.Sc. in Electrical & Electronic Engineering',
      school: 'Chittagong University of Engineering & Technology (CUET)',
      location: 'Bangladesh',
      period: 'Oct 2019',
      status: 'Completed',
      gpa: '3.54/4.00',
      description: 'Strong foundation in engineering principles with focus on electronics and signal processing.',
      color: 'from-orange-500 to-red-500',
      achievements: ['Scholarships in every semester for academic excellence']
    }
  ];

  return (
    <section id="education" className="py-12 sm:py-16 lg:py-20 bg-white/5 dark:bg-dark-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Academic journey marked by consistent high achievement and commitment to continuous learning
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline Line - Hidden on mobile */}
              {index < education.length - 1 && (
                <div className="hidden sm:block absolute left-6 sm:left-8 top-16 sm:top-20 w-0.5 h-24 sm:h-32 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600"></div>
              )}

              <div className="flex items-start space-x-4 sm:space-x-6">
                {/* Timeline Dot */}
                <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${edu.color} flex items-center justify-center shadow-lg`}>
                  <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300">
                    <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-1 sm:mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                          {edu.school}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                      <div className="flex flex-col text-xs sm:text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {edu.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {edu.location}
                        </div>
                        <div className="font-semibold text-green-600 dark:text-green-400">
                          GPA: {edu.gpa}
                        </div>
                      </div>
                    </div>

                    {/* Achievements */}
                    {edu.achievements.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                          <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Achievements
                        </h4>
                        <ul className="space-y-1">
                          {edu.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-500 mt-1.5 sm:mt-2 mr-2 flex-shrink-0"></div>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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

export default Education;