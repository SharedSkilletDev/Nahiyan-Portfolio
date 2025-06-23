import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Maximize2, Minimize2, ExternalLink, RefreshCw, AlertCircle, MessageSquare } from 'lucide-react';

interface EnhancedAIProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedAI: React.FC<EnhancedAIProps> = ({ isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'sleeping' | 'error'>('checking');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Try multiple potential URLs for the Streamlit app
  const STREAMLIT_URLS = [
    'https://askme-about-nahiyan.streamlit.app',
    'https://nahiyan-ai-assistant.streamlit.app',
    'https://nahiyan-portfolio-ai.streamlit.app'
  ];
  
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const currentUrl = STREAMLIT_URLS[currentUrlIndex];

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setConnectionStatus('checking');
      checkStreamlitStatus();
    }
  }, [isOpen, currentUrlIndex]);

  const checkStreamlitStatus = async () => {
    try {
      // Try to fetch the Streamlit app to check if it's available
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(currentUrl, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors' // This will help with CORS issues
      });

      clearTimeout(timeoutId);
      setConnectionStatus('connected');
    } catch (error) {
      console.log('Streamlit app check failed:', error);
      setConnectionStatus('sleeping');
      setHasError(true);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
    setConnectionStatus('connected');
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    setConnectionStatus('error');
  };

  const refreshIframe = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      setHasError(false);
      setConnectionStatus('checking');
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const tryNextUrl = () => {
    if (currentUrlIndex < STREAMLIT_URLS.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1);
    } else {
      setCurrentUrlIndex(0); // Reset to first URL
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openInNewTab = () => {
    window.open(currentUrl, '_blank', 'noopener,noreferrer');
  };

  const wakeUpStreamlit = async () => {
    setIsLoading(true);
    setConnectionStatus('checking');
    
    // Try to wake up the Streamlit app by making a request
    try {
      await fetch(currentUrl, { mode: 'no-cors' });
      // Wait a bit for the app to start
      setTimeout(() => {
        refreshIframe();
      }, 3000);
    } catch (error) {
      console.log('Wake up request failed:', error);
      setIsLoading(false);
      setHasError(true);
    }
  };

  const getStatusMessage = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'Connecting to Enhanced AI...';
      case 'connected':
        return 'Enhanced AI is ready!';
      case 'sleeping':
        return 'Enhanced AI is starting up...';
      case 'error':
        return 'Enhanced AI is temporarily unavailable';
      default:
        return 'Checking status...';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm ${
            isFullscreen ? 'p-0' : 'p-4 sm:p-6'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget && !isFullscreen) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden ${
              isFullscreen 
                ? 'w-full h-full rounded-none' 
                : 'w-full h-full max-w-6xl max-h-[90vh] mx-auto'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Enhanced AI Assistant</h3>
                  <p className="text-sm text-emerald-100">
                    {getStatusMessage()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={refreshIframe}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                
                <button
                  onClick={openInNewTab}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative w-full h-full">
              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                  <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">
                      {getStatusMessage()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {connectionStatus === 'sleeping' 
                        ? 'The Enhanced AI is waking up. This can take 30-60 seconds for the first load.'
                        : 'Please wait while we establish connection...'
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {hasError && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                  <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Enhanced AI Temporarily Unavailable
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      The enhanced AI assistant is currently unavailable. This could be because:
                    </p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 text-left mb-6 space-y-1">
                      <li>• The service is starting up (first load can take 30-60 seconds)</li>
                      <li>• The Streamlit app is sleeping and needs to wake up</li>
                      <li>• Temporary network connectivity issues</li>
                      <li>• The service is under maintenance</li>
                    </ul>
                    
                    {/* Current URL indicator */}
                    <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Trying: {currentUrl}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={wakeUpStreamlit}
                        className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Wake Up Enhanced AI</span>
                      </button>
                      
                      <button
                        onClick={tryNextUrl}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Try Alternative URL</span>
                      </button>
                      
                      <button
                        onClick={openInNewTab}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in New Tab</span>
                      </button>
                    </div>

                    {/* Fallback suggestion */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                            Need help right now?
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-300">
                            You can still use the basic AI assistant in the main chat for quick questions about Nahiyan's background and experience.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Iframe */}
              <iframe
                ref={iframeRef}
                src={currentUrl}
                className={`w-full border-0 ${
                  isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-[calc(100vh-200px)] min-h-[500px]'
                } ${isLoading || hasError ? 'opacity-0' : 'opacity-100'}`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Enhanced AI Assistant"
                allow="clipboard-read; clipboard-write"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            </div>

            {/* Footer Info */}
            {!isFullscreen && !isLoading && !hasError && (
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Enhanced AI with RAG capabilities • Powered by advanced language models
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnhancedAI;