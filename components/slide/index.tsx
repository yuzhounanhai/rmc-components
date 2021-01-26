import SlideTransition from './slide';
import SlideIn from './slideIn';

export type { SlideProps } from './slide';

export type SlideType = typeof SlideTransition & {
  slideIn: typeof SlideIn;
};

const Slide = SlideTransition as SlideType;

Slide.slideIn = SlideIn;

export default Slide;