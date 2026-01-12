import React from 'react';
import { Question, Option } from '../types';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  onSelect: (option: Option) => void;
  selectedOptionId?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect, selectedOptionId }) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full -mr-10 -mt-10 blur-2xl" />
        
        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-10 leading-relaxed relative z-10">
          {question.text}
        </h2>

        <div className="space-y-4 relative z-10">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                ${selectedOptionId === option.id 
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                  : 'border-transparent bg-gray-50 hover:bg-white hover:border-primary/30 hover:shadow-md'
                }`}
            >
              <span className={`text-base md:text-lg font-medium ${selectedOptionId === option.id ? 'text-primary' : 'text-gray-700 group-hover:text-dark'}`}>
                {option.text}
              </span>
              {selectedOptionId === option.id && (
                <motion.div layoutId="check" className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};