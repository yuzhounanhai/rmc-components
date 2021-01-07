import { useEffect, useRef } from 'react';

export default (effect: React.EffectCallback, deps?: React.DependencyList) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}