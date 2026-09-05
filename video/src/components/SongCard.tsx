import React from 'react';
import {NoteIcon} from './NoteIcon';

// كل البطاقات متطابقة تماماً — وهذا هو المقصود في المشهد الثاني:
// نفس الأغنية، نفس القالب، في كل عرس.
const BAR_HEIGHTS = [16, 30, 44, 24, 38, 20, 34, 26];

export const SongCard: React.FC<{width: number; color: string}> = ({width, color}) => {
  return (
    <div
      style={{
        width,
        height: width * 0.42,
        borderRadius: width * 0.09,
        border: `2px solid ${color}`,
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        gap: width * 0.05,
        padding: width * 0.07,
        boxSizing: 'border-box',
      }}
    >
      <NoteIcon size={width * 0.2} color={color} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: width * 0.022,
          height: width * 0.2,
        }}
      >
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            style={{
              width: width * 0.022,
              height: (h / 44) * width * 0.2,
              borderRadius: 99,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};
