import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { History } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo className="transition-transform group-hover:rotate-12" />
          <span className="font-bold text-lg text-dark tracking-tight group-hover:text-primary transition-colors">
            Dia Rhea<span className="font-light ml-1 text-sm text-gray-500">负卸空间</span>
          </span>
        </Link>
        
        {location.pathname !== '/history' && (
          <Link 
            to="/history" 
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-primary transition-all active:scale-95"
          >
            <History size={18} />
            <span>我的历史</span>
          </Link>
        )}
      </div>
    </header>
  );
};