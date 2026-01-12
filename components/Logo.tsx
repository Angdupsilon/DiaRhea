import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g transform="rotate(5 50 60)">
      <path d="M50 40L70 75H30L50 40Z" stroke="#1A1A1A" strokeWidth="5" strokeLinejoin="round"/>
      <path d="M50 15V30" stroke="#A29BFE" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 5"/>
    </g>
  </svg>
);