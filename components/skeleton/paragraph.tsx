import React from 'react';
import cn from 'classnames';
import {
  CommonSkeletenProps,
  mergeClassNames,
} from './base';
import { defaultPrefixCls } from '../_config/dict';

export interface ParagraphSkeletonProps extends CommonSkeletenProps {
  width?: string | string[];
  height?: string;
  rows?: number;
};

export default (props: ParagraphSkeletonProps) => {
  const {
    prefixCls = defaultPrefixCls,
    className,
    width = '61%',
    height,
    rows = 3,
    active = false,
    ...restProps
  } = props;
  const renderRows = () => {
    const liList: React.ReactElement[] = [];
    for (let i = 0; i < rows; i++) {
      const isLastOne = i + 1 === rows;
      liList.push(
        <li
          className={mergeClassNames(
            `${prefixCls}-skeleton-p`,
            {
              active,
            },
            prefixCls,
          )}
          style={{
            width: Array.isArray(width) ? width[i] : (
              isLastOne ? width : undefined
            ),
            height: height || undefined,
          }}
          key={i}
        />
      )
    }
    return liList;
  }
  return (
    <ul
      className={cn(`${prefixCls}-skeleton-paragraph`, className)}
      {...restProps}
    >
      { renderRows() }
    </ul>
  );
};