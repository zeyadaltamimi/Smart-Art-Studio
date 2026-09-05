import React from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {FloatingNotes} from '../components/FloatingNotes';
import {Sparkles} from '../components/Sparkles';
import {cairo, tajawal} from '../fonts';

/**
 * المشهد الثالث — تقديم الحل
 * "لكن اليوم مع متجر الفن الذكي؛ نعطيك زفتك الخاصة!"
 * انتقال مبهج إلى ألوان ذهبية فخمة، مع انفجار ضوئي ونوتات مضيئة.
 */
export const Scene03Solution: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="مشهد ٣ — الحل"
      style={{
        background: 'linear-gradient(165deg, #33241A 0%, #4A3520 52%, #241A12 100%)',
        direction: 'rtl',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AbsoluteFill
        name="توهج ذهبي"
        style={{
          background:
            'radial-gradient(circle at 50% 46%, rgba(232, 183, 90, 0.42) 0%, rgba(232, 183, 90, 0) 60%)',
          opacity: interpolate(frame, [0, 18, 60, 180], [0, 1, 0.85, 0.6], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />

      <FloatingNotes count={9} color="rgba(247, 223, 165, 0.42)" seed="scene3" />
      <Sparkles count={16} color="#F7DFA5" seed="scene3-sparkle" />

      <Interactive.Div
        name="حلقة الانفجار"
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          border: '6px solid rgba(247, 223, 165, 0.85)',
          opacity: interpolate(frame, [0, 6, 34], [0, 0.9, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [0, 34], [0.2, 4.2], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
        }}
      />

      <Interactive.Div
        name="حلقة الانفجار ٢"
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          border: '3px solid rgba(247, 223, 165, 0.55)',
          opacity: interpolate(frame, [8, 14, 46], [0, 0.7, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          scale: interpolate(frame, [8, 46], [0.2, 5], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
        }}
      />

      <Interactive.Div
        name="كتلة النص"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          paddingLeft: 80,
          paddingRight: 80,
          textAlign: 'center',
        }}
      >
        <Interactive.Div
          name="لكن اليوم مع"
          style={{
            fontFamily: tajawal,
            fontWeight: 500,
            fontSize: 74,
            color: '#F3E3C6',
            lineHeight: 1.3,
            opacity: interpolate(frame, [10, 28], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [10, 28], ['0px 40px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          لكن اليوم مع
        </Interactive.Div>

        <Interactive.Div
          name="اسم المتجر"
          style={{
            fontFamily: cairo,
            fontWeight: 900,
            fontSize: 126,
            lineHeight: 1.26,
            background: 'linear-gradient(180deg, #FFF6E2 0%, #F0C878 48%, #C9973F 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            paddingBottom: 14,
            opacity: interpolate(frame, [22, 40], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(frame, [22, 52], [0.72, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.spring({damping: 200}),
              output: 'perceptual-scale',
            }),
          }}
        >
          متجر الفن الذكي
        </Interactive.Div>

        <Interactive.Div
          name="فاصل ذهبي"
          style={{
            height: 6,
            borderRadius: 99,
            background: 'linear-gradient(90deg, rgba(232,183,90,0) 0%, #E8B75A 50%, rgba(232,183,90,0) 100%)',
            marginTop: 10,
            marginBottom: 18,
            width: interpolate(frame, [44, 68], [0, 620], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        />

        <Interactive.Div
          name="الوعد"
          style={{
            fontFamily: cairo,
            fontWeight: 900,
            fontSize: 104,
            color: '#FFF6E2',
            lineHeight: 1.3,
            opacity: interpolate(frame, [50, 72], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [50, 76], ['0px 52px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.spring({damping: 200}),
            }),
          }}
        >
          نعطيك زفّتك الخاصة!
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
