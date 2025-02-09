import React from 'react';

const LightningBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {[...Array(5)].map((_, index) => (
          <path
            key={index}
            d={`M${Math.random() * 100} ${Math.random() * 100} 
               L${Math.random() * 100} ${Math.random() * 100} 
               L${Math.random() * 100} ${Math.random() * 100} 
               L${Math.random() * 100} ${Math.random() * 100}`}
            fill="none"
            stroke="#3498DB"
            strokeWidth="2"
            filter="url(#glow)"
            className={`lightning lightning-${index + 1}`}
          />
        ))}
      </svg>
    </div>
  );
};

export default LightningBackground;