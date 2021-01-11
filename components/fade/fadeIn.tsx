import React, { useEffect, useRef, useState } from 'react';
import Fade, {
  FadeProps,
} from'./index';

export default (props: FadeProps) => {
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
    <Fade
      {...props}
      show={isFirst ? false : show}
    />
  );
};
