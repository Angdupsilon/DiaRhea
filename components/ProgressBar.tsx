import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full sticky top-16 z-40 bg-[#FAFAFA]/95 backdrop-blur-sm py-4 mb-4">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
          <span>进度</span>
          <span>{current} / {total}</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};