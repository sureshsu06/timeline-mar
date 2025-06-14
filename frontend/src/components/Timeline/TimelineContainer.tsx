import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineScrubber } from './TimelineScrubber';
import { TimelineMarkers } from './TimelineMarkers';
import { useTimelineStore } from '../../store/timelineStore';

interface TimelineContainerProps {
  className?: string;
}

export const TimelineContainer: React.FC<TimelineContainerProps> = ({
  className = '',
}) => {
  const {
    snapshots,
    timelineData,
    currentIndex,
    isPlaying,
    playSpeed,
    setCurrentIndex,
    setIsPlaying,
    setPlaySpeed,
  } = useTimelineStore();

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, setCurrentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < snapshots.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, snapshots.length, setCurrentIndex]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || snapshots.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (prevIndex >= snapshots.length - 1) {
          setIsPlaying(false);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 2000 / playSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playSpeed, snapshots.length, setCurrentIndex, setIsPlaying]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case ' ':
          e.preventDefault();
          handlePlayPause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext, handlePlayPause]);

  if (!timelineData || snapshots.length === 0) {
    return (
      <div className={`timeline-container-empty ${className}`}>
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg">No timeline data available</div>
          <div className="text-gray-500 text-sm mt-2">
            Select a company to view its website evolution
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`timeline-container ${className}`}>
      {/* Timeline markers for milestones */}
      <TimelineMarkers 
        snapshots={snapshots}
        milestones={timelineData.milestones}
        currentIndex={currentIndex}
        className="mb-4"
      />
      
      {/* Main timeline scrubber */}
      <TimelineScrubber
        snapshots={snapshots}
        currentIndex={currentIndex}
        onChange={setCurrentIndex}
        className="mb-6"
      />
      
      {/* Transport controls */}
      <div className="timeline-controls flex items-center justify-center space-x-4">
        {/* Previous button */}
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="timeline-control-btn"
          title="Previous snapshot (←)"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Play/Pause button */}
        <button
          onClick={handlePlayPause}
          className="timeline-control-btn timeline-play-btn"
          title={isPlaying ? "Pause (Space)" : "Play (Space)"}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.svg
                key="pause"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </motion.svg>
            ) : (
              <motion.svg
                key="play"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
        
        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentIndex === snapshots.length - 1}
          className="timeline-control-btn"
          title="Next snapshot (→)"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Speed control */}
      <div className="timeline-speed-control flex items-center justify-center mt-4 space-x-2">
        <span className="text-xs text-gray-500">Speed:</span>
        {[0.5, 1, 1.5, 2].map(speed => (
          <button
            key={speed}
            onClick={() => setPlaySpeed(speed)}
            className={`text-xs px-2 py-1 rounded ${
              playSpeed === speed
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {speed}x
          </button>
        ))}
      </div>
    </div>
  );
};