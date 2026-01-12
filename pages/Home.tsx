import React from 'react';
import { TESTS } from '../constants';
import { TestCard } from '../components/TestCard';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen pt-6 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 mt-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4 tracking-tight">
            如果灵魂有形状<br />
            <span className="text-primary">它一定是一只猫</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">
            在 Dia Rhea 负卸空间，我们用最抽象的方式，解析你最真实的内心。卸下伪装，直面自我。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTS.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TestCard test={test} />
            </motion.div>
          ))}
        </div>
        
        <footer className="mt-20 text-center text-gray-400 text-sm py-10 border-t border-gray-100">
          <p>© {new Date().getFullYear()} Dia Rhea Unloading Space. All rights reserved.</p>
          <p className="mt-2 text-xs">Designed for abstract souls.</p>
        </footer>
      </div>
    </div>
  );
};