import React from 'react';
import { Question, Option } from '../types';
import { motion } from 'framer-motion';
import { ScribbleUnderline } from './Scribbles';

interface QuestionCardProps {
  question: Question;
  onSelect: (option: Option) => void;
  selectedOptionId?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect, selectedOptionId }) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, y: -20, rotate: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-paper border-2 border-dark shadow-sketch p-6 md:p-10 relative">
        {/* Notebook Holes */}
        <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-between py-6 pointer-events-none opacity-20">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="w-4 h-4 rounded-full bg-dark mb-4" />
             ))}
        </div>
        
        {/* Vertical Margin Line */}
        <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-red-300/50" />

        <div className="pl-12 md:pl-16 relative">
          <div className="mb-10 relative">
            {/* Positioned Q. mark */}
            <span className="font-hand text-gray-400 text-3xl font-bold absolute -left-12 -top-1 transform -rotate-12 select-none">Q.</span>
            
            {/* Font Updated here to font-hand */}
            <h2 className="text-2xl md:text-3xl font-hand font-bold text-dark leading-relaxed">
              {question.text}
            </h2>
            <ScribbleUnderline className="w-32 text-secondary mt-2" />
          </div>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => onSelect(option)}
                  className={`w-full text-left p-4 md:p-5 border-2 transition-all duration-200 flex items-center justify-between group relative
                    ${isSelected 
                      ? 'border-dark bg-secondary shadow-sketch-sm' 
                      : 'border-gray-300 bg-white hover:border-dark hover:shadow-sketch-sm'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-hand font-bold text-xl w-8 h-8 flex items-center justify-center border-2 rounded-full flex-shrink-0
                       ${isSelected ? 'border-dark bg-white' : 'border-gray-300 text-gray-400 group-hover:border-dark group-hover:text-dark'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    {/* Font Updated here to font-hand */}
                    <span className="text-lg font-hand font-bold text-dark tracking-wide">
                      {option.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};