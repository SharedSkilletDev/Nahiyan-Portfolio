import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader, AlertCircle, Wifi, WifiOff, Zap, ExternalLink, Bug } from 'lucide-react';
import { ragQuery, checkStreamlitStatus } from '../utils/ragSystem';
import EnhancedAI from './EnhancedAI';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isError?: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnhancedAIOpen, setIsEnhancedAIOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Nahiyan's AI assistant. I can answer questions about his background, experience, research, and projects. For the most comprehensive responses with advanced RAG capabilities, try the Enhanced AI Assistant! What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'enhanced' | 'basic' | 'waking' | 'error'>('checking');
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check connection status on first open
  useEffect(() => {
    if (isOpen && connectionStatus === 'checking') {
      checkConnectionStatus();
    }
  }, [isOpen, connectionStatus]);

  // Periodically check if the enhanced mode becomes available
  useEffect(() => {
    if (connectionStatus === 'basic' || connectionStatus === 'waking') {
      const interval = setInterval(async () => {
        const status = await checkStreamlitStatus();
        if (status === 'available') {
          setConnectionStatus('enhanced');
          setIsWakingUp(false);
          
          // Add a system message about enhanced mode being available
          const systemMessage: Message = {
            id: Date.now().toString(),
            text: "🎉 Enhanced AI mode is now active! Click the 'Enhanced AI' button for the most comprehensive responses with advanced RAG capabilities.",
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, systemMessage]);
        }
      }, 15000); // Check every 15 seconds

      return () => clearInterval(interval);
    }
  }, [connectionStatus]);

  const checkConnectionStatus = async () => {
    try {
      setConnectionStatus('checking');
      const status = await checkStreamlitStatus();
      
      if (status === 'available') {
        setConnectionStatus('enhanced');
        setIsWakingUp(false);
      } else if (status === 'sleeping') {
        setConnectionStatus('basic');
        setIsWakingUp(true);
        
        // The wake-up process is handled in ragQuery
        setTimeout(() => setIsWakingUp(false), 30000); // Stop showing "waking" after 30 seconds
      } else {
        setConnectionStatus('basic');
        setIsWakingUp(false);
      }
    } catch (error) {
      console.log('Connection status check failed:', error);
      setConnectionStatus('basic');
      setIsWakingUp(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await ragQuery(inputText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Update connection status based on response
      if (connectionStatus === 'checking') {
        if (response.includes('enhanced AI assistant is available')) {
          setConnectionStatus('enhanced');
          setIsWakingUp(false);
        } else if (response.includes('basic mode') || response.includes('starting up')) {
          setConnectionStatus('basic');
        } else {
          setConnectionStatus('basic');
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble processing your request right now. Please try asking your question in a different way, or contact Nahiyan directly at nahiyan.cuet@gmail.com.",
        isUser: false,
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusIndicator = () => {
    switch (connectionStatus) {
      case 'checking':
        return <Loader className="w-2 h-2 sm:w-3 sm:h-3 animate-spin text-yellow-500" />;
      case 'enhanced':
        return <Zap className="w-2 h-2 sm:w-3 sm:h-3 text-green-500" />;
      case 'basic':
        return isWakingUp ? <Loader className="w-2 h-2 sm:w-3 sm:h-3 animate-spin text-blue-500" /> : <Wifi className="w-2 h-2 sm:w-3 sm:h-3 text-orange-500" />;
      case 'waking':
        return <Loader className="w-2 h-2 sm:w-3 sm:h-3 animate-spin text-blue-500" />;
      case 'error':
        return <AlertCircle className="w-2 h-2 sm:w-3 sm:h-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'Connecting...';
      case 'enhanced':
        return 'AI Assistant (Enhanced Available)';
      case 'basic':
        return isWakingUp ? 'AI Assistant (Waking Up...)' : 'AI Assistant (Basic Mode)';
      case 'waking':
        return 'AI Assistant (Waking Up...)';
      case 'error':
        return 'AI Assistant (Limited)';
      default:
        return 'AI Assistant';
    }
  };

  const getStatusDescription = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'Initializing AI capabilities...';
      case 'enhanced':
        return 'Enhanced RAG AI available';
      case 'basic':
        return isWakingUp ? 'Enhanced mode starting up...' : 'Basic responses available';
      case 'waking':
        return 'Enhanced mode starting up...';
      case 'error':
        return 'Limited functionality';
      default:
        return 'Ask me about Nahiyan';
    }
  };

  return (
    <>
      {/* Enhanced AI Assistant Button - Always Visible */}
      <motion.button
        onClick={() => setIsEnhancedAIOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base font-semibold flex items-center space-x-2 hover:scale-105"
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Enhanced AI</span>
      </motion.button>

      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-80 sm:w-96 h-96 sm:h-[500px] bg-white/10 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/20 dark:border-gray-700/50">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-xs sm:text-sm">
                      {getStatusText()}
                    </h3>
                    {getStatusIndicator()}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{getStatusDescription()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Debug Button */}
                <button
                  onClick={() => setDebugMode(!debugMode)}
                  className="p-1 hover:bg-white/20 dark:hover:bg-gray-700/50 rounded-full transition-colors duration-200 text-gray-500 hover:text-gray-400"
                  title="Toggle Debug Mode"
                >
                  <Bug className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                {/* Enhanced AI Link */}
                <button
                  onClick={() => setIsEnhancedAIOpen(true)}
                  className="p-1 hover:bg-white/20 dark:hover:bg-gray-700/50 rounded-full transition-colors duration-200 text-emerald-500 hover:text-emerald-400"
                  title="Open Enhanced AI Assistant"
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 dark:hover:bg-gray-700/50 rounded-full transition-colors duration-200"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Debug Info */}
            {debugMode && (
              <div className="px-3 sm:px-4 py-2 bg-gray-500/20 border-b border-gray-500/30">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  Status: {connectionStatus} | Waking: {isWakingUp ? 'Yes' : 'No'}
                  <br />
                  <button 
                    onClick={() => ragQuery('test connection')}
                    className="text-blue-500 hover:text-blue-400 underline"
                  >
                    Test Connection
                  </button>
                </p>
              </div>
            )}

            {/* Enhanced AI Promotion Banner */}
            <div className="px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-b border-emerald-500/30">
              <div className="flex items-center justify-between">
                <p className="text-xs text-emerald-700 dark:text-emerald-300 flex items-center space-x-1">
                  <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
                  <span>Try Enhanced AI with RAG!</span>
                </p>
                <button 
                  onClick={() => setIsEnhancedAIOpen(true)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 font-semibold flex items-center space-x-1"
                >
                  <span>Open</span>
                  <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
                </button>
              </div>
            </div>

            {/* Connection Status Banner */}
            {connectionStatus === 'basic' && !isWakingUp && (
              <div className="px-3 sm:px-4 py-2 bg-orange-500/20 border-b border-orange-500/30">
                <p className="text-xs text-orange-700 dark:text-orange-300 flex items-center space-x-1">
                  <Wifi className="w-2 h-2 sm:w-3 sm:h-3" />
                  <span>Running in basic mode - enhanced AI is starting up</span>
                </p>
              </div>
            )}

            {(connectionStatus === 'waking' || isWakingUp) && (
              <div className="px-3 sm:px-4 py-2 bg-blue-500/20 border-b border-blue-500/30">
                <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center space-x-1">
                  <Loader className="w-2 h-2 sm:w-3 sm:h-3 animate-spin" />
                  <span>Enhanced RAG AI mode is waking up...</span>
                </p>
              </div>
            )}

            {connectionStatus === 'error' && (
              <div className="px-3 sm:px-4 py-2 bg-red-500/20 border-b border-red-500/30">
                <p className="text-xs text-red-700 dark:text-red-300 flex items-center space-x-1">
                  <AlertCircle className="w-2 h-2 sm:w-3 sm:h-3" />
                  <span>AI services temporarily unavailable</span>
                </p>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-1 sm:space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser 
                        ? 'bg-blue-500' 
                        : message.isError
                        ? 'bg-red-500'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {message.isUser ? (
                        <User className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      ) : message.isError ? (
                        <AlertCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      ) : (
                        <Bot className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      )}
                    </div>
                    <div className={`p-2 sm:p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-blue-500 text-white'
                        : message.isError
                        ? 'bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30'
                        : 'bg-white/20 dark:bg-gray-800/50 text-gray-800 dark:text-white'
                    }`}>
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-1 sm:space-x-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Bot className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                    </div>
                    <div className="bg-white/20 dark:bg-gray-800/50 p-2 sm:p-3 rounded-2xl">
                      <Loader className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 border-t border-white/20 dark:border-gray-700/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Nahiyan..."
                  className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/20 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced AI Modal */}
      <EnhancedAI 
        isOpen={isEnhancedAIOpen} 
        onClose={() => setIsEnhancedAIOpen(false)} 
      />
    </>
  );
};

export default ChatBot;