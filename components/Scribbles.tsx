import React from 'react';

interface ScribbleProps {
  className?: string;
  color?: string;
}

export const ScribbleCat: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 160C40 160 30 110 60 80C60 80 50 40 80 50L100 60L120 50C150 40 140 80 140 80C170 110 160 160 160 160" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M80 100C80 100 75 110 85 110" stroke={color} strokeWidth="6" strokeLinecap="round"/>
    <path d="M120 100C120 100 125 110 115 110" stroke={color} strokeWidth="6" strokeLinecap="round"/>
    <path d="M100 120L95 130H105L100 120Z" fill={color}/>
    <path d="M60 120H20" stroke={color} strokeWidth="4" strokeLinecap="round"/>
    <path d="M60 130H30" stroke={color} strokeWidth="4" strokeLinecap="round"/>
    <path d="M140 120H180" stroke={color} strokeWidth="4" strokeLinecap="round"/>
    <path d="M140 130H170" stroke={color} strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export const ScribbleTrash: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M60 60H140" stroke={color} strokeWidth="8" strokeLinecap="round"/>
    <path d="M70 60L80 160H120L130 60" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M90 40C90 40 90 60 90 60" stroke={color} strokeWidth="8" strokeLinecap="round"/>
    <path d="M110 40C110 40 110 60 110 60" stroke={color} strokeWidth="8" strokeLinecap="round"/>
    <path d="M90 40H110" stroke={color} strokeWidth="8" strokeLinecap="round"/>
    <path d="M90 90V130" stroke={color} strokeWidth="6" strokeLinecap="round"/>
    <path d="M110 90V130" stroke={color} strokeWidth="6" strokeLinecap="round"/>
    <path d="M145 50L155 70" stroke={color} strokeWidth="6" strokeLinecap="round"/>
    <path d="M55 50L45 70" stroke={color} strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

export const ScribbleShape: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M100 30L160 130H40L100 30Z" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="100" cy="100" r="30" stroke={color} strokeWidth="6"/>
    <path d="M150 40L170 60M40 150L20 170" stroke={color} strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

export const ScribbleStar: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 10L60 40H95L65 60L75 90L50 70L25 90L35 60L5 40H40L50 10Z" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ScribbleTape: React.FC<{ className?: string, opacity?: number }> = ({ className, opacity = 0.3 }) => (
  <svg viewBox="0 0 100 40" className={className} style={{ opacity }}>
    <rect x="2" y="2" width="96" height="36" fill="currentColor" />
    <path d="M0 0L5 5L0 10L5 15L0 20L5 25L0 30L5 35L0 40" fill="white" />
    <path d="M100 0L95 5L100 10L95 15L100 20L95 25L100 30L95 35L100 40" fill="white" />
  </svg>
);

export const ScribbleUnderline: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 20" fill="none" className={className}>
    <path d="M5 10C50 15 150 5 195 10" stroke={color} strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export const getScribbleByEmoji = (emoji: string) => {
  if (emoji === '🐾' || emoji === '🐱') return ScribbleCat;
  if (emoji === '🗑️' || emoji === '🛡️' || emoji === '🥤') return ScribbleTrash;
  if (emoji === '✨' || emoji === '🧊' || emoji === '💠') return ScribbleShape;
  return ScribbleStar;
};