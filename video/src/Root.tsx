import React from 'react';
import {Composition, Folder} from 'remotion';
import {SmartArtPromo} from './SmartArtPromo';
import {Scene01Question} from './scenes/Scene01Question';
import {Scene02Sameness} from './scenes/Scene02Sameness';
import {Scene03Solution} from './scenes/Scene03Solution';
import {Scene04Features} from './scenes/Scene04Features';
import {Scene05Cta} from './scenes/Scene05Cta';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SmartArtPromo"
        component={SmartArtPromo}
        durationInFrames={735}
        fps={30}
        width={1080}
        height={1920}
      />

      <Folder name="Scenes">
        <Composition
          id="Scene01Question"
          component={Scene01Question}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene02Sameness"
          component={Scene02Sameness}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene03Solution"
          component={Scene03Solution}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene04Features"
          component={Scene04Features}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Scene05Cta"
          component={Scene05Cta}
          durationInFrames={165}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
