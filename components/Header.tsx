import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { History, PenTool } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-paper border-b-2 border-dark transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group relative">
          <div className="absolute -left-2 -top-1 w-full h-full bg-secondary -z-10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity transform -rotate-2"></div>
          <Logo className="transform group-hover:rotate-6 transition-transform text-dark" />
          <div className="flex flex-col">
            <span className="font-hand font-bold text-2xl text-dark tracking-wide leading-none group-hover:text-primary transition-colors">
              Dia Rhea
            </span>
            <span className="font-bold text-xs bg-dark text-white px-1 mt-1 inline-block transform -rotate-1 text-center w-max">
              负卸空间
            </span>
          </div>
        </Link>
        
        {location.pathname !== '/history' && (
          <Link 
            to="/history" 
            className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-dark shadow-sketch-sm hover:shadow-sketch hover:-translate-y-1 transition-all rounded-lg group"
          >
            <History size={20} className="text-dark" />
            <span className="font-bold text-lg">历史</span>
          </Link>
        )}
      </div>
    </header>
  );
};