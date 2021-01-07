import { useCallback, useRef, useState } from 'react';

export default (defaultValue: any) => {
  const [, setValue] = useState(defaultValue || false);
  const valueRef = useRef(defaultValue || false);
  const realSetValue = useCallback((valueOrFunc: any) => {
    if (typeof valueOrFunc === 'function') {
      valueRef.current = valueOrFunc(valueRef.current);
    } else {
      valueRef.current = valueOrFunc;
    }
    setValue(valueOrFunc);
  }, []);
  return [valueRef, realSetValue];
};