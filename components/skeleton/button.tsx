import React from 'react';
import cn from 'classnames';
import {
  CommonSkeletenProps,
  mergeClassNames,
} from './base';
import { defaultPrefixCls } from '@/_config/dict';

export interface ButtonSkeletonProps extends CommonSkeletenProps {
  width?: string;
  height?: string;
  shape?: 'smooth' | 'round' | 'default';
};

export default (props: ButtonSkeletonProps) => {
  const {
    prefixCls = defaultPrefixCls,
    className,
    style,
    width,
    height,
    shape = 'default',
    active = false,
    ...restProps
  } = props;
  return (
    <div
      {...restProps}
      className={mergeClassNames(
        cn(`${prefixCls}-skeleton-button`, className),
        {
          active,
          shape,
        },
        prefixCls,
      )}
      style={{
        width: width || undefined,
        height: height || undefined,
        ...(style || {}),
      }}
    />
  );
};