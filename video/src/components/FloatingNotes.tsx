import React from 'react';
import {random, useCurrentFrame, useVideoConfig} from 'remotion';
import {DoubleNoteIcon, NoteIcon} from './NoteIcon';

// نوتات موسيقية تتطاير للأعلى
export const FloatingNotes: React.FC<{count: number; color: string; seed: string}> = ({
  count,
  color,
  seed,
}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  return (
    <>
      {new Array(count).fill(true).map((_, i) => {
        const x = 60 + random(`${seed}-x-${i}`) * (width - 200);
        const size = 44 + random(`${seed}-s-${i}`) * 56;
        const speed = 2.2 + random(`${seed}-v-${i}`) * 2.6;
        const start = random(`${seed}-t-${i}`) * height;
        const y = height - ((start + frame * speed) % (height + 260)) + 130;
        const sway = Math.sin((frame + i * 24) / 26) * 34;
        const isDouble = random(`${seed}-k-${i}`) > 0.55;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x + sway,
              top: y,
              opacity: 0.5 + random(`${seed}-o-${i}`) * 0.4,
              rotate: `${Math.sin((frame + i * 40) / 34) * 16}deg`,
            }}
          >
            {isDouble ? (
              <DoubleNoteIcon size={size} color={color} />
            ) : (
              <NoteIcon size={size} color={color} />
            )}
          </div>
        );
      })}
    </>
  );
};
