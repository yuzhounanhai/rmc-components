import { useCallback, useRef, useState } from 'react';

export default <T>(defaultValue: T): [React.MutableRefObject<T>, (value: T) => void | ((cb: (v: T) => T) => void)] => {
  const [, setValue] = useState<T>(defaultValue);
  const valueRef = useRef<T>(defaultValue);
  const realSetValue = useCallback(
    (
      valueOrFunc: ((v: T) => T) | T
    ) => {
      if (typeof valueOrFunc === 'function') {
        valueRef.current = (valueOrFunc as ((v: T) => T))(valueRef.current);
      } else {
        valueRef.current = valueOrFunc;
      }
      setValue(valueOrFunc);
    },
    []
  );
  return [valueRef, realSetValue];
};