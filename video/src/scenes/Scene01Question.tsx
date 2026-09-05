import React from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {cairo, tajawal} from '../fonts';

/**
 * المشهد الأول — طرح التساؤل
 * "ليه تعتمدون على الأغاني الجاهزة والروتينية بكل عرس؟!"
 * ألوان باردة وهادئة، الكلمات تظهر تدريجياً ثم اهتزاز بسيط يعبّر عن الاستياء.
 */
export const Scene01Question: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="مشهد ١ — التساؤل"
      style={{
        backgroundColor: '#0F1119',
        direction: 'rtl',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AbsoluteFill
        name="توهج خلفي"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(90, 104, 148, 0.30) 0%, rgba(15, 17, 25, 0) 62%)',
        }}
      />

      <Interactive.Div
        name="علامة استفهام خلفية"
        style={{
          position: 'absolute',
          fontFamily: cairo,
          fontWeight: 900,
          fontSize: 1000,
          color: 'rgba(255, 255, 255, 0.045)',
          top: 300,
          scale: interpolate(frame, [0, 150], [1, 1.16], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            output: 'perceptual-scale',
          }),
        }}
      >
        ؟
      </Interactive.Div>

      <Interactive.Div
        name="كتلة النص"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 26,
          paddingLeft: 90,
          paddingRight: 90,
          textAlign: 'center',
          translate: interpolate(
            frame,
            [52, 56, 60, 64, 68, 72, 76],
            ['0px 0px', '-14px 0px', '13px 0px', '-9px 0px', '7px 0px', '-4px 0px', '0px 0px'],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.linear,
            },
          ),
        }}
      >
        <Interactive.Div
          name="سطر ١"
          style={{
            fontFamily: tajawal,
            fontWeight: 500,
            fontSize: 76,
            color: '#98A0B8',
            lineHeight: 1.35,
            opacity: interpolate(frame, [6, 24], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [6, 24], ['0px 48px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          ليه تعتمدون على
        </Interactive.Div>

        <Interactive.Div
          name="سطر ٢"
          style={{
            fontFamily: cairo,
            fontWeight: 900,
            fontSize: 112,
            color: '#FFFFFF',
            lineHeight: 1.28,
            opacity: interpolate(frame, [20, 40], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: interpolate(frame, [20, 40], ['0px 56px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          الأغاني الجاهزة والروتينية
        </Interactive.Div>

        <Interactive.Div
          name="سطر ٣"
          style={{
            fontFamily: cairo,
            fontWeight: 900,
            fontSize: 118,
            color: '#F0F3FA',
            lineHeight: 1.28,
            opacity: interpolate(frame, [36, 54], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            scale: interpolate(frame, [36, 58], [0.82, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.spring({damping: 200}),
              output: 'perceptual-scale',
            }),
          }}
        >
          بكل عرس؟!
        </Interactive.Div>

        <Interactive.Div
          name="خط تحتي"
          style={{
            height: 8,
            borderRadius: 99,
            backgroundColor: '#E8B75A',
            marginTop: 18,
            width: interpolate(frame, [58, 80], [0, 260], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
