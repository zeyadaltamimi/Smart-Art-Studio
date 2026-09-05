import React from 'react';

export const ArrowUp: React.FC<{size: number; color: string}> = ({size, color}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display: 'block'}}>
      <path
        d="M24 42 L24 8"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <path
        d="M10 21 L24 7 L38 21"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
