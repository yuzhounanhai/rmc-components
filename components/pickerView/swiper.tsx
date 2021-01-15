import React, {
  useEffect,
  useRef, useState,
} from 'react';
import { Swiper as BaseSwiper } from 'swiper';
import { Swiper as BaseReactSwiper } from 'swiper/react';

interface packedSwiperProps extends BaseReactSwiper {
  onInit?: (swiper: BaseSwiper) => any;
  onSlideChange?: (swiper: BaseSwiper) => any;
};

export default (props: packedSwiperProps) => {
  const {
    onInit,
    onSlideChange,
    ...otherProps
  } = props;
  const [isReady, setIsReady] = useState(document.readyState === 'complete');
  // 设置initialSlide会在onInit之前调用onSlideChange方法
  // 因此该组件为了正确响应onSlideChange事件(即阻止设置初始值的onSlideChange事件)
  const isInit = useRef(false);
  useEffect(() => {
    if (!isReady) {
      function cb() {
        if (document.readyState === 'complete') {
          setIsReady(true);
        }
      }
      document.addEventListener('readystatechange', cb);
      return () => {
        document.removeEventListener('readystatechange', cb);
      }
    }
  }, []);
  if (!isReady) {
    return null;
  }
  return (
    <BaseReactSwiper
      {...otherProps}
      onInit={(...param) => {
        isInit.current = true;
        typeof onInit === 'function' && onInit(...param);
      }}
      onSlideChange={(...param) => {
        if (isInit.current) {
          typeof onSlideChange === 'function' && onSlideChange(...param);
        }
      }}
    >
    </BaseReactSwiper>
  )
};
