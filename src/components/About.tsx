import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Code, Stethoscope, Award, Users } from 'lucide-react';

const About = () => {
  const skills = [
    { icon: Brain, title: 'Machine Learning', description: 'Advanced ML algorithms, deep learning, and AI model development' },
    { icon: Database, title: 'Data Science', description: 'Statistical analysis, predictive modeling, and data visualization' },
    { icon: Code, title: 'Programming', description: 'Python, SQL, TensorFlow, PyTorch, React, and full-stack development' },
    { icon: Stethoscope, title: 'Healthcare AI', description: 'Clinical decision support, medical image analysis, and EHR systems' },
    { icon: Award, title: 'Research', description: '152+ citations, best paper awards, and published research' },
    { icon: Users, title: 'Leadership', description: 'Team management, project leadership, and community involvement' }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white/5 dark:bg-dark-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            I am a passionate Data Scientist and Machine Learning Engineer with over 4 years of experience 
            in healthcare AI. Currently pursuing my Ph.D. in Biomedical Informatics at UAMS, I specialize 
            in developing sophisticated AI-powered applications that tackle complex medical challenges.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="p-4 sm:p-6 rounded-2xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 h-full">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mr-3 sm:mr-4">
                    <skill.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                    {skill.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 rounded-2xl p-6 sm:p-8 backdrop-blur-md border border-white/20 dark:border-gray-700/50">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-white">
              My Mission
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              I'm dedicated to improving patient outcomes and enhancing operational efficiency within 
              clinical settings through actionable, data-driven insights. My work focuses on leveraging 
              large-scale healthcare data to build predictive models and clinical decision support tools 
              that make a real difference in people's lives.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;