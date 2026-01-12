import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full sticky top-20 z-40 py-6 pointer-events-none">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex justify-between items-end mb-2">
          <span className="font-bold text-xl text-dark transform -rotate-2">
            进度
          </span>
          <span className="font-mono text-xs font-bold bg-dark text-white px-2 py-1 transform rotate-2">
            {current} / {total}
          </span>
        </div>
        
        {/* Sketchy Background Line */}
        <div className="h-4 w-full border-2 border-dark bg-white p-0.5 transform -skew-x-2 shadow-sm">
          {/* Marker Fill */}
          <motion.div 
            className="h-full bg-secondary border-r-2 border-dark"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ 
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 10px)' 
            }}
          />
        </div>
      </div>
    </div>
  );
};