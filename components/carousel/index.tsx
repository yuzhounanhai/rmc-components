import React from 'react';
import cn from 'classnames';
import SwiperCore, { Virtual, Autoplay, Pagination } from 'swiper';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';
import { AutoplayOptions } from 'swiper/types/components/autoplay';
import { isDef } from '../_util/index';
import { defaultPrefixCls } from '../_config/dict';

SwiperCore.use([Virtual, Autoplay, Pagination]);

export interface CarouselProps {
  children?: React.ReactNode;
  className?: string;
  prefixCls?: string;
  autoplay?: AutoplayOptions | boolean;
  dots?: boolean;
  [key: string]: any;
};

export default (props: CarouselProps) => {
  const {
    children,
    className,
    autoplay,
    prefixCls = defaultPrefixCls,
    dots,
    ...restProps
  } = props;
  let autoplayConfig = autoplay;
  const packedChildren = React.Children.map(children, (child: React.ReactElement, i) => {
    const {
      key,
      type,
    } = child;
    // 如果元素有定义key值(一般使用时遍历场景更多),则使用这个key值,否则使用index
    const realKey = isDef(key) ? key : i;
    // 如果元素已经使用了SwiperSlide组件,整个复制并覆盖key值
    if (type === SwiperSlide) {
      return React.cloneElement(child, {
        key: realKey,
      })
    }
    // 其他的使用SwiperSlide包裹一下
    return (
      <SwiperSlide
        key={realKey}
      >
        {child}
      </SwiperSlide>
    )
  });
  if (typeof autoplay === 'boolean' && autoplay) {
    autoplayConfig = {
      disableOnInteraction: false,
    }
  } else if (autoplay && typeof autoplay === 'object') {
    autoplayConfig = {
      disableOnInteraction: false,
      ...(autoplay || {})
    }
  }
  return (
    <Swiper
      className={cn(
        `${prefixCls}-carousel`,
        className,
      )}
      autoHeight
      pagination={!!dots}
      autoplay={autoplayConfig}
      {...restProps}
    >
      {packedChildren}
    </Swiper>
  );
}