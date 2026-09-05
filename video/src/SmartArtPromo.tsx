import React from 'react';
import {linearTiming, springTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {Scene01Question} from './scenes/Scene01Question';
import {Scene02Sameness} from './scenes/Scene02Sameness';
import {Scene03Solution} from './scenes/Scene03Solution';
import {Scene04Features} from './scenes/Scene04Features';
import {Scene05Cta} from './scenes/Scene05Cta';

/**
 * الفيديو الترويجي الكامل — ٧٣٥ إطار عند ٣٠ إطار/ثانية = ٢٤.٥ ثانية.
 * المدة = ١٥٠ + ١٥٠ + ١٨٠ + ١٥٠ + ١٦٥ − (٤ × ١٥ انتقال)
 */
export const SmartArtPromo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={150} name="مشهد ١ — التساؤل">
        <Scene01Question />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: 15})}
      />

      <TransitionSeries.Sequence durationInFrames={150} name="مشهد ٢ — التشابه">
        <Scene02Sameness />
      </TransitionSeries.Sequence>

      {/* انتقال سريع ومبهج من البرود إلى الذهب */}
      <TransitionSeries.Transition
        presentation={slide({direction: 'from-bottom'})}
        timing={springTiming({config: {damping: 200}, durationInFrames: 15})}
      />

      <TransitionSeries.Sequence durationInFrames={180} name="مشهد ٣ — الحل">
        <Scene03Solution />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({durationInFrames: 15})}
      />

      <TransitionSeries.Sequence durationInFrames={150} name="مشهد ٤ — الميزات والسعر">
        <Scene04Features />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({direction: 'from-bottom'})}
        timing={springTiming({config: {damping: 200}, durationInFrames: 15})}
      />

      <TransitionSeries.Sequence durationInFrames={165} name="مشهد ٥ — دعوة لاتخاذ إجراء">
        <Scene05Cta />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
