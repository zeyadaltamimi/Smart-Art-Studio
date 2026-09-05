import React from 'react';

// أيقونة نوتة موسيقية مرسومة بالـ SVG حتى لا تعتمد على دعم الرموز في الخطوط
export const NoteIcon: React.FC<{
  size: number;
  color: string;
  opacity?: number;
}> = ({size, color, opacity = 1}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={{opacity, display: 'block'}}
    >
      <path
        d="M34 7 L34 31"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M34 7 C40.5 9.5 44.5 13.5 44.5 19.5 C41.5 14 38 11.5 34 10.8 Z"
        fill={color}
      />
      <ellipse
        cx="26.5"
        cy="33"
        rx="9.5"
        ry="7.2"
        transform="rotate(-18 26.5 33)"
        fill={color}
      />
    </svg>
  );
};

// نوتة مزدوجة
export const DoubleNoteIcon: React.FC<{
  size: number;
  color: string;
  opacity?: number;
}> = ({size, color, opacity = 1}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={{opacity, display: 'block'}}
    >
      <path
        d="M18 34 L18 10 L40 6 L40 30"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 14 L40 10" stroke={color} strokeWidth={4} strokeLinecap="round" />
      <ellipse cx="12.5" cy="35" rx="7" ry="5.4" transform="rotate(-18 12.5 35)" fill={color} />
      <ellipse cx="34.5" cy="31" rx="7" ry="5.4" transform="rotate(-18 34.5 31)" fill={color} />
    </svg>
  );
};
