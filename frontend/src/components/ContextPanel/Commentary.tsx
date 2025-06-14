import React from 'react';
import { motion } from 'framer-motion';
import { Commentary as CommentaryType, Snapshot } from '../../types';

interface CommentaryProps {
  commentary?: CommentaryType | null;
  snapshot?: Snapshot | null;
}

export const Commentary: React.FC<CommentaryProps> = ({
  commentary,
  snapshot,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!commentary) {
    return (
      <div className="commentary-empty p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No commentary available</h3>
          <p className="text-gray-500">
            No editorial commentary has been added for this snapshot yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="commentary p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Commentary */}
      {commentary.commentaryText && (
        <motion.div variants={itemVariants} className="main-commentary">
          <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Editorial Commentary
          </h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {commentary.commentaryText}
            </p>
          </div>
        </motion.div>
      )}

      {/* Design Notes */}
      {commentary.designNotes && (
        <motion.div variants={itemVariants} className="design-notes">
          <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            Design Analysis
          </h3>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {commentary.designNotes}
            </p>
          </div>
        </motion.div>
      )}

      {/* Business Context */}
      {commentary.businessContext && (
        <motion.div variants={itemVariants} className="business-context">
          <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Business Context
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {commentary.businessContext}
            </p>
          </div>
        </motion.div>
      )}

      {/* Tags */}
      {commentary.tags && (() => {
        try {
          return JSON.parse(commentary.tags).length > 0;
        } catch {
          return false;
        }
      })() && (
        <motion.div variants={itemVariants} className="commentary-tags">
          <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {(() => {
              try {
                return JSON.parse(commentary.tags);
              } catch {
                return [];
              }
            })().map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Meta Information */}
      <motion.div variants={itemVariants} className="commentary-meta">
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>
              Added: {new Date(commentary.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            {commentary.updatedAt !== commentary.createdAt && (
              <span>
                Updated: {new Date(commentary.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Snapshot Context */}
      {snapshot && (
        <motion.div variants={itemVariants} className="snapshot-context">
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">About this snapshot</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>
                Captured on {new Date(snapshot.snapshotDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {snapshot.isMajorChange && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Marked as a major design change
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};