import Article from './article';
import Avatar from './avatar';
import Button from './button';
import ElementSkeleton from './element';
import Title from './title';
import ImageSkeleton from './image';
import Paragraph from './paragraph';

export type { ArticleSkeletonProps } from './article';
export type { AvatarSkeletonProps } from './avatar';
export type { ButtonSkeletonProps } from './button';
export type { ElementSkeletonProps } from './element';
export type { ImageSkeletonProps } from './image';
export type { ParagraphSkeletonProps } from './paragraph';
export type { TitleSkeletonProps } from './title';

type SkeletonType = typeof Article & {
  Article: typeof Article;
  Avatar: typeof Avatar;
  Button: typeof Button;
  Element: typeof ElementSkeleton;
  Image: typeof ImageSkeleton;
  Title: typeof Title;
  Paragraph: typeof Paragraph;
};

const Skeleton: SkeletonType = Article as SkeletonType;

Skeleton.Article = Article;
Skeleton.Avatar = Avatar;
Skeleton.Button = Button;
Skeleton.Element = ElementSkeleton;
Skeleton.Image = ImageSkeleton;
Skeleton.Title = Title;
Skeleton.Paragraph = Paragraph;

export default Skeleton;
