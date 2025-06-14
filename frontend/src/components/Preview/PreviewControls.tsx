import React from 'react';
import { motion } from 'framer-motion';

interface PreviewControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  isFullscreen,
  onToggleFullscreen,
}) => {
  return (
    <div className="preview-controls flex items-center space-x-2">
      {/* Zoom controls */}
      <div className="zoom-controls flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={onZoomOut}
          disabled={zoom <= 0.25}
          className="preview-control-btn"
          title="Zoom out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <button
          onClick={onResetZoom}
          className="preview-control-btn min-w-[3rem]"
          title="Reset zoom"
        >
          <span className="text-xs font-medium">
            {Math.round(zoom * 100)}%
          </span>
        </button>
        
        <button
          onClick={onZoomIn}
          disabled={zoom >= 3}
          className="preview-control-btn"
          title="Zoom in"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Fullscreen toggle */}
      <motion.button
        onClick={onToggleFullscreen}
        className="preview-control-btn bg-gray-100 hover:bg-gray-200"
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isFullscreen ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};