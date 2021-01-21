import React from 'react';
import cn from 'classnames';
import {
  CommonSkeletenProps,
  mergeClassNames,
} from './base';
import { defaultPrefixCls } from '@/_config/dict';

export interface ElementSkeletonProps extends CommonSkeletenProps {
  element?: keyof React.ReactHTML;
  display?: string;
};

export default (props: ElementSkeletonProps) => {
  const {
    prefixCls = defaultPrefixCls,
    className,
    style,
    display,
    element = 'div',
    active = false,
    ...restProps
  } = props;
  const ElementType = element;
  return (
    <ElementType
      {...restProps}
      className={mergeClassNames(
        cn(`${prefixCls}-skeleton-element`, className),
        {
          active,
        },
        prefixCls,
      )}
      style={{
        ...(style || {}),
        display: display || undefined,
      }}
    />
  );
};