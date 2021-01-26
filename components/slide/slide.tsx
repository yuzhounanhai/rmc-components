import React from 'react';
import cn from 'classnames';
import { defaultPrefixCls } from '../_config/dict';

export type StandardDirections = 'up' | 'down' | 'left' | 'right';

export type Directions = '↑' | '↓' | '←' | '→' | StandardDirections;

export interface SlideProps {
  show?: boolean;
  speed?: number;
  delay?: number;
  direction?: Directions;
  opacityTst?: boolean;
  limitTstProperty?: boolean;
  needDestroy?: boolean;
  showTimingFunction?: string;
  hideTimingFunction?: string;
  timingFunction?: string;
  onShow?: (direction?: StandardDirections) => void;
  onHide?: (direction?: StandardDirections) => void;
  onChange?: (direction?: StandardDirections, isEnter?: boolean) => void;
  children?: React.ReactNode;
  prefixCls?: string;
  onTransitionEnd?: (e?: TransitionEvent) => void;
  className?: string;
  style?: React.CSSProperties,
  [key: string]: any;
};

export interface SlideState {
  isElementShow: boolean;
  transitionClass: string;
};

const prefixFlag = '__prefix__';
const directionFlag = '__direction__';
const ClassMap = {
  begin: `${prefixFlag}-slide-begin-${directionFlag}`,
  show: `${prefixFlag}-slide-op-1`,
  hide: `${prefixFlag}-slide-op-0`,
  end: '',
};

const SlideStatus = {
  enter: 'enter',
  exit: 'exit',
};

class Slide extends React.Component<SlideProps, SlideState> {
  static defaultProps = {
    show: false,
    direction: 'down' as Directions,
    speed: 0.5,
    delay: 0,
    prefixCls: defaultPrefixCls,
    needDestroy: false,
    showTimingFunction: '',
    hideTimingFunction: '',
    timingFunction: 'ease',
    limitTstProperty: true,
    opacityTst: true,
  }

  timer: number|undefined = undefined;

  status: string|undefined;

  constructor(props: SlideProps) {
    super(props);
    const isElementShow = this.getIsElementShow(props.show || false);
    const transitionClass = this.getTransitionClass(!!props.show);
    this.state = {
      isElementShow,
      transitionClass,
    };
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  componentDidUpdate(prevProps: SlideProps) {
    if (prevProps.show !== this.props.show) {
      if (this.props.show) {
        this.status = SlideStatus.enter;
        this.setState({
          isElementShow: true,
          transitionClass: this.getTransitionClass(false),
        }, () => {
          clearTimeout(this.timer);
          this.timer = window.setTimeout(() => {
            this.setState({
              transitionClass: this.getTransitionClass(true),
            });
          }, 50);
        });
      } else {
        this.status = SlideStatus.exit;
        this.setState({
          transitionClass: this.getTransitionClass(false),
        });
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  getIsElementShow(showStatus: boolean) {
    if (showStatus) {
      return true;
    } else {
      return !this.props.needDestroy;
    }
  }

  getTransitionProperty() {
    const {
      opacityTst,
      limitTstProperty,
    } = this.props;
    let pv = undefined;
    if (limitTstProperty) {
      pv = 'transform';
      if (opacityTst) {
        pv += ',opacity';
      }
    }
    return pv;
  }

  getTransitionClass(show: boolean) {
    const {
      opacityTst,
    } = this.props;
    if (!show) {
      return cn(ClassMap.begin, {
        [ClassMap.hide]: opacityTst,
      });
    }
    return cn(ClassMap.end, {
      [ClassMap.show]: opacityTst,
    });
  }

  getTimingFunction() {
    const {
      show,
      timingFunction,
      showTimingFunction,
      hideTimingFunction,
    } = this.props;
    if (show) {
      return showTimingFunction || timingFunction || undefined;
    }
    return hideTimingFunction || timingFunction || undefined;
  }

  getStandardDirection(direction: Directions): StandardDirections {
    switch(direction) {
      case '←': return 'left';
      case '↑': return 'up';
      case '→': return 'right';
      case '↓': return 'down';
      default: return direction;
    };
  }

  parseTransitionClass(className: string) {
    const {
      prefixCls = Slide.defaultProps.prefixCls,
      direction = Slide.defaultProps.direction,
    } = this.props;
    const prefixReg = new RegExp(prefixFlag, 'g');
    const directionReg = new RegExp(directionFlag, 'g');
    return className.replace(prefixReg, prefixCls).replace(directionReg, this.getStandardDirection(direction));
  }

  handleTransitionEnd() {
    const {
      onShow,
      onHide,
      onChange,
      direction = Slide.defaultProps.direction,
    } = this.props;
    if (this.status) {
      let isEnter = true;
      if (this.status === SlideStatus.enter) {
        typeof onShow === 'function' && onShow(this.getStandardDirection(direction));
      }
      if (this.status === SlideStatus.exit) {
        isEnter = false;
        this.setState({
          isElementShow: this.getIsElementShow(false),
        }, () => {
          typeof onHide === 'function' && onHide(this.getStandardDirection(direction));          
        });
      }
      this.status = '';
      typeof onChange === 'function' && onChange(this.getStandardDirection(direction), isEnter);
    }
  }

  render() {
    const {
      show,
      speed,
      delay,
      direction,
      opacityTst,
      limitTstProperty,
      needDestroy,
      showTimingFunction,
      hideTimingFunction,
      timingFunction,
      onShow,
      onHide,
      onChange,
      onTransitionEnd,
      children: propsChildren,
      prefixCls,
      className,
      style,
      ...restProps
    } = this.props;
    const {
      isElementShow,
      transitionClass,
    } = this.state;

    const children = React.Children.only(propsChildren);

    if (isElementShow && children) {
      return {
        ...(children || {}),
        props: {
          ...(children as React.ReactElement).props,
          ...restProps,
          style: {
            ...((children as React.ReactElement).props.style || {}),
            transitionProperty: this.getTransitionProperty(),
            ...(style || {}),
            transitionDuration: `${speed}s`,
            transitionDelay: delay ? `${delay}s` : undefined,
            transitionTimingFunction: this.getTimingFunction(),
          },
          onTransitionEnd: (e: TransitionEvent) => {
            if (typeof onTransitionEnd === 'function') {
              onTransitionEnd(e);
            }
            const selfTransitionFunc = (children as React.ReactElement).props.onTransitionEnd;
            if (typeof selfTransitionFunc === 'function') {
              selfTransitionFunc(e);
            }
            this.handleTransitionEnd();
          },
          className: cn(
            className,
            (children as React.ReactElement).props.className,
            `${prefixCls}-slide`,
            this.parseTransitionClass(transitionClass)
          ),
        },
      }
    }
    return null;
  }
};

export default Slide;
