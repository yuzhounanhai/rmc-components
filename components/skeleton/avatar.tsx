import React from 'react';
import cn from 'classnames';
import {
  CommonSkeletenProps,
  mergeClassNames,
} from './base';
import { defaultPrefixCls } from '../_config/dict';

export interface AvatarSkeletonProps extends CommonSkeletenProps {
  size?: string;
};

export default (props: AvatarSkeletonProps) => {
  const {
    prefixCls = defaultPrefixCls,
    className,
    style,
    size,
    active = false,
    ...restProps
  } = props;
  return (
    <div
      {...restProps}
      className={mergeClassNames(
        cn(`${prefixCls}-skeleton-avatar`, className),
        {
          active,
        },
        prefixCls,
      )}
      style={{
        width: size || undefined,
        height: size || undefined,
        ...(style || {}),
      }}
    />
  );
};