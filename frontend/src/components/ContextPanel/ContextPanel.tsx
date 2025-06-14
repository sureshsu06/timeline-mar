import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimelineStore } from '../../store/timelineStore';
import { CompanyStats } from './CompanyStats';
import { SourcesList } from './SourcesList';
import { Commentary } from './Commentary';
import { DesignAnalysis } from './DesignAnalysis';

interface ContextPanelProps {
  className?: string;
}

type TabType = 'stats' | 'sources' | 'commentary' | 'design';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

export const ContextPanel: React.FC<ContextPanelProps> = ({
  className = '',
}) => {
  const { snapshots, currentIndex, timelineData, selectedCompany } = useTimelineStore();
  const [activeTab, setActiveTab] = useState<TabType>('stats');

  const currentSnapshot = snapshots[currentIndex] || null;
  const currentMilestone = (() => {
    if (!timelineData || !currentSnapshot) return null;
    const snapshotDate = new Date(currentSnapshot.snapshotDate);
    const closestMilestone = timelineData.milestones
      .filter(m => new Date(m.milestoneDate) <= snapshotDate)
      .sort((a, b) => new Date(b.milestoneDate).getTime() - new Date(a.milestoneDate).getTime())[0];
    return closestMilestone || null;
  })();

  const tabs: Tab[] = [
    {
      id: 'stats',
      label: 'Stats',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'sources',
      label: 'Sources',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      id: 'commentary',
      label: 'Commentary',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      id: 'design',
      label: 'Design',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
    },
  ];

  if (!selectedCompany) {
    return (
      <div className={`context-panel-empty ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m14 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No company selected
            </h3>
            <p className="text-gray-500">
              Select a company to view context information
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`context-panel ${className}`}>
      {/* Header */}
      <div className="context-panel-header border-b border-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Context
          </h2>
          {currentSnapshot && (
            <p className="text-sm text-gray-500 mt-1">
              {new Date(currentSnapshot.snapshotDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 text-sm font-medium
                border-b-2 transition-colors duration-200
                ${activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 bg-primary-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="context-panel-content flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === 'stats' && (
              <CompanyStats
                company={selectedCompany}
                snapshot={currentSnapshot}
                milestone={currentMilestone}
              />
            )}
            
            {activeTab === 'sources' && (
              <SourcesList
                sources={currentSnapshot?.sources || []}
                snapshot={currentSnapshot}
              />
            )}
            
            {activeTab === 'commentary' && (
              <Commentary
                commentary={currentSnapshot?.commentary?.[0]}
                snapshot={currentSnapshot}
              />
            )}
            
            {activeTab === 'design' && (
              <DesignAnalysis
                analysis={currentSnapshot?.designAnalysis?.[0]}
                snapshot={currentSnapshot}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};