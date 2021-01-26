import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import copy from 'copy-to-clipboard';
import cn from 'classnames';
import useRefState from '../_hook/useRefState/index';
import BaseInput, {
  InputRef,
} from '../input/input';
import { defaultPrefixCls } from '../_config/dict';

export interface GridPwdProps {
  prefixCls?: string;
  gridCount?: number;
  className?: string;
  type?: string;
  onFinished?: (v?: string, freeCb?: () => void) => void;
  onChange?: (v?: string) => void;
  [key: string]: any;
};

export interface GridPwdRef {
  reset(): void;
  resetAndFocus(): void;
};

function GridPwd(props: GridPwdProps, ref: React.Ref<GridPwdRef>) {
  const {
    prefixCls = defaultPrefixCls,
    gridCount = 6,
    type = "tel",
    className,
    onFinished,
    onChange,
    ...restProps
  } = props;

  const [lockRef, setIsLock] = useRefState(false);
  const [pwd, setPwd] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<InputRef>();

  const doFocusInput = () => {
    copy('')
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const doBlurInput = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const reset = () => {
    setPwd('');
  };

  const resetAndFocus = () => {
    reset();
    doFocusInput();
  };

  const onChangePwd = (v: string) => {
    if (lockRef.current) {
      return;
    }
    setPwd(v);
    typeof onChange === 'function' && onChange(v);
    if (v.length === gridCount) {
      if (typeof onFinished === 'function') {
        doBlurInput();
        setIsLock(true);
        function lockCb() {
          setIsLock(false);
        }
        onFinished(v, lockCb);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    reset,
    resetAndFocus,
  }));

  const renderGridItem = () => {
    const grids = [];
    const pwdLen = pwd.length;
    for (let i = 0; i < gridCount; i++) {
      grids.push((
        <div
          key={i}
          className={cn(`${prefixCls}-grid-pwd-item`, {
            [`${prefixCls}-grid-pwd-has-value`]: i < pwdLen,
            [`${prefixCls}-grid-pwd-next-grid`]: i === pwdLen,
          })}
        />
      ))
    }
    return grids;
  }

  return (
    <div
      className={cn(`${prefixCls}-grid-pwd`, className, {
        [`${prefixCls}-grid-pwd-focus`]: isFocus,
      })}
      {...restProps}
      onClick={doFocusInput}
    >
      {renderGridItem()}
      <div className={`${prefixCls}-grid-pwd-input`}>
        <BaseInput
          type={type}
          value={pwd}
          ref={inputRef}
          maxLength={gridCount}
          onChange={onChangePwd}
          disabled={lockRef.current}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          autoFocus={!lockRef.current}
          onPaste={(e: ClipboardEvent) => {
            e.stopPropagation();
            e.preventDefault();
            return false;
          }}
        />
      </div>
    </div>
  );
};

export default forwardRef<any, GridPwdProps>(GridPwd) as React.FC<GridPwdProps>;