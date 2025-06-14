import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimelineStore } from '../../store/timelineStore';
import { companyApi, timelineApi } from '../../services/api';
import { Company } from '../../types';

interface CompanySelectorProps {
  className?: string;
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({
  className = '',
}) => {
  const {
    companies,
    selectedCompany,
    setCompanies,
    setSelectedCompany,
    setTimelineData,
    setLoading,
    setError,
  } = useTimelineStore();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const companiesData = await companyApi.getAll();
        setCompanies(companiesData);
      } catch (error) {
        console.error('Failed to load companies:', error);
        setError('Failed to load companies');
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  const handleCompanySelect = async (company: Company) => {
    try {
      setLoading(true);
      setSelectedCompany(company);
      setIsOpen(false);
      
      // Load timeline data for selected company
      const timelineData = await timelineApi.getTimeline(company.id);
      setTimelineData(timelineData);
    } catch (error) {
      console.error('Failed to load timeline data:', error);
      setError('Failed to load timeline data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`company-selector relative ${className}`}>
      {/* Selector button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center justify-between px-4 py-3
          bg-white border border-gray-300 rounded-lg shadow-sm
          hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          transition-colors duration-200
        "
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            {selectedCompany ? (
              <span className="text-sm font-bold text-primary-600">
                {selectedCompany.name.charAt(0)}
              </span>
            ) : (
              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0H7m14 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2z" />
              </svg>
            )}
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">
              {selectedCompany ? selectedCompany.name : 'Select a company'}
            </div>
            {selectedCompany && (
              <div className="text-xs text-gray-500">
                {selectedCompany.domain}
              </div>
            )}
          </div>
        </div>
        
        <motion.svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              className="
                absolute top-full left-0 right-0 mt-1 z-20
                bg-white border border-gray-200 rounded-lg shadow-lg
                max-h-64 overflow-y-auto
              "
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {companies.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No companies available
                </div>
              ) : (
                <div className="py-1">
                  {companies.map((company) => (
                    <button
                      key={company.id}
                      onClick={() => handleCompanySelect(company)}
                      className="
                        w-full flex items-center space-x-3 px-4 py-3
                        hover:bg-gray-50 transition-colors duration-150
                        text-left
                      "
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-600">
                          {company.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {company.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {company.domain}
                        </div>
                        {company._count && (
                          <div className="text-xs text-gray-400">
                            {company._count.snapshots} snapshots · {company._count.milestones} milestones
                          </div>
                        )}
                      </div>
                      {company.industry && (
                        <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          {company.industry}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};