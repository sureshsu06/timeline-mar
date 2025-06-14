import React from 'react';
import { motion } from 'framer-motion';
import { Snapshot, Milestone } from '../../types';

interface TimelineMarkersProps {
  snapshots: Snapshot[];
  milestones: Milestone[];
  currentIndex: number;
  className?: string;
}

export const TimelineMarkers: React.FC<TimelineMarkersProps> = ({
  snapshots,
  milestones,
  currentIndex,
  className = '',
}) => {
  if (snapshots.length === 0) return null;

  const getMarkerPosition = (date: string) => {
    const targetDate = new Date(date);
    const startDate = new Date(snapshots[0].snapshotDate);
    const endDate = new Date(snapshots[snapshots.length - 1].snapshotDate);
    
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsed = targetDate.getTime() - startDate.getTime();
    
    return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'funding':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
        );
      case 'product':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        );
      case 'team':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>
        );
      case 'acquisition':
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getMilestoneColor = (type: string) => {
    switch (type) {
      case 'funding': return 'text-green-600 bg-green-100';
      case 'product': return 'text-blue-600 bg-blue-100';
      case 'team': return 'text-purple-600 bg-purple-100';
      case 'acquisition': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`timeline-markers ${className}`}>
      <div className="relative h-8">
        {/* Milestone markers */}
        {milestones.map((milestone) => {
          const position = getMarkerPosition(milestone.milestoneDate);
          const colorClass = getMilestoneColor(milestone.type);
          
          return (
            <motion.div
              key={milestone.id}
              className="absolute transform -translate-x-1/2 group"
              style={{ left: `${position}%`, top: '0px' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Milestone marker */}
              <div className={`
                w-6 h-6 rounded-full border-2 border-white shadow-lg
                flex items-center justify-center cursor-pointer
                transition-all duration-200 hover:scale-110
                ${colorClass}
              `}>
                {getMilestoneIcon(milestone.type)}
              </div>
              
              {/* Tooltip */}
              <div className="
                absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none z-10
              ">
                <div className="font-medium">{milestone.title}</div>
                <div className="text-gray-300">
                  {new Date(milestone.milestoneDate).toLocaleDateString()}
                </div>
                {/* Tooltip arrow */}
                <div className="
                  absolute top-full left-1/2 transform -translate-x-1/2
                  border-l-4 border-r-4 border-t-4
                  border-l-transparent border-r-transparent border-t-gray-900
                " />
              </div>
            </motion.div>
          );
        })}
        
        {/* Current position indicator */}
        {snapshots[currentIndex] && (
          <motion.div
            className="absolute transform -translate-x-1/2"
            style={{ 
              left: `${getMarkerPosition(snapshots[currentIndex].snapshotDate)}%`,
              top: '24px'
            }}
            layoutId="current-position"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-0.5 h-4 bg-primary-500" />
          </motion.div>
        )}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-2 text-xs text-gray-500">
        {[
          { type: 'funding', label: 'Funding' },
          { type: 'product', label: 'Product' },
          { type: 'team', label: 'Team' },
          { type: 'acquisition', label: 'Acquisition' },
        ].map(({ type, label }) => (
          <div key={type} className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded-full flex items-center justify-center ${getMilestoneColor(type)}`}>
              {getMilestoneIcon(type)}
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};