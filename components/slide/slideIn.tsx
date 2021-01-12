import React, { useEffect, useRef, useState } from 'react';
import Slide, {
  SlideProps,
} from'./index';

export default (props: SlideProps) => {
  const {
    show = true,
  } = props;
  const [isFirst, setIsFirst] = useState(true);
  const timer = useRef<number|undefined>();
  useEffect(() => {
    if (show) {
      timer.current = window.setTimeout(() => {
        setIsFirst(false);
      }, 0);
      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }
  }, []);
  return (
    <Slide
      {...props}
      show={isFirst ? false : show}
    />
  );
};
