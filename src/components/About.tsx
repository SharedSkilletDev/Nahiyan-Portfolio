import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Code, Stethoscope, Award, Users, Cloud, Shield } from 'lucide-react';

const About = () => {
  const skills = [
    { icon: Brain, title: 'Machine Learning & AI', description: 'TensorFlow, PyTorch, LLMs, RAG, Fine-tuning, NLP, Computer Vision, Deep Learning' },
    { icon: Cloud, title: 'AWS Cloud Services', description: 'Bedrock, Lambda, S3, Athena, EC2, KMS, CloudTrail, API Gateway' },
    { icon: Database, title: 'Data Science & MLOps', description: 'MLflow, DVC, Model Deployment, Distributed Systems, CI/CD, Docker' },
    { icon: Code, title: 'Programming', description: 'Python, R, SQL, JavaScript with expertise in production ML systems' },
    { icon: Stethoscope, title: 'Healthcare AI', description: 'Clinical Informatics, HIPAA Compliance, Clinical decision support, EHR systems' },
    { icon: Shield, title: 'Research & Analytics', description: '16 publications, 155+ citations, Statistical Analysis, Predictive Modeling' }
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
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Data Scientist and ML Engineer with a Ph.D. in Biomedical Informatics and 4+ years of experience 
            developing production ML systems. Expertise in AWS cloud services, healthcare AI, NLP, and large-scale 
            distributed systems. My work has resulted in 16 publications and 155 citations to date.
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
              I have a proven track record of deploying ML models that improve patient outcomes and operational 
              efficiency, with a strong background in clinical decision support and predictive analytics. My work 
              is dedicated to leveraging large-scale healthcare data to build predictive models and clinical 
              decision support tools that make a real difference in people's lives.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;