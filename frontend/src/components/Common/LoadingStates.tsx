import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-primary-200 border-t-primary-600 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
};

export const SkeletonCard: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
    <div className="space-y-2">
      <div className="bg-gray-200 rounded h-4 w-3/4"></div>
      <div className="bg-gray-200 rounded h-4 w-1/2"></div>
    </div>
  </div>
);

export const TimelineLoadingState: React.FC = () => (
  <div className="timeline-loading p-6">
    <div className="animate-pulse space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="bg-gray-200 rounded h-6 w-32"></div>
        <div className="bg-gray-200 rounded h-6 w-24"></div>
      </div>
      
      {/* Timeline skeleton */}
      <div className="space-y-2">
        <div className="bg-gray-200 rounded-full h-2 w-full"></div>
        <div className="flex justify-between">
          <div className="bg-gray-200 rounded h-3 w-12"></div>
          <div className="bg-gray-200 rounded h-3 w-12"></div>
        </div>
      </div>
      
      {/* Controls skeleton */}
      <div className="flex justify-center space-x-4">
        <div className="bg-gray-200 rounded-full h-10 w-10"></div>
        <div className="bg-gray-200 rounded-full h-12 w-12"></div>
        <div className="bg-gray-200 rounded-full h-10 w-10"></div>
      </div>
    </div>
  </div>
);

export const PreviewLoadingState: React.FC = () => (
  <div className="preview-loading p-6">
    <div className="animate-pulse space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="space-y-2">
          <div className="bg-gray-200 rounded h-5 w-40"></div>
          <div className="bg-gray-200 rounded h-3 w-24"></div>
        </div>
        <div className="flex space-x-2">
          <div className="bg-gray-200 rounded h-8 w-20"></div>
          <div className="bg-gray-200 rounded h-8 w-8"></div>
        </div>
      </div>
      
      {/* Image skeleton */}
      <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    </div>
  </div>
);

export const ContextPanelLoadingState: React.FC = () => (
  <div className="context-panel-loading p-6">
    <div className="animate-pulse space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="bg-gray-200 rounded h-5 w-32"></div>
        <div className="bg-gray-200 rounded h-3 w-24"></div>
      </div>
      
      {/* Tabs skeleton */}
      <div className="flex space-x-4 border-b border-gray-200">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-gray-200 rounded h-8 w-16"></div>
        ))}
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-2">
            <div className="bg-gray-200 rounded h-4 w-full"></div>
            <div className="bg-gray-200 rounded h-4 w-3/4"></div>
            <div className="bg-gray-200 rounded h-4 w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const MainLoadingState: React.FC = () => (
  <div className="main-loading min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <h2 className="text-xl font-semibold text-gray-900 mt-4">
        Loading Website Timeline
      </h2>
      <p className="text-gray-500 mt-2">
        Preparing the evolution viewer...
      </p>
    </div>
  </div>
);