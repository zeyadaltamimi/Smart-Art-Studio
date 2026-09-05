import React from 'react';
import {cairo} from '../fonts';
import {DoubleNoteIcon} from './NoteIcon';

/**
 * شعار مؤقت مبني بالكود.
 * لاستبداله بشعار المتجر الحقيقي: ضع الملف في مجلد public/
 * ثم استخدم <CanvasImage src={staticFile('logo.png')} /> بدل هذا المكوّن.
 */
export const Logo: React.FC<{size: number}> = ({size}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: size * 0.16,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'linear-gradient(150deg, #F7DFA5 0%, #E0B45F 45%, #B8863B 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 90px rgba(232, 183, 90, 0.55)',
        }}
      >
        <DoubleNoteIcon size={size * 0.54} color="#2A1F16" />
      </div>
      <div
        style={{
          fontFamily: cairo,
          fontWeight: 900,
          fontSize: size * 0.34,
          direction: 'rtl',
          background: 'linear-gradient(180deg, #FFF6E2 0%, #E8B75A 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '-0.01em',
        }}
      >
        الفن الذكي
      </div>
    </div>
  );
};
