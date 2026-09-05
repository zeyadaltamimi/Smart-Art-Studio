import React from 'react';
import {interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';

const Sparkle: React.FC<{size: number; color: string}> = ({size, color}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{display: 'block'}}>
      <path
        d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z"
        fill={color}
      />
    </svg>
  );
};

// بريق ذهبي متلألئ يعبر عن الفخامة والاحتفال
export const Sparkles: React.FC<{count: number; color: string; seed: string}> = ({
  count,
  color,
  seed,
}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  return (
    <>
      {new Array(count).fill(true).map((_, i) => {
        const x = random(`${seed}-x-${i}`) * width;
        const y = random(`${seed}-y-${i}`) * height;
        const size = 14 + random(`${seed}-s-${i}`) * 30;
        const delay = random(`${seed}-d-${i}`) * 40;
        const period = 34 + random(`${seed}-p-${i}`) * 26;
        const phase = ((frame + delay) % period) / period;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              opacity: Math.sin(phase * Math.PI) * 0.9,
              scale: String(0.4 + Math.sin(phase * Math.PI) * 0.6),
              rotate: `${interpolate(frame, [0, 120], [0, 90])}deg`,
            }}
          >
            <Sparkle size={size} color={color} />
          </div>
        );
      })}
    </>
  );
};
