import React from 'react';
import { motion } from 'framer-motion';
import { Company, Snapshot, Milestone } from '../../types';

interface CompanyStatsProps {
  company: Company;
  snapshot?: Snapshot | null;
  milestone?: Milestone | null;
}

export const CompanyStats: React.FC<CompanyStatsProps> = ({
  company,
  snapshot,
  milestone,
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return `$${formatNumber(num)}`;
  };

  const getCompanyAge = () => {
    if (!company.foundedDate) return null;
    
    const founded = new Date(company.foundedDate);
    const current = snapshot ? new Date(snapshot.snapshotDate) : new Date();
    const years = current.getFullYear() - founded.getFullYear();
    
    return years;
  };

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

  return (
    <motion.div
      className="company-stats p-6 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Company Overview */}
      <motion.div variants={itemVariants} className="company-overview">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Company Overview</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Name</span>
            <span className="font-medium text-gray-900">{company.name}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Domain</span>
            <a
              href={`https://${company.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              {company.domain}
            </a>
          </div>
          
          {company.industry && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Industry</span>
              <span className="font-medium text-gray-900">{company.industry}</span>
            </div>
          )}
          
          {company.foundedDate && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Founded</span>
              <span className="font-medium text-gray-900">
                {new Date(company.foundedDate).getFullYear()}
              </span>
            </div>
          )}
          
          {getCompanyAge() && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Age at this time</span>
              <span className="font-medium text-gray-900">
                {getCompanyAge()} years
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Milestone Metrics */}
      {milestone?.metrics && (
        <motion.div variants={itemVariants} className="milestone-metrics">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Current Metrics
            <span className="text-sm font-normal text-gray-500 ml-2">
              (as of {new Date(milestone.milestoneDate).toLocaleDateString()})
            </span>
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(milestone.metrics).map(([key, value]) => {
              let displayValue = value;
              let label = key;

              // Format common metrics
              if (key === 'employees') {
                label = 'Employees';
                displayValue = formatNumber(value as number);
              } else if (key === 'revenue') {
                label = 'Revenue';
                displayValue = formatCurrency(value as number);
              } else if (key === 'users') {
                label = 'Users';
                displayValue = formatNumber(value as number);
              } else if (key === 'marketCap') {
                label = 'Market Cap';
                displayValue = formatCurrency(value as number);
              } else if (key === 'funding') {
                label = 'Total Funding';
                displayValue = formatCurrency(value as number);
              } else {
                // Capitalize first letter
                label = key.charAt(0).toUpperCase() + key.slice(1);
              }

              return (
                <div
                  key={key}
                  className="metric-card bg-gray-50 rounded-lg p-4"
                >
                  <div className="text-sm text-gray-600 mb-1">{label}</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {displayValue}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Recent Milestone */}
      {milestone && (
        <motion.div variants={itemVariants} className="recent-milestone">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Milestone</h3>
          <div className="milestone-card bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-primary-900">{milestone.title}</h4>
              <span className="text-xs text-primary-600 bg-primary-100 px-2 py-1 rounded">
                {milestone.type}
              </span>
            </div>
            <p className="text-sm text-primary-800 mb-2">{milestone.description}</p>
            <div className="text-xs text-primary-600">
              {new Date(milestone.milestoneDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Snapshot Info */}
      {snapshot && (
        <motion.div variants={itemVariants} className="snapshot-info">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Snapshot Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date captured</span>
              <span className="font-medium text-gray-900">
                {new Date(snapshot.snapshotDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Major change</span>
              <span className={`font-medium ${
                snapshot.isMajorChange ? 'text-orange-600' : 'text-gray-500'
              }`}>
                {snapshot.isMajorChange ? 'Yes' : 'No'}
              </span>
            </div>
            
            {snapshot.sources && snapshot.sources.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sources</span>
                <span className="font-medium text-gray-900">
                  {snapshot.sources.length}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Archive counts */}
      {company._count && (
        <motion.div variants={itemVariants} className="archive-stats">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Archive Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card text-center">
              <div className="text-2xl font-bold text-primary-600">
                {company._count.snapshots}
              </div>
              <div className="text-sm text-gray-600">Snapshots</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-2xl font-bold text-green-600">
                {company._count.milestones}
              </div>
              <div className="text-sm text-gray-600">Milestones</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};