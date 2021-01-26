import { defaultPrefixCls } from '../_config/dict';
import React from 'react';
import { CommonSkeletenProps } from './base';
import Avatar, { AvatarSkeletonProps } from './avatar';
import Title, { TitleSkeletonProps } from './title';
import Paragraph, { ParagraphSkeletonProps } from './paragraph';

export interface ArticleSkeletonProps extends CommonSkeletenProps {
  avatar?: boolean;
  title?: boolean;
  paragraph?: boolean;
  avatarConfig?: AvatarSkeletonProps;
  titleConfig?: TitleSkeletonProps;
  paragraphConfig?: ParagraphSkeletonProps;
}

export default (props: ArticleSkeletonProps) => {
  const {
    prefixCls = defaultPrefixCls,
    active,
    avatar,
    paragraph = true,
    title,
    avatarConfig,
    paragraphConfig,
    titleConfig,
    ...restProps
  } = props;
  return (
    <div className={`${prefixCls}-skeleton-article`} {...restProps}>
      {
        avatar && (
          <div className={`${prefixCls}-skeleton-l`}>
            <Avatar
              {...avatarConfig}
              active={active}
              prefixCls={prefixCls}
            />
          </div>
        )
      }
      {
        (title || paragraph) && (
          <div className={`${prefixCls}-skeleton-r`}>
            {
              title && (
                <Title
                  {...titleConfig}
                  active={active}
                  prefixCls={prefixCls}
                />
              )
            }
            {
              paragraph && (
                <Paragraph
                  {...paragraphConfig}
                  active={active}
                  prefixCls={prefixCls}
                />
              )
            }
          </div>
        )
      }
    </div>
  )
}