import React from 'react';
import { TESTS } from '../constants';
import { TestCard } from '../components/TestCard';
import { motion } from 'framer-motion';
import { ScribbleStar, ScribbleUnderline } from '../components/Scribbles';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 px-4">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Decorative Scribbles in Background */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-10 opacity-10 md:opacity-100 rotate-12">
            <ScribbleStar className="w-32 h-32 text-secondary" />
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-10 opacity-10 md:opacity-100 -rotate-12">
            <ScribbleStar className="w-48 h-48 text-accent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 mt-10 relative z-10"
        >
          <div className="inline-block relative">
            <h1 className="text-5xl md:text-7xl font-black text-dark mb-2 tracking-tighter relative z-10">
              如果灵魂有形状
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-6 bg-secondary/80 -skew-x-12 -z-0"></div>
          </div>
          
          <div className="mt-4 flex flex-col items-center">
             <span className="font-hand text-3xl md:text-5xl text-primary font-bold transform -rotate-2">
               它一定是一只猫
               <ScribbleUnderline className="w-48 text-dark mx-auto mt-2" />
             </span>
          </div>

          <p className="text-dark/70 font-medium max-w-lg mx-auto text-lg md:text-xl mt-8 leading-relaxed bg-white/80 p-4 border-2 border-dark border-dashed rotate-1 shadow-sketch-sm">
            在 Dia Rhea 负卸空间，我们用最<span className="font-bold text-accent">抽象</span>的方式，解析你最真实的内心。
            <br/>
            <span className="font-hand text-gray-500 text-base mt-2 block"> ( 卸下伪装，直面自我 ) </span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-2">
          {TESTS.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, type: "spring" }}
              className={index % 2 === 0 ? "md:translate-y-8" : ""}
            >
              <TestCard test={test} />
            </motion.div>
          ))}
        </div>
        
        <footer className="mt-32 text-center py-10 border-t-2 border-dark border-dashed relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F3F4F6] px-4">
             <ScribbleStar className="w-8 h-8 text-dark" />
          </div>
          <p className="font-hand font-bold text-xl text-dark">© 2026 Dia Rhea</p>
          <p className="text-sm font-bold mt-2 opacity-50">献给抽象的灵魂。</p>
        </footer>
      </div>
    </div>
  );
};