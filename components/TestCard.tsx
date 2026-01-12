import React from 'react';
import { Test } from '../types';
import { motion } from 'framer-motion';
import { Users, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getScribbleByEmoji, ScribbleTape } from './Scribbles';

interface TestCardProps {
  test: Test;
}

export const TestCard: React.FC<TestCardProps> = ({ test }) => {
  const ScribbleIcon = getScribbleByEmoji(test.emoji);
  
  // Random rotation for natural feel
  const randomRotation = Math.random() * 2 - 1; 

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 1 }}
      className="h-full"
    >
      <div className="bg-paper p-6 h-full flex flex-col relative border-2 border-dark shadow-sketch hover:shadow-sketch-hover transition-all duration-200"
           style={{ transform: `rotate(${randomRotation}deg)` }}>
        
        {/* Tape Effect */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 text-gray-200/80 transform -rotate-1 z-10">
           <ScribbleTape className="w-full h-full" opacity={0.6} />
        </div>

        <div className="flex justify-between items-start mb-6 mt-2">
          <div className="w-20 h-20 flex items-center justify-center">
            <ScribbleIcon className="w-full h-full text-dark" />
          </div>
          {test.badge && (
            <span className={`font-hand font-bold text-lg px-3 py-1 border-2 border-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -rotate-3 transform
              ${test.badge === 'HOT' ? 'bg-red-400 text-white' : 
                test.badge === 'NEW' ? 'bg-secondary text-dark' : 'bg-primary text-white'}`}>
              {test.badge}!
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-black text-dark mb-3 leading-tight tracking-tight">
          {test.title}
        </h3>
        
        <div className="flex-grow">
          <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium mb-6">
            {test.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest border-t-2 border-dashed border-gray-300 pt-4">
            <div className="flex items-center gap-1.5">
              <HelpCircle size={16} />
              <span>{test.questionCount} Qs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={16} />
              <span>{test.participantCount.toLocaleString()}</span>
            </div>
          </div>

          <Link 
            to={`/test/${test.id}`}
            className="w-full bg-dark text-white py-3 px-4 font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary transition-colors border-2 border-transparent hover:border-dark hover:shadow-[4px_4px_0px_0px_#fff] group relative overflow-hidden"
          >
             <span className="font-hand text-xl relative z-10">Start Test</span>
             <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};