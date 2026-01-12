import React, { useState } from 'react';
import { Result } from '../types';
import { motion } from 'framer-motion';
import { Save, Check, Sparkles, ArrowRight } from 'lucide-react';

interface ResultCardProps {
  result: Result;
  score: number;
  maxPossibleScore: number;
  onSave: () => void;
  isSaved: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, score, maxPossibleScore, onSave, isSaved }) => {
  const matchPercentage = Math.round((score / maxPossibleScore) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl mx-auto border border-gray-100"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-b from-primary/10 to-white p-10 text-center relative">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-8xl mb-6 inline-block filter drop-shadow-xl"
        >
          {result.emoji}
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">{result.name}</h1>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark/5 text-sm text-dark/60 font-medium">
          <Sparkles size={14} />
          <span>契合度 {matchPercentage}%</span>
        </div>
        <p className="mt-6 text-gray-600 leading-relaxed text-lg">
          {result.description}
        </p>
      </div>

      <div className="p-8 md:p-10 space-y-8">
        {/* Insights Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            你的特征
          </h3>
          <ul className="space-y-3">
            {result.insights.map((insight, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                className="flex items-start gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{insight}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Recommendations Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-purple-500 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-4 bg-purple-500 rounded-full" />
            给你的建议
          </h3>
          <div className="grid gap-3">
            {result.recommendations.map((rec, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (idx * 0.1) }}
                className="flex items-center gap-3 text-gray-600 border border-dashed border-gray-200 p-4 rounded-xl hover:border-purple-300 transition-colors"
              >
                <ArrowRight size={16} className="text-purple-400 flex-shrink-0" />
                <span>{rec}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6">
          <button
            onClick={onSave}
            disabled={isSaved}
            className={`w-full py-4 rounded-xl font-medium shadow-lg transition-all flex items-center justify-center gap-2
              ${isSaved 
                ? 'bg-green-100 text-green-700 cursor-default' 
                : 'bg-dark text-white hover:bg-black hover:shadow-xl active:scale-95'
              }`}
          >
            {isSaved ? (
              <>
                <Check size={20} />
                <span>已保存到历史</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>保存测试结果</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};