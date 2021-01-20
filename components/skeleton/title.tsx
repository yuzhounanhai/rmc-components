import React from 'react';
import cn from 'classnames';
import {
  CommonSkeletenProps,
  mergeClassNames,
} from './base';
import { defaultPrefixCls } from '@/_config/dict';

export interface TitleSkeletonProps extends CommonSkeletenProps {
  width?: string;
  height?: string;
};

export default (props: TitleSkeletonProps) => {
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
    <h3
      {...restProps}
      className={mergeClassNames(
        cn(`${prefixCls}-skeleton-title`, className),
        {
          active,
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