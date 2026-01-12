import React from 'react';
import { Result } from '../types';
import { motion } from 'framer-motion';
import { Save, Check, Sparkles, ArrowRight } from 'lucide-react';
import { getScribbleByEmoji, ScribbleTape } from './Scribbles';

interface ResultCardProps {
  result: Result;
  score: number;
  maxPossibleScore: number;
  onSave: () => void;
  isSaved: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, score, maxPossibleScore, onSave, isSaved }) => {
  const matchPercentage = Math.round((score / maxPossibleScore) * 100);
  const ScribbleIcon = getScribbleByEmoji(result.emoji);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      className="bg-paper rounded-none border-2 border-dark shadow-sketch max-w-2xl mx-auto relative overflow-hidden"
    >
      {/* Texture noise */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="p-8 md:p-12 relative z-10">
        
        {/* Header Badge style */}
        <div className="flex flex-col items-center mb-10 border-b-2 border-dashed border-dark pb-8">
            <div className="w-32 h-32 relative mb-6">
                <div className="absolute inset-0 bg-secondary rounded-full animate-pulse opacity-20"></div>
                <ScribbleIcon className="w-full h-full text-dark relative z-10" />
                <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -right-4 -bottom-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center border-2 border-dark shadow-sketch-sm transform rotate-12"
                >
                    <span className="font-hand font-bold text-white text-lg">{matchPercentage}%</span>
                </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-dark mb-3 text-center tracking-tighter">{result.name}</h1>
            
            <div className="inline-block bg-primary text-white px-4 py-1 transform -rotate-1 shadow-sm">
                <span className="font-mono text-sm font-bold uppercase tracking-widest">Type Class</span>
            </div>
            
            <p className="mt-8 text-xl font-hand text-center text-dark/80 leading-relaxed max-w-lg">
                "{result.description}"
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Insights */}
            <div className="bg-white border-2 border-dark p-6 shadow-sketch-sm transform -rotate-1">
                <h3 className="font-bold text-2xl mb-4 text-primary flex items-center gap-2">
                    特征
                    <div className="h-0.5 bg-primary flex-grow"></div>
                </h3>
                <ul className="space-y-3">
                    {result.insights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary font-bold text-lg">•</span>
                        <span className="font-bold text-dark/80">{insight}</span>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-white border-2 border-dark p-6 shadow-sketch-sm transform rotate-1">
                <h3 className="font-bold text-2xl mb-4 text-secondary flex items-center gap-2">
                    建议
                    <div className="h-0.5 bg-secondary flex-grow"></div>
                </h3>
                <div className="space-y-3">
                    {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                         <ArrowRight size={16} className="text-dark shrink-0" />
                        <span className="text-sm font-bold text-gray-600">{rec}</span>
                    </div>
                    ))}
                </div>
            </div>
        </div>

        <button
            onClick={onSave}
            disabled={isSaved}
            className={`w-full py-4 font-black text-xl flex items-center justify-center gap-3 border-2 border-dark transition-all transform hover:-translate-y-1 hover:shadow-sketch
              ${isSaved 
                ? 'bg-green-400 text-white cursor-default' 
                : 'bg-dark text-white hover:bg-white hover:text-dark'
              }`}
          >
            {isSaved ? (
              <>
                <Check size={24} strokeWidth={3} />
                <span className="font-bold">已保存!</span>
              </>
            ) : (
              <>
                <Save size={24} strokeWidth={3} />
                <span className="font-bold">保存结果</span>
              </>
            )}
          </button>
      </div>
    </motion.div>
  );
};