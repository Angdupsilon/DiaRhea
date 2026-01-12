import React, { useEffect, useState } from 'react';
import { getHistory, deleteFromHistory, clearHistory } from '../services/storage';
import { HistoryEntry } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Calendar, ArrowRight, Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    if (window.confirm('确定要清空所有测试记录吗？此操作无法撤销。')) {
      clearHistory();
      setHistory([]);
    }
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('zh-CN', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-8 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-dark">我的测试历史</h1>
          {history.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="text-sm text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
            >
              <Trash2 size={16} />
              清空
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <Ghost size={64} className="mx-auto text-gray-200 mb-6" />
            <h2 className="text-xl font-medium text-gray-800 mb-2">空空如也</h2>
            <p className="text-gray-500 mb-8">你还没有保存任何人格碎片</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl hover:bg-purple-600 transition-colors shadow-lg shadow-primary/20"
            >
              去测试
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {history.map((entry) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 relative group"
                >
                  <button 
                    onClick={() => handleDelete(entry.id)}
                    className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl bg-gray-50 p-2 rounded-xl">{entry.resultData.emoji}</div>
                    <div>
                      <h3 className="text-lg font-bold text-dark">{entry.resultData.name}</h3>
                      <p className="text-xs text-gray-400">{entry.testTitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-6 h-10">
                    {entry.resultData.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} />
                      <span>{formatDate(entry.timestamp)}</span>
                    </div>
                    
                    <Link 
                      to={`/results/${entry.testId}/${entry.resultId}`}
                      className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
                    >
                      查看详情
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};