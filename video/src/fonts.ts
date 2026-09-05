import {loadFont as loadCairo} from '@remotion/google-fonts/Cairo';
import {loadFont as loadTajawal} from '@remotion/google-fonts/Tajawal';

// خط العناوين العريضة
export const {fontFamily: cairo} = loadCairo('normal', {
  weights: ['400', '700', '900'],
  subsets: ['arabic'],
});

// خط النصوص المساندة
export const {fontFamily: tajawal} = loadTajawal('normal', {
  weights: ['400', '500', '700'],
  subsets: ['arabic'],
});
