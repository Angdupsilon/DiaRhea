import React, { useEffect, useState } from 'react';
import { getHistory, deleteFromHistory, clearHistory } from '../services/storage';
import { HistoryEntry } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, ArrowRight, Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getScribbleByEmoji, ScribbleTape } from '../components/Scribbles';

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteFromHistory(id);
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all memories? Cannot be undone.')) {
      clearHistory();
      setHistory([]);
    }
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('zh-CN', {
      month: 'numeric',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pt-8 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-dark tracking-tight">My Collection</h1>
          {history.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="font-hand font-bold text-gray-500 hover:text-red-500 flex items-center gap-2 transition-colors border-b-2 border-transparent hover:border-red-500"
            >
              <Trash2 size={18} />
              Clear All
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 border-2 border-dashed border-dark/20 rounded-xl"
          >
            <Ghost size={64} className="mx-auto text-dark/20 mb-6" />
            <h2 className="text-2xl font-black text-dark/40 mb-2">Ghost Town</h2>
            <p className="font-hand text-xl text-dark/40 mb-8">No personality fragments found.</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 shadow-sketch-sm hover:shadow-sketch hover:-translate-y-1 transition-all border-2 border-dark"
            >
              Take a Test
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {history.map((entry, index) => {
                const ScribbleIcon = getScribbleByEmoji(entry.resultData.emoji);
                const rotation = index % 2 === 0 ? -1 : 1;
                
                return (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white p-6 shadow-sketch hover:shadow-sketch-hover transition-all border-2 border-dark relative group"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 text-gray-200/50 transform rotate-2 z-10">
                       <ScribbleTape className="w-full h-full" opacity={0.8} />
                    </div>

                    <button 
                      onClick={() => handleDelete(entry.id)}
                      className="absolute top-2 right-2 p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="flex items-start gap-4 mb-4 mt-2">
                      <div className="w-16 h-16 shrink-0">
                         <ScribbleIcon className="w-full h-full text-dark" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-dark leading-none mb-1">{entry.resultData.name}</h3>
                        <p className="font-hand font-bold text-gray-400 text-sm">{entry.testTitle}</p>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-600 line-clamp-2 mb-6 h-10 border-l-2 border-secondary pl-3">
                      {entry.resultData.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-dashed border-gray-100">
                      <div className="flex items-center gap-1 font-mono text-xs text-gray-400">
                        <Calendar size={12} />
                        <span>{formatDate(entry.timestamp)}</span>
                      </div>
                      
                      <Link 
                        to={`/results/${entry.testId}/${entry.resultId}`}
                        className="text-dark font-bold text-sm hover:text-primary flex items-center gap-1 group/link"
                      >
                        <span className="group-hover/link:underline decoration-wavy">View</span>
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};