import React from 'react';
import { motion } from 'framer-motion';
import { DesignAnalysis as DesignAnalysisType, Snapshot } from '../../types';

interface DesignAnalysisProps {
  analysis?: DesignAnalysisType | null;
  snapshot?: Snapshot | null;
}

export const DesignAnalysis: React.FC<DesignAnalysisProps> = ({
  analysis,
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

  const ColorSwatch: React.FC<{ color: string }> = ({ color }) => (
    <div className="flex items-center space-x-2">
      <div
        className="w-6 h-6 rounded border border-gray-300 shadow-sm"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm font-mono text-gray-700">{color}</span>
    </div>
  );

  if (!analysis) {
    return (
      <div className="design-analysis-empty p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No design analysis available</h3>
          <p className="text-gray-500">
            No automated design analysis has been performed for this snapshot yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="design-analysis p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Color Palette */}
      {analysis.primaryColors && (() => {
        try {
          return JSON.parse(analysis.primaryColors).length > 0;
        } catch {
          return false;
        }
      })() && (
        <motion.div variants={itemVariants} className="color-palette">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            Color Palette
          </h3>
          <div className="space-y-3">
            {(() => {
              try {
                return JSON.parse(analysis.primaryColors);
              } catch {
                return [];
              }
            })().map((color: string, index: number) => (
              <ColorSwatch key={index} color={color} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Typography */}
      {analysis.fonts && (() => {
        try {
          return JSON.parse(analysis.fonts).length > 0;
        } catch {
          return false;
        }
      })() && (
        <motion.div variants={itemVariants} className="typography">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Typography
          </h3>
          <div className="space-y-2">
            {(() => {
              try {
                return JSON.parse(analysis.fonts);
              } catch {
                return [];
              }
            })().map((font: string, index: number) => (
              <div
                key={index}
                className="font-preview p-3 bg-gray-50 rounded-lg border"
              >
                <div className="text-sm text-gray-600 mb-1">Font {index + 1}</div>
                <div 
                  className="text-lg font-medium text-gray-900"
                  style={{ fontFamily: font }}
                >
                  {font}
                </div>
                <div className="text-xs text-gray-500 mt-1 font-mono">
                  font-family: "{font}"
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Layout & Structure */}
      <motion.div variants={itemVariants} className="layout-structure">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          Layout & Structure
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {analysis.layoutType && (
            <div className="analysis-item bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm text-green-700 font-medium mb-1">Layout Type</div>
              <div className="text-green-900 capitalize">{analysis.layoutType}</div>
            </div>
          )}
          
          {typeof analysis.hasMobileVersion === 'boolean' && (
            <div className="analysis-item bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm text-blue-700 font-medium mb-1">Mobile Version</div>
              <div className="flex items-center">
                <span className="text-blue-900">
                  {analysis.hasMobileVersion ? 'Available' : 'Not Available'}
                </span>
                {analysis.hasMobileVersion ? (
                  <svg className="w-4 h-4 ml-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 ml-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Performance Metrics */}
      {analysis.pageWeightKb && (
        <motion.div variants={itemVariants} className="performance-metrics">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Performance
          </h3>
          <div className="performance-item bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-orange-700 font-medium">Page Weight</div>
                <div className="text-2xl font-bold text-orange-900">
                  {analysis.pageWeightKb} KB
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-orange-600">
                  {analysis.pageWeightKb < 100 ? 'Excellent' :
                   analysis.pageWeightKb < 500 ? 'Good' :
                   analysis.pageWeightKb < 1000 ? 'Average' : 'Heavy'}
                </div>
                <div className="w-20 h-2 bg-orange-200 rounded-full overflow-hidden mt-1">
                  <div 
                    className={`h-full ${
                      analysis.pageWeightKb < 100 ? 'bg-green-500' :
                      analysis.pageWeightKb < 500 ? 'bg-yellow-500' :
                      analysis.pageWeightKb < 1000 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ 
                      width: `${Math.min(100, (analysis.pageWeightKb / 1000) * 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Analysis Meta */}
      <motion.div variants={itemVariants} className="analysis-meta">
        <div className="border-t border-gray-200 pt-4">
          <div className="text-xs text-gray-500">
            Analysis generated on {new Date(analysis.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </motion.div>

      {/* Era Context */}
      {snapshot && (
        <motion.div variants={itemVariants} className="era-context">
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Design Era Context</h4>
            <div className="text-sm text-gray-600">
              {(() => {
                const year = new Date(snapshot.snapshotDate).getFullYear();
                if (year < 2000) {
                  return "Pre-web standards era: Table-based layouts, limited CSS support";
                } else if (year < 2005) {
                  return "Early CSS adoption: Transition from tables to CSS layouts";
                } else if (year < 2010) {
                  return "Web 2.0 era: AJAX, rounded corners, gradients, and social features";
                } else if (year < 2015) {
                  return "Responsive design era: Mobile-first, Bootstrap, flat design";
                } else if (year < 2020) {
                  return "Modern web era: Material design, component libraries, SPAs";
                } else {
                  return "Contemporary era: Advanced CSS, micro-interactions, accessibility focus";
                }
              })()}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};