import React from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {ArrowUp} from '../components/ArrowUp';
import {VerifiedBadge} from '../components/CheckIcon';
import {Logo} from '../components/Logo';
import {Sparkles} from '../components/Sparkles';
import {cairo, tajawal} from '../fonts';

/**
 * المشهد الخامس — الخاتمة ودعوة لاتخاذ إجراء
 * "رابط المتجر في البايو... ومتجرنا سعودي وموثق. — مع الفن الذكي.. كلماتك أقرب!"
 * الشعار في المنتصف، سهم متحرك يشير للأعلى نحو البايو، وشارة التوثيق السعودية.
 */
export const Scene05Cta: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="مشهد ٥ — دعوة لاتخاذ إجراء"
      style={{
        background: 'linear-gradient(170deg, #4A3520 0%, #33241A 55%, #241A12 100%)',
        direction: 'rtl',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 170,
        paddingBottom: 150,
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      <AbsoluteFill
        name="توهج ذهبي"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(232, 183, 90, 0.34) 0%, rgba(232, 183, 90, 0) 62%)',
        }}
      />

      <Sparkles count={14} color="#F7DFA5" seed="scene5-sparkle" />

      <Interactive.Div
        name="دعوة البايو"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          opacity: interpolate(frame, [46, 68], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div
          style={{
            translate: `0px ${Math.sin(frame / 7) * 16 - 6}px`,
          }}
        >
          <ArrowUp size={104} color="#F7DFA5" />
        </div>
        <Interactive.Div
          name="نص البايو"
          style={{
            fontFamily: cairo,
            fontWeight: 700,
            fontSize: 66,
            color: '#F7DFA5',
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          رابط المتجر في البايو
        </Interactive.Div>
      </Interactive.Div>

      <Interactive.Div
        name="كتلة الشعار"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 54,
          opacity: interpolate(frame, [4, 26], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [4, 40], [0.7, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 200}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <Logo size={330} />

        <Interactive.Div
          name="الشعار النصي"
          style={{
            fontFamily: cairo,
            fontWeight: 700,
            fontSize: 70,
            color: '#FFF6E2',
            textAlign: 'center',
            lineHeight: 1.35,
            opacity: interpolate(frame, [30, 54], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [30, 58], ['0px 40px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.spring({damping: 200}),
            }),
          }}
        >
          مع الفن الذكي.. كلماتك أقرب!
        </Interactive.Div>
      </Interactive.Div>

      <Interactive.Div
        name="شارة التوثيق"
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          gap: 20,
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 46,
          paddingRight: 46,
          borderRadius: 99,
          backgroundColor: '#006C35',
          fontFamily: tajawal,
          fontWeight: 700,
          fontSize: 52,
          color: '#FFFFFF',
          opacity: interpolate(frame, [70, 92], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          scale: interpolate(frame, [70, 104], [0.68, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 12}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <VerifiedBadge size={64} fill="#FFFFFF" check="#006C35" />
        متجرنا سعودي وموثّق
      </Interactive.Div>
    </AbsoluteFill>
  );
};
