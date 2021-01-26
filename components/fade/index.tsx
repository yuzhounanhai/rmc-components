import FadeTransition from './fade';
import FadeIn from './fadeIn';

export type { FadeProps } from './fade';

export type FadeType = typeof FadeTransition & {
  fadeIn: typeof FadeIn;
};

const Fade = FadeTransition as FadeType;

Fade.fadeIn = FadeIn;

export default Fade;