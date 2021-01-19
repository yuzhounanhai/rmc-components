import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import useUpdateEffect from '@/_hook/useUpdateEffect/index';
import BaseInput, {
  InputItemProps,
  InputRef,
} from './input';

// 输入带空格分隔的手机号表单组件
// 如果手机号不需要空格分隔，请直接使用Input组件
// 在特殊黏贴场景下有一定问题

export interface PhoneInputRef extends InputRef {};

export interface PhoneInputProps extends InputItemProps {};

function formatPhoneNumber(realValue = '') {
  const arr = [];
  for (let i = 0; i < realValue.length; i++) {
    if (i === 3 || i === 7) {
      arr.push(' ');
    }
    arr.push(realValue[i]);
  }
  return arr.join('');
}

function PhoneInputItem(props: PhoneInputProps, ref: React.Ref<PhoneInputRef>) {
  const {
    value,
    defaultValue,
    maxLength: noUsedMaxLength,
    ...restProps
  } = props;
  const maxLength = 11;
  const [v, setV] = useState(value || defaultValue || '');
  const componentRef = useRef<InputRef>({
    handlePosition: () => {},
    focus: () => {},
    blur: () => {},
    select: () => {},
  });
  useUpdateEffect(() => {
    if (props.value !== undefined && value !== v) {
      setV(value || '');
    }
  }, [value, v]);
  const onRealChangeValue = (realValue: string) => {
    if (props.disabled) {
      return;
    }
    if (value === undefined) {
      console.log(realValue, 'set');
      setV(realValue);
    }
    if (typeof props.onChange === 'function') {
      props.onChange(realValue);
    }
  };
  const onHandlePosWhileChange = (newValue: string, startPos: number | null, endPos: number | null) => {
    let newRealValue = newValue.replace(/[^0-9]/g, '');
    let start = startPos;
    let end = endPos;
    if (startPos && endPos && newRealValue.length >= v.length) {
      let newValidValue = newValue.slice(0, startPos).replace(/[^0-9]/g, '');
      if (newValidValue.length === 4) {
        start = 5;
        end = 5;
      } else if (newValidValue.length === 8) {
        start = 10;
        end = 10;
      }
    }
    return {
      start,
      end,
    };
  };
  const handleChange = (newV: string) => {
    let newValue = newV.replace(/[^0-9]/g, '');
    if (newValue.length > maxLength) {
      return;
    }
    if (newValue !== v) {
      console.log(newValue, v);
      onRealChangeValue(newValue);
    } else {
      if (componentRef.current) {
        setTimeout(() => {
          if (componentRef.current) {
            componentRef.current.handlePosition();
          } 
        });
      }
    }
  }
  useImperativeHandle(ref, () => ({
    ...(componentRef.current || {}),
  }));
  return (
    <BaseInput
      {...restProps}
      type="tel"
      ref={componentRef}
      value={formatPhoneNumber(v)}
      onHandleSelectionPos={onHandlePosWhileChange}
      onChange={handleChange}
    />
  );
}

export default forwardRef<any, PhoneInputProps>(PhoneInputItem) as React.FC<PhoneInputProps>;