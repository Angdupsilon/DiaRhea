import React from 'react';
import { Test } from '../types';
import { motion } from 'framer-motion';
import { Users, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TestCardProps {
  test: Test;
}

export const TestCard: React.FC<TestCardProps> = ({ test }) => {
  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'HOT': return 'bg-red-500 text-white';
      case 'NEW': return 'bg-green-500 text-white';
      case 'LIMITED': return 'bg-purple-500 text-white';
      default: return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 relative overflow-hidden flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-4xl bg-gray-50 p-3 rounded-2xl">{test.emoji}</div>
        {test.badge && (
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getBadgeColor(test.badge)}`}>
            {test.badge}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-dark mb-2 line-clamp-1">{test.title}</h3>
      <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-grow">{test.description}</p>

      <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
        <div className="flex items-center gap-1">
          <HelpCircle size={14} />
          <span>{test.questionCount} 题</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{test.participantCount.toLocaleString()} 人已测</span>
        </div>
      </div>

      <Link 
        to={`/test/${test.id}`}
        className="w-full mt-auto bg-primary/10 hover:bg-primary text-primary hover:text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <span>开始测试</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};