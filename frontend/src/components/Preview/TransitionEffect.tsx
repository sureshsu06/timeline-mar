import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimelineStore } from '../../store/timelineStore';

export const TransitionEffect: React.FC = () => {
  const { currentIndex } = useTimelineStore();
  const [showEffect, setShowEffect] = useState(false);
  const [previousIndex, setPreviousIndex] = useState(currentIndex);

  useEffect(() => {
    if (currentIndex !== previousIndex) {
      setShowEffect(true);
      setPreviousIndex(currentIndex);
      
      const timer = setTimeout(() => {
        setShowEffect(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, previousIndex]);

  return (
    <AnimatePresence>
      {showEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-primary-500 opacity-10"
            initial={{ scale: 0, borderRadius: '50%' }}
            animate={{ scale: 2, borderRadius: '0%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          
          {/* Flash effect */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};