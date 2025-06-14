import React, { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Snapshot } from '../../types';

interface TimelineScrubberProps {
  snapshots: Snapshot[];
  currentIndex: number;
  onChange: (index: number) => void;
  className?: string;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  snapshots,
  currentIndex,
  onChange,
  className = '',
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartIndex, setDragStartIndex] = useState(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newIndex = Math.round(percentage * (snapshots.length - 1));
    
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartIndex(currentIndex);
    onChange(Math.max(0, Math.min(newIndex, snapshots.length - 1)));
    
    e.preventDefault();
  }, [snapshots.length, currentIndex, onChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newIndex = Math.round(percentage * (snapshots.length - 1));
    
    onChange(Math.max(0, Math.min(newIndex, snapshots.length - 1)));
  }, [isDragging, snapshots.length, onChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Preload adjacent images
  useEffect(() => {
    const preloadIndexes = [
      currentIndex - 2, currentIndex - 1,
      currentIndex + 1, currentIndex + 2
    ].filter(i => i >= 0 && i < snapshots.length);
    
    preloadIndexes.forEach(i => {
      if (snapshots[i]?.screenshotUrl) {
        const img = new Image();
        img.src = snapshots[i].screenshotUrl!;
      }
    });
  }, [currentIndex, snapshots]);

  if (snapshots.length === 0) {
    return <div className="timeline-scrubber opacity-50" />;
  }

  const thumbPosition = snapshots.length > 1 
    ? (currentIndex / (snapshots.length - 1)) * 100 
    : 0;

  const currentSnapshot = snapshots[currentIndex];
  const snapshotDate = currentSnapshot 
    ? new Date(currentSnapshot.snapshotDate).getFullYear()
    : '';

  return (
    <div className={`timeline-container ${className}`}>
      {/* Date labels */}
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        <span>
          {snapshots[0] && new Date(snapshots[0].snapshotDate).getFullYear()}
        </span>
        <span className="font-medium text-gray-700">
          {snapshotDate}
        </span>
        <span>
          {snapshots[snapshots.length - 1] && 
           new Date(snapshots[snapshots.length - 1].snapshotDate).getFullYear()}
        </span>
      </div>
      
      {/* Timeline track */}
      <div
        ref={timelineRef}
        className="timeline-scrubber"
        onMouseDown={handleMouseDown}
      >
        {/* Progress fill */}
        <div 
          className="absolute top-0 left-0 h-full bg-primary-500 rounded-full transition-all duration-100"
          style={{ width: `${thumbPosition}%` }}
        />
        
        {/* Major change markers */}
        {snapshots.map((snapshot, index) => {
          if (!snapshot.isMajorChange) return null;
          
          const position = snapshots.length > 1 
            ? (index / (snapshots.length - 1)) * 100 
            : 0;
            
          return (
            <div
              key={snapshot.id}
              className="absolute top-0 w-0.5 h-full bg-orange-400"
              style={{ left: `${position}%` }}
              title={`Major change: ${new Date(snapshot.snapshotDate).toLocaleDateString()}`}
            />
          );
        })}
        
        {/* Thumb */}
        <motion.div
          className={`timeline-thumb ${isDragging ? 'cursor-grabbing' : ''}`}
          style={{ left: `${thumbPosition}%` }}
          animate={{ 
            scale: isDragging ? 1.2 : 1,
            boxShadow: isDragging 
              ? '0 4px 20px rgba(59, 130, 246, 0.4)' 
              : '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      {/* Snapshot count */}
      <div className="text-center text-xs text-gray-500 mt-2">
        {currentIndex + 1} of {snapshots.length} snapshots
      </div>
    </div>
  );
};