import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-dark-950' : 'bg-gray-50'
    }`}>
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleDarkMode}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkMode ? (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
        ) : (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        )}
      </motion.button>

      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Publications />
      <Education />
      <Certifications />
      <Contact />
      <ChatBot />
    </div>
  );
}

export default App;