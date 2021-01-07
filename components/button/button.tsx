import * as React from 'react';
import cn from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { defaultPrefixCls } from '@/_config/dict';

export type ButtonType = 'default' | 'primary' | 'link' | 'text' | 'warning';

export type ShapeType = 'round' | 'circle';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: ButtonType;
  loading?: boolean;
  prefixCls?: string;
  shape?: ShapeType;
  onClick?: React.MouseEventHandler<HTMLElement>;
  rootDom?: keyof React.ReactHTML;
  [key: string]: any;
};

export default (props: ButtonProps) => {
  const {
    className,
    children,
    disabled,
    icon,
    type = "default",
    loading,
    prefixCls = defaultPrefixCls,
    shape,
    onClick,
    rootDom = 'a',
    ...restProps
  } = props;
  const iconDom: React.ReactNode = loading ? <LoadingOutlined /> : icon;
  return React.createElement(
    rootDom,
    {
      ...(rootDom === 'a' ? { role: 'button' } : {}),
      className: cn(`${prefixCls}-button`, {
        [`${prefixCls}-button-primary`]: type === 'primary',
        [`${prefixCls}-button-warning`]: type === 'warning',
        [`${prefixCls}-button-disabled`]: disabled,
        [`${prefixCls}-button-loading`]: loading,
        [`${prefixCls}-button-text`]: type === 'text',
        [`${prefixCls}-button-link`]: type === 'link',
        [`${prefixCls}-button-circle`]: shape === 'circle',
        [`${prefixCls}-button-round`]: shape === 'round',
      }, className),
      ...restProps,
      onClick: (disabled || loading) ? undefined : onClick,
    },
    !!iconDom && (
      <div className={`${prefixCls}-icon`}>
        {iconDom}
      </div>
    ),
    children && (
      <div className={`${prefixCls}-button-children`}>
        {children}
      </div>
    ),
  );
};
