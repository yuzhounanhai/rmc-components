import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import FadeIn from '@/fade/fadeIn';
import cn from 'classnames';
import { defaultPrefixCls } from '@/_config/dict';

export interface ToastProps {
  className?: string;
  prefixCls?: string;
  onHide?: () => void;
  round?: boolean;
  smooth?: boolean;
  duration?: number;
  transitionSpeed?: number;
  at?: 'top' | 'bottom' | 'center';
  icon?: React.ReactNode;
  content?: React.ReactNode;
};

export default (props: ToastProps) => {
  const {
    prefixCls = defaultPrefixCls,
    className,
    round,
    smooth = true,
    duration = 2000,
    icon,
    at = 'center',
    transitionSpeed,
    content,
    onHide,
  } = props;
  
  const [isShow, setIsShow] = useState(true);
  const timer = useRef<number>();

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    }
  }, []);

  const doHide = () => {
    setIsShow(false);
  };

  const onShowCb = () => {
    if (duration !== 0) {
      timer.current = window.setTimeout(() => {
        doHide();
      }, duration);
    }
  };

  return (
    <div
      className={cn(`${prefixCls}-toast`, {
        [`${prefixCls}-toast-at-top`]: at === 'top',
        [`${prefixCls}-toast-at-bottom`]: at === 'bottom',
      }, className)}
    >
      <FadeIn
        show={isShow}
        onHide={onHide}
        onShow={onShowCb}
        speed={transitionSpeed}
      >
        <div
          className={cn(`${prefixCls}-toast-content`, {
            [`${prefixCls}-toast-round`]: round,
            [`${prefixCls}-toast-smooth`]: smooth,
            [`${prefixCls}-toast-has-icon`]: !!icon,
          })}
        >
          {icon}
          <div className={`${prefixCls}-toast-text`}>
            {content}
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
