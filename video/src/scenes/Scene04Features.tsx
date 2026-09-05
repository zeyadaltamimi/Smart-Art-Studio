import React from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {CheckIcon} from '../components/CheckIcon';
import {FloatingNotes} from '../components/FloatingNotes';
import {Sparkles} from '../components/Sparkles';
import {cairo} from '../fonts';

/**
 * المشهد الرابع — الميزات والسعر
 * "بالكلمات اللي ودك... وبمبلغ معقول جداً!"
 * نوتات موسيقية تتطاير بجانب النص، مع شارة تدل على القيمة والسعر المناسب.
 */
export const Scene04Features: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="مشهد ٤ — الميزات والسعر"
      style={{
        background: 'linear-gradient(200deg, #3D2C1C 0%, #4A3520 48%, #2A1E14 100%)',
        direction: 'rtl',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AbsoluteFill
        name="توهج ذهبي"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(232, 183, 90, 0.32) 0%, rgba(232, 183, 90, 0) 62%)',
        }}
      />

      <FloatingNotes count={13} color="rgba(247, 223, 165, 0.55)" seed="scene4" />
      <Sparkles count={12} color="#F7DFA5" seed="scene4-sparkle" />

      <Interactive.Div
        name="كتلة النص"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
          paddingLeft: 80,
          paddingRight: 80,
          textAlign: 'center',
        }}
      >
        <Interactive.Div
          name="الكلمات"
          style={{
            fontFamily: cairo,
            fontWeight: 900,
            fontSize: 106,
            color: '#FFF6E2',
            lineHeight: 1.3,
            opacity: interpolate(frame, [8, 30], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [8, 34], ['0px 56px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.spring({damping: 200}),
            }),
          }}
        >
          بالكلمات اللي ودّك...
        </Interactive.Div>

        <Interactive.Div
          name="السعر"
          style={{
            fontFamily: cairo,
            fontWeight: 900,
            fontSize: 114,
            lineHeight: 1.3,
            background: 'linear-gradient(180deg, #FFF6E2 0%, #F0C878 50%, #C9973F 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            paddingBottom: 12,
            opacity: interpolate(frame, [34, 56], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(frame, [34, 64], [0.76, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.spring({damping: 200}),
              output: 'perceptual-scale',
            }),
          }}
        >
          وبمبلغ معقول جداً!
        </Interactive.Div>

        <Interactive.Div
          name="شارة القيمة"
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            gap: 22,
            marginTop: 26,
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 52,
            paddingRight: 52,
            borderRadius: 99,
            border: '3px solid rgba(232, 183, 90, 0.7)',
            backgroundColor: 'rgba(232, 183, 90, 0.12)',
            fontFamily: cairo,
            fontWeight: 700,
            fontSize: 58,
            color: '#F7DFA5',
            opacity: interpolate(frame, [66, 86], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(frame, [66, 96], [0.6, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.spring({damping: 12}),
              output: 'perceptual-scale',
            }),
          }}
        >
          <CheckIcon size={62} color="#F7DFA5" />
          سعر يناسب الجميع
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
