import React from 'react';

interface AshokaChakraIconProps {
  className?: string;
}

export const AshokaChakraIcon: React.FC<AshokaChakraIconProps> = ({ className = "h-6 w-6" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* 24 spokes radiating from center */}
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 15) * Math.PI / 180;
        const x1 = 12 + 3 * Math.cos(angle);
        const y1 = 12 + 3 * Math.sin(angle);
        const x2 = 12 + 9 * Math.cos(angle);
        const y2 = 12 + 9 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
};
