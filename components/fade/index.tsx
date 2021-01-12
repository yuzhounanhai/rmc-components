import React from 'react';
import cn from 'classnames';
import { defaultPrefixCls } from '@/_config/dict';

export interface FadeProps {
  show?: boolean;
  speed?: number;
  delay?: number;
  limitTstProperty?: boolean;
  needDestroy?: boolean;
  showTimingFunction?: string;
  hideTimingFunction?: string;
  timingFunction?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  onTransitionEnd?: (e: TransitionEvent) => void;
  onShow?: () => void;
  onHide?: () => void;
  onChange?: (isShow: boolean) => void;
  className?: string;
  style?: React.CSSProperties,
  [key: string]: any;
};

export interface FadeState {
  isElementShow: boolean;
  transitionClass: string;
};

const replaceTag = '$$prefix$$';

const classMap = {
  show: `${replaceTag}-fade-op-1`,
  hide: `${replaceTag}-fade-op-0`,
};

const FadeStatusMap = {
  showing: 'showing',
  hiding: 'hiding',
};

class Fade extends React.Component<FadeProps, FadeState> {
  static defaultProps = {
    show: false,
    delay: 0,
    speed: 0.5,
    needDestroy: false,
    prefixCls: defaultPrefixCls,
    limitTstProperty: false,
    showTimingFunction: '',
    hideTimingFunction: '',
    timingFunction: 'ease',
  }

  timer: number|undefined = undefined;

  status: string|undefined;

  constructor(props: FadeProps) {
    super(props);
    const isElementShow = this.getIsElementShow(props.show || false);
    const transitionClass = isElementShow ? (
      props.show ? classMap.show : classMap.hide
    ) : classMap.hide;
    this.state = {
      isElementShow,
      transitionClass,
    };
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  componentDidUpdate(prevProps: FadeProps) {
    if (prevProps.show !== this.props.show) {
      clearTimeout(this.timer);
      if (this.props.show) {
        this.status = FadeStatusMap.showing;
        this.setState({
          isElementShow: true,
          transitionClass: classMap.hide,
        }, () => {
          this.timer = window.setTimeout(() => {
            this.setState({
              transitionClass: classMap.show,
            });
          }, 50);
        })
      } else {
        this.status = FadeStatusMap.hiding;
        this.setState({
          transitionClass: classMap.hide,
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

  handleTransitionEnd() {
    const {
      onShow,
      onHide,
      onChange,
      needDestroy,
    } = this.props;

    if (this.status) {
      let isShow = false;
      if (this.status === FadeStatusMap.hiding) {
        typeof onHide === 'function' && onHide();
        this.setState({
          isElementShow: !needDestroy,
        });
      }
      if (this.status === FadeStatusMap.showing) {
        isShow = true;
        typeof onShow === 'function' && onShow();
      }
      typeof onChange === 'function' && onChange(isShow);
      this.status = undefined;
    }
  }

  render() {
    const {
      show,
      children: propsChildren,
      speed,
      delay,
      needDestroy,
      limitTstProperty,
      timingFunction,
      showTimingFunction,
      hideTimingFunction,
      prefixCls = defaultPrefixCls,
      className,
      style,
      onShow,
      onHide,
      onChange,
      onTransitionEnd,
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
            transitionProperty: limitTstProperty ? 'opacity' : undefined,
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
            `${prefixCls}-fade`,
            transitionClass.replace(replaceTag, prefixCls),
          ),
        },
      }
    }
    return null;
  }
}

export default Fade;