import { defaultPrefixCls } from '../_config/dict';
import cn from 'classnames';

export interface CommonSkeletenProps {
  active?: boolean;
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: any;
};

type mergeClassNameProps = {
  active?: boolean;
  shape?: string;
}
export function mergeClassNames(className: string, props: mergeClassNameProps, prefixCls = defaultPrefixCls) {
  const {
    shape = ''
  } = props;
  return cn(
    `${prefixCls}-skeleton`,
    {
      [`${prefixCls}-skeleton-active`]: props.active,
      [`${prefixCls}-skeleton-${shape}`]: shape,
    },
    className,
  );
}