import React from 'react';
import { motion } from 'framer-motion';
import { useTimelineStore } from './store/timelineStore';
import { CompanySelector } from './components/Common/CompanySelector';
import { TimelineContainer } from './components/Timeline/TimelineContainer';
import { WebsitePreview } from './components/Preview/WebsitePreview';
import { ContextPanel } from './components/ContextPanel/ContextPanel';
import { 
  MainLoadingState, 
  TimelineLoadingState, 
  PreviewLoadingState, 
  ContextPanelLoadingState 
} from './components/Common/LoadingStates';

function App() {
  const { isLoading, error, selectedCompany, timelineData } = useTimelineStore();

  if (isLoading && !selectedCompany) {
    return <MainLoadingState />;
  }

  return (
    <div className="app min-h-screen bg-gray-50">
      {/* Header */}
      <header className="app-header bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and title */}
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Website Evolution Timeline
                </h1>
                <p className="text-sm text-gray-500">
                  Explore how company websites have evolved over time
                </p>
              </div>
            </div>

            {/* Company selector */}
            <div className="w-80">
              <CompanySelector />
            </div>
          </div>
        </div>
      </header>

      {/* Error state */}
      {error && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-4 m-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <main className="app-main">
        {!selectedCompany ? (
          /* Welcome state */
          <div className="welcome-state flex items-center justify-center min-h-[calc(100vh-4rem)]">
            <motion.div
              className="text-center max-w-md mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-24 h-24 mx-auto mb-8 bg-primary-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m14 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Website Evolution Timeline
              </h2>
              <p className="text-gray-600 mb-8">
                Discover how major company websites have transformed over the years. 
                Select a company from the dropdown above to start exploring their digital evolution.
              </p>
              <div className="text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-6 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Interactive timeline
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Historical context
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Design analysis
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Timeline view */
          <div className="timeline-view">
            {/* Timeline controls */}
            <div className="timeline-section bg-white border-b border-gray-200">
              {isLoading ? (
                <TimelineLoadingState />
              ) : (
                <TimelineContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" />
              )}
            </div>

            {/* Main content area */}
            <div className="content-area flex">
              {/* Website preview */}
              <div className="preview-section flex-1 bg-white">
                {isLoading ? (
                  <PreviewLoadingState />
                ) : (
                  <WebsitePreview className="h-[calc(100vh-12rem)]" />
                )}
              </div>

              {/* Context panel */}
              <div className="context-section w-96 bg-gray-50 border-l border-gray-200">
                {isLoading ? (
                  <ContextPanelLoadingState />
                ) : (
                  <ContextPanel className="h-[calc(100vh-12rem)]" />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Built with React, TypeScript, and Framer Motion
            </div>
            <div className="flex items-center space-x-4">
              <span>Powered by Wayback Machine</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-700 transition-colors duration-200"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
