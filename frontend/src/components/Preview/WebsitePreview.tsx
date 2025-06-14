import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimelineStore } from '../../store/timelineStore';
import { PreviewControls } from './PreviewControls';
import { TransitionEffect } from './TransitionEffect';

interface WebsitePreviewProps {
  className?: string;
}

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  className = '',
}) => {
  const { snapshots, currentIndex } = useTimelineStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const currentSnapshot = snapshots[currentIndex] || null;

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.25, 0.25));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  if (!currentSnapshot) {
    return (
      <div className={`website-preview-empty ${className}`}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No snapshot selected
            </h3>
            <p className="text-gray-500">
              Use the timeline to browse website snapshots
            </p>
          </div>
        </div>
      </div>
    );
  }

  const snapshotDate = new Date(currentSnapshot.snapshotDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`website-preview ${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      {/* Header */}
      <div className="preview-header flex items-center justify-between p-4 border-b border-gray-200">
        <div className="preview-info">
          <h2 className="text-lg font-semibold text-gray-900">
            {currentSnapshot.company?.name || 'Website Preview'}
          </h2>
          <p className="text-sm text-gray-500">{snapshotDate}</p>
        </div>
        
        <PreviewControls
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      </div>

      {/* Preview content */}
      <div className="preview-content flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSnapshot.id}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentSnapshot.screenshotUrl ? (
              <div 
                className="preview-image-container relative max-w-full max-h-full overflow-auto"
                style={{ transform: `scale(${zoom})` }}
              >
                {/* Loading state */}
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
                  </div>
                )}

                {/* Error state */}
                {hasError && !isLoading && (
                  <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500">Failed to load image</p>
                      {currentSnapshot.waybackUrl && (
                        <a
                          href={currentSnapshot.waybackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-primary-600 hover:text-primary-700 text-sm"
                        >
                          View on Wayback Machine
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Main image */}
                <img
                  src={currentSnapshot.screenshotUrl}
                  alt={`${currentSnapshot.company?.name} website on ${snapshotDate}`}
                  className="max-w-full h-auto shadow-lg rounded-lg"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ display: hasError ? 'none' : 'block' }}
                />

                {/* Major change indicator */}
                {currentSnapshot.isMajorChange && (
                  <motion.div
                    className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Major Change
                  </motion.div>
                )}
              </div>
            ) : (
              // Placeholder when no screenshot
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No screenshot available
                </h3>
                <p className="text-gray-500 mb-4">
                  This snapshot doesn't have a screenshot yet.
                </p>
                {currentSnapshot.waybackUrl && (
                  <a
                    href={currentSnapshot.waybackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-primary-300 rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View on Wayback Machine
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Transition effect overlay */}
        <TransitionEffect />
      </div>
    </div>
  );
};