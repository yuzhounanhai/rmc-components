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
    timer.current = window.setTimeout(() => {
      setIsFirst(false);
      timer.current = undefined;
    }, 0);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);
  return (
    <Fade
      {...props}
      show={isFirst ? false : show}
    />
  );
};
