import React from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {SongCard} from '../components/SongCard';
import {cairo, tajawal} from '../fonts';

/**
 * المشهد الثاني — التأكيد على المشكلة
 * "للأسف، ليلة العمر صارت متشابهة!"
 * شبكة من بطاقات أغانٍ متطابقة تماماً تظهر واحدة تلو الأخرى وتنجرف للأعلى،
 * والنص ينزل من الأعلى ليستقر في منتصف الشاشة.
 */
export const Scene02Sameness: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="مشهد ٢ — التشابه"
      style={{
        backgroundColor: '#13151E',
        direction: 'rtl',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AbsoluteFill
        name="شبكة القوالب المكررة"
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          justifyContent: 'center',
          gap: 46,
          paddingTop: 120,
          paddingBottom: 120,
          translate: interpolate(frame, [0, 150], ['0px 0px', '0px -140px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.linear,
          }),
        }}
      >
        {new Array(14).fill(true).map((_, i) => (
          <div
            key={i}
            style={{
              opacity: interpolate(frame, [i * 3, i * 3 + 14], [0, 0.22], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <SongCard width={430} color="#8E96AE" />
          </div>
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        name="تعتيم خلف النص"
        style={{
          background:
            'radial-gradient(ellipse 78% 34% at 50% 50%, rgba(19, 21, 30, 0.97) 0%, rgba(19, 21, 30, 0.86) 46%, rgba(19, 21, 30, 0) 100%)',
        }}
      />

      <Interactive.Div
        name="كتلة النص"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 22,
          paddingLeft: 90,
          paddingRight: 90,
          textAlign: 'center',
          translate: interpolate(frame, [4, 46], ['0px -320px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.spring({damping: 200}),
          }),
          opacity: interpolate(frame, [4, 24], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <Interactive.Div
          name="للأسف"
          style={{
            fontFamily: tajawal,
            fontWeight: 500,
            fontSize: 72,
            color: '#8E96AE',
            lineHeight: 1.3,
          }}
        >
          للأسف،
        </Interactive.Div>

        <Interactive.Div
          name="العنوان"
          style={{
            fontFamily: cairo,
            fontWeight: 900,
            fontSize: 116,
            color: '#FFFFFF',
            lineHeight: 1.3,
            scale: interpolate(frame, [40, 66], [1, 1.05], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              output: 'perceptual-scale',
            }),
          }}
        >
          ليلة العمر صارت متشابهة!
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
