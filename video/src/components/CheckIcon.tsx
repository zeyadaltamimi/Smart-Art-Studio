import React from 'react';

export const CheckIcon: React.FC<{size: number; color: string; strokeWidth?: number}> = ({
  size,
  color,
  strokeWidth = 5,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{display: 'block'}}>
      <path
        d="M7 16.5 L13.5 23 L25 10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// شارة توثيق على شكل وردة مسننة
export const VerifiedBadge: React.FC<{size: number; fill: string; check: string}> = ({
  size,
  fill,
  check,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{display: 'block'}}>
      <path
        d="M32 3 L39 9 L48 7.5 L51.5 16 L60 20 L58 29 L64 36 L58 43 L60 52 L51.5 56 L48 64.5 L39 63 L32 69 L25 63 L16 64.5 L12.5 56 L4 52 L6 43 L0 36 L6 29 L4 20 L12.5 16 L16 7.5 L25 9 Z"
        transform="scale(0.9) translate(3.5 -1.5)"
        fill={fill}
      />
      <path
        d="M21 32.5 L28.5 40 L43 24"
        stroke={check}
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
