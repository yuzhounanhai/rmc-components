import React from 'react';
import cn from 'classnames';
import {
  CommonSkeletenProps,
  mergeClassNames,
} from './base';
import PictureOutlined from '@ant-design/icons/PictureOutlined';
import { defaultPrefixCls } from '@/_config/dict';

export interface ImageSkeletonProps extends CommonSkeletenProps {
  width?: string;
  height?: string;
  icon?: boolean;
  shape?: 'circle' | 'smooth' | 'default';
};

export default (props: ImageSkeletonProps) => {
  const {
    prefixCls = defaultPrefixCls,
    className,
    style,
    width,
    height,
    shape = 'default',
    icon = true,
    active = false,
    ...restProps
  } = props;
  return (
    <div
      {...restProps}
      className={mergeClassNames(
        cn(`${prefixCls}-skeleton-image`, className),
        {
          active,
          shape,
        },
        prefixCls,
      )}
      style={{
        width: width || undefined,
        height: height || undefined,
        fontSize: width || undefined,
        ...(style || {}),
      }}
    >
      {
        !!icon && (
          <PictureOutlined />
        )
      }
    </div>
  );
};