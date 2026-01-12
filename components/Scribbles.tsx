import React from 'react';

interface ScribbleProps {
  className?: string;
  color?: string;
}

export const ScribbleCat: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 160C40 160 30 110 60 80C60 80 50 40 80 50L100 60L120 50C150 40 140 80 140 80C170 110 160 160 160 160" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M80 100C80 100 75 110 85 110" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
    <path d="M120 100C120 100 125 110 115 110" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
    <path d="M100 120L95 130H105L100 120Z" fill={color}/>
    <path d="M60 120H20" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M60 130H30" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M140 120H180" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M140 130H170" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
  </svg>
);

export const ScribbleTrash: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M60 60H140" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M70 60L80 160H120L130 60" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M90 40C90 40 90 60 90 60" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M110 40C110 40 110 60 110 60" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M90 40H110" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M90 90V130" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
    <path d="M110 90V130" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
    <path d="M145 50L155 70" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
    <path d="M55 50L45 70" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
  </svg>
);

export const ScribbleShape: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M100 30L160 130H40L100 30Z" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="100" cy="100" r="30" stroke={color} strokeWidth="6" fill="none"/>
    <path d="M150 40L170 60M40 150L20 170" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
  </svg>
);

export const ScribbleStar: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 10L60 40H95L65 60L75 90L50 70L25 90L35 60L5 40H40L50 10Z" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
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
    <path d="M5 10C50 15 150 5 195 10" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
  </svg>
);

/* New Unique Scribbles */

export const ScribbleCube: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 60L100 30L150 60L150 120L100 150L50 120L50 60Z" stroke={color} strokeWidth="8" strokeLinejoin="round" fill="none"/>
    <path d="M50 60L100 90L150 60" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M100 90V150" stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const ScribbleWind: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 60H120C140 60 150 40 130 30C110 20 100 50 120 70" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M20 100H150C170 100 180 80 160 70C140 60 130 90 150 110" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M50 140H100C120 140 130 160 110 170" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
  </svg>
);

export const ScribbleGlitch: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 40H160V160H40V40Z" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
    <path d="M30 60H170" stroke={color} strokeWidth="4" strokeDasharray="10 10" fill="none"/>
    <path d="M30 100H170" stroke={color} strokeWidth="4" strokeDasharray="20 5" fill="none"/>
    <path d="M30 140H170" stroke={color} strokeWidth="4" strokeDasharray="5 15" fill="none"/>
    <path d="M60 60V140" stroke={color} strokeWidth="4" fill="none"/>
    <path d="M120 40V120" stroke={color} strokeWidth="4" fill="none"/>
  </svg>
);

export const ScribbleSpiral: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M100 100C100 100 110 100 110 90C110 80 100 80 90 80C70 80 70 100 70 110C70 130 90 140 110 140C140 140 150 110 150 90C150 50 110 40 90 40C50 40 30 80 30 120" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
  </svg>
);

export const ScribbleShield: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 40L100 20L160 40V90C160 140 100 180 100 180C100 180 40 140 40 90V40Z" stroke={color} strokeWidth="8" strokeLinejoin="round" fill="none"/>
    <path d="M100 50V140" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
    <path d="M70 80H130" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
  </svg>
);

export const ScribbleDrop: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M100 40C100 40 40 110 40 140C40 170 70 190 100 190C130 190 160 170 160 140C160 110 100 40 100 40Z" stroke={color} strokeWidth="8" strokeLinejoin="round" fill="none"/>
    <path d="M70 130C70 130 80 150 100 150" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
  </svg>
);

export const ScribbleBoom: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="40" stroke={color} strokeWidth="8" fill="none"/>
    <path d="M100 40V20M100 160V180M40 100H20M160 100H180M60 60L40 40M140 140L160 160M60 140L40 160M140 60L160 40" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
  </svg>
);

export const ScribbleBox: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="50" y="50" width="100" height="100" stroke={color} strokeWidth="8" strokeLinejoin="round" fill="none"/>
    <path d="M50 50L150 150M150 50L50 150" stroke={color} strokeWidth="6" fill="none"/>
  </svg>
);

export const ScribbleTriangle: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M100 30L170 160H30L100 30Z" stroke={color} strokeWidth="8" strokeLinejoin="round" fill="none"/>
    <circle cx="100" cy="110" r="20" stroke={color} strokeWidth="6" fill="none"/>
  </svg>
);

export const ScribbleLoop: React.FC<ScribbleProps> = ({ className, color = "currentColor" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 100C20 100 20 150 50 150C80 150 100 100 150 100C180 100 180 50 150 50C120 50 100 100 50 100Z" stroke={color} strokeWidth="8" strokeLinecap="round" fill="none"/>
  </svg>
);

export const getScribbleByEmoji = (emoji: string) => {
  // Test 1
  if (emoji === '🏗️') return ScribbleCube;
  if (emoji === '🎐') return ScribbleWind;
  if (emoji === '👾') return ScribbleGlitch;
  if (emoji === '🌀') return ScribbleSpiral;
  
  // Test 2
  if (emoji === '🍳') return ScribbleShield;
  if (emoji === '♻️') return ScribbleTrash;
  if (emoji === '🥃') return ScribbleDrop;
  if (emoji === '☢️') return ScribbleBoom;

  // Test 3
  if (emoji === '🧊') return ScribbleBox;
  if (emoji === '🔺') return ScribbleTriangle;
  if (emoji === '♾️') return ScribbleLoop;
  if (emoji === '🌌') return ScribbleStar; // Nebula shares star for now or default

  // Defaults
  if (emoji === '🐾' || emoji === '🐱') return ScribbleCat;
  if (emoji === '🗑️' || emoji === '🛡️' || emoji === '🥤') return ScribbleTrash;
  if (emoji === '✨' || emoji === '💠') return ScribbleShape;
  return ScribbleStar;
};