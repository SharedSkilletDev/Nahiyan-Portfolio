import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, ExternalLink, Eye, Clock } from 'lucide-react';

const News = () => {
  const newsArticles = [
    {
      title: 'UAMS Researcher Develops AI-Powered Clinical Decision Support Tools',
      publication: 'Arkansas Democrat-Gazette',
      date: '2024-01-15',
      excerpt: 'Ph.D. candidate Nahiyan Bin Noor is revolutionizing healthcare with machine learning models that improve patient risk stratification and reduce opioid-related emergency visits.',
      image: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Healthcare AI',
      readTime: '5 min read',
      views: '2.3K',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Best Paper Award Winner: Analyzing Social Media Toxicity During COVID-19',
      publication: 'IEEE Computer Society',
      date: '2023-11-20',
      excerpt: 'Nahiyan Bin Noor receives prestigious best paper award for groundbreaking research on toxicity patterns across social media platforms during the pandemic.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Research Award',
      readTime: '4 min read',
      views: '1.8K',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Machine Learning Models Predict Veteran Healthcare Outcomes',
      publication: 'Healthcare IT News',
      date: '2023-09-10',
      excerpt: 'New research by UAMS data scientist demonstrates how AI can predict retention, overdoses, and mortality among US military veterans with unprecedented accuracy.',
      image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Veterans Health',
      readTime: '6 min read',
      views: '3.1K',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Telehealth Impact on Opioid Use Disorder: A Data-Driven Analysis',
      publication: 'Modern Healthcare',
      date: '2023-07-25',
      excerpt: 'Comprehensive study of 180,000 patients reveals how telehealth modestly reduces emergency department visits and increases medication adherence for OUD treatment.',
      image: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Telehealth',
      readTime: '7 min read',
      views: '4.2K',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Outstanding Graduate Student Award: Excellence in Biomedical Informatics',
      publication: 'UALR News',
      date: '2023-05-15',
      excerpt: 'Nahiyan Bin Noor recognized for exceptional academic achievement and research contributions in data science and machine learning applications.',
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Academic Achievement',
      readTime: '3 min read',
      views: '1.5K',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'AI-Powered Medical Research Assistant Transforms Literature Review',
      publication: 'MedTech Breakthrough',
      date: '2023-03-08',
      excerpt: 'Innovative PubMedSearch tool leverages OpenAI API to help medical professionals efficiently search and analyze research literature with unprecedented speed.',
      image: 'https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Medical AI',
      readTime: '5 min read',
      views: '2.7K',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const categories = ['All', 'Healthcare AI', 'Research Award', 'Veterans Health', 'Telehealth', 'Academic Achievement', 'Medical AI'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredArticles = selectedCategory === 'All' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  return (
    <section id="news" className="py-20 bg-white/5 dark:bg-dark-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            News & Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Featured coverage of research breakthroughs, awards, and contributions to healthcare AI and data science
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group h-full"
            >
              <div className="h-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 overflow-hidden">
                {/* Article Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${article.color} text-white text-xs font-medium`}>
                    {article.category}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-3">
                    {article.publication}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 font-medium">
                    <span>Read Full Article</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Media Coverage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 rounded-2xl p-8 backdrop-blur-md border border-white/20 dark:border-gray-700/50">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">15+</div>
                <div className="text-gray-600 dark:text-gray-300">Media Features</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">50K+</div>
                <div className="text-gray-600 dark:text-gray-300">Total Reads</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">8</div>
                <div className="text-gray-600 dark:text-gray-300">Publications</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default News;