import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import cn from 'classnames';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import { isDef } from '../_util/index';
import useUpdateEffect from '../_hook/useUpdateEffect/index';
import { defaultPrefixCls } from '../_config/dict';

export interface InputProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  prefixCls?: string;
  placeholder?: string;
  className?: string;
  clear?: boolean;
  type?: string;
  addonAfter?: React.ReactNode;
  addonBefore?: React.ReactNode;
  disabled?: boolean;
  onHandleSelectionPos?: (currentValue: string, startPos: number | null, endPos: number | null) => { start?: number | null, end?: number | null }
  [key: string]: any;
}

type InputSelectionObj = {
  start?: number | null;
  end?: number | null;
};

export interface InputRef {
  handlePosition(): void;
  focus(): void;
  blur(): void;
  select(): void;
};

function InputItem(props: InputProps, ref: React.Ref<InputRef>) {
  const {
    defaultValue,
    onChange,
    maxLength = Infinity,
    prefixCls = defaultPrefixCls,
    placeholder,
    className,
    clear,
    type,
    addonAfter,
    addonBefore,
    disabled,
    onHandleSelectionPos,
    ...restProps
  } = props;
  const [value, setValue] = useState(props.value || defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const selectionRef: React.MutableRefObject<InputSelectionObj | null> = useRef(null);

  useUpdateEffect(() => {
    if (props.value !== undefined && props.value !== value) {
      setValue(props.value || '');
    }
  }, [props.value, value]);
  
  const handlePosition = () => {
    if (selectionRef.current) {
      try {
        if (inputRef.current) {
          inputRef.current.selectionStart = selectionRef.current.start || null;
          inputRef.current.selectionEnd = selectionRef.current.end || null;
        }
      } catch (e) {}
    }
  }
  
  const focus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const blur = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const select = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  useEffect(() => {
    handlePosition();
  }, [value]);

  useImperativeHandle(ref, () => ({
    handlePosition,
    focus,
    blur,
    select,
  }));
  
  const onRealChangeValue = (v: string) => {
    if (disabled) {
      return;
    }
    if (value !== undefined) {
      setValue(v);
    }
    if (typeof onChange === 'function') {
      onChange(v);
    }
  };
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const elValue = el.value;
    // 如果当前值已经达到最大值,继续输入超过最大值的值,return掉
    if (value.length >= maxLength && elValue.length >= maxLength) {
      return;
    }
    let currentValue = elValue;
    if (maxLength !== Infinity) {
      currentValue = currentValue.slice(0, maxLength);
    }
    try {
      const inputSelection: InputSelectionObj = {};
      inputSelection.start = el.selectionStart;
      inputSelection.end = el.selectionEnd;
      if (elValue.length > maxLength) {
        if (inputSelection.start && inputSelection.start > maxLength + 1) {
          inputSelection.start = maxLength + 1;
        }
        if (inputSelection.end && inputSelection.end > maxLength + 1) {
          inputSelection.end = maxLength + 1;
        }
      }
      if (typeof onHandleSelectionPos === 'function') {
        const {
          start,
          end,
        } = onHandleSelectionPos(currentValue, inputSelection.start, inputSelection.end);
        if (isDef(start) && isDef(end)) {
          inputSelection.start = start;
          inputSelection.end = end;
        }
      }
      selectionRef.current = inputSelection;
    } catch (e) {}
    if (elValue.length > maxLength) {
      setTimeout(() => {
        handlePosition();
      });
    }
    if (currentValue !== value) {
      onRealChangeValue(currentValue);
    }
  }
  
  const onClearValue = () => {
    onRealChangeValue('');
  }
  const needRenderClearIcon = clear && !disabled && value;
  const hasAddOnBefore = !!addonBefore;
  const hasAddOnAfter = needRenderClearIcon || !!addonAfter;
  let inputType = 'text';
  let patternProps;
  if (type === 'phone') {
    inputType = 'tel';
  } else if (type === 'digit') {
    inputType = 'number';
    patternProps = {
      pattern: '[0-9]*',
    };
  } else if (type) {
    inputType = type;
  }
  return (
    <div
      className={cn(`${prefixCls}-input`, className)}
    >
      {
        hasAddOnBefore && (
          <div className={cn(`${prefixCls}-input-addons`)}>
            {addonBefore}
          </div>
        )
      }
      <div
        className={cn(`${prefixCls}-input-container`)}
      >
        <input
          {...patternProps}
          {...restProps}
          ref={inputRef}
          value={value}
          type={inputType}
          onChange={onChangeValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={disabled}
        />
      </div>
      {
        hasAddOnAfter && (
          <div className={cn(`${prefixCls}-input-addons`)}>
            {
              needRenderClearIcon && (
                <CloseCircleFilled
                  className={`${prefixCls}-input-icon`}
                  onClick={onClearValue}
                />
              )
            }
            {addonAfter}
          </div>
        )
      }
    </div>
  )
};

export default forwardRef<any, InputProps>(InputItem) as React.FC<InputProps>;
