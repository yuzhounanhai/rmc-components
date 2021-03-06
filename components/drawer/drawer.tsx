import React, { useRef } from 'react';
import cn from 'classnames';
import FadeIn from '../fade/fadeIn';
import SlideIn from '../slide/slideIn';
import { defaultPrefixCls } from '../_config/dict';

export type Directions = 'up' | 'down' | '↑' | '↓';

export interface DrawerCommonProps {
  prefixCls?: string;
  className?: string;
  maskClosable?: boolean;
  direction?: Directions;
  visible?: boolean;
  mask?: boolean;
  onHide?: () => void;
  onShow?: () => void;
};

type CancelFn = (...customParams: any[]) => void;

export interface DrawerProps extends DrawerCommonProps {
  children?: React.ReactNode | ((onCancel: CancelFn) => React.ReactNode);
  onCancel?: CancelFn;
  [key: string]: any;
};

export interface QuickDrawerProps extends DrawerCommonProps {
  content?: React.ReactNode | ((onCancel: CancelFn) => React.ReactNode);
  onCancel?: (close: () => void, ...customParams: any[]) => void;
  [key: string]: any;
};

function Drawer(props: DrawerProps) {
  const {
    prefixCls = defaultPrefixCls,
    className,
    maskClosable = true,
    visible = true,
    children,
    direction = 'up',
    onCancel,
    onHide,
    onShow,
    mask = true,
    ...restProps
  } = props;

  const maskShowRef = useRef(false);
  const contentEnterRef = useRef(false);

  const handleStatusChange = () => {
    if ((!mask || maskShowRef.current) && contentEnterRef.current) {
      typeof onShow === 'function' && onShow();
    }
    if ((!mask || !maskShowRef.current) && !contentEnterRef.current) {
      typeof onHide === 'function' && onHide();
    }
  };

  let standardDirection = 'up';
  if (direction === '↓') {
    standardDirection = 'down';
  }

  const onTriggerClose = (...customParams: any[]) => {
    typeof onCancel === 'function' && onCancel(...customParams);
  };

  return (
    <div
      className={cn(`${prefixCls}-drawer`, className)}
    >
      {
        !!mask && (
          <FadeIn
            show={visible}
            onShow={() => {
              maskShowRef.current = true;
              handleStatusChange();
            }}
            onHide={() => {
              maskShowRef.current = false;
              handleStatusChange();
            }}
          >
            <div
              className={`${prefixCls}-drawer-mask`}
              onClick={maskClosable ? () => {
                onTriggerClose();
              } : undefined}
            />
          </FadeIn>
        )
      }
      <SlideIn
        direction={direction}
        show={visible}
        onShow={() => {
          contentEnterRef.current = true;
          handleStatusChange();
        }}
        onHide={() => {
          contentEnterRef.current = false;
          handleStatusChange();
        }}
      >
        <div
          className={cn(
            `${prefixCls}-drawer-content`,
            `${prefixCls}-drawer-d-${standardDirection}`,
          )}
        >
          <div className={`${prefixCls}-drawer-box`} {...restProps}>
            {
              typeof children === 'function' ? children(onTriggerClose) : children
            }
          </div>
        </div>
      </SlideIn>
    </div>
  );
}

export default Drawer;