import React, { forwardRef, useState } from 'react';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { defaultPrefixCls } from '../_config/dict';
import BaseInput, { InputProps, InputRef } from './input';

export interface PasswordInputProps extends InputProps {
  pwdVisible?: boolean;
};

export interface PasswordInputRef extends InputRef {};

function PasswordInputItem(props: PasswordInputProps, ref: React.Ref<PasswordInputRef>) {
  const {
    type,
    pwdVisible = true,
    prefixCls = defaultPrefixCls,
    addonAfter,
    ...restProps
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const inputType = isVisible ? 'text' : 'password';
  const onChangeVisible = () => {
    setIsVisible(!isVisible);
  }
  const realAddonAfter = pwdVisible ? (
    <React.Fragment>
      {
        isVisible ? (
          <EyeOutlined
            className={`${prefixCls}-input-icon`}
            onClick={onChangeVisible}
          />
        ) : (
          <EyeInvisibleOutlined
            className={`${prefixCls}-input-icon`}
            onClick={onChangeVisible}
          />
        )
      }
      {addonAfter && addonAfter}
    </React.Fragment>
  ) : addonAfter;
  return (
    <BaseInput
      {...restProps}
      type={inputType}
      ref={ref}
      addonAfter={realAddonAfter}
    />
  );
};

export default forwardRef<any, PasswordInputProps>(PasswordInputItem) as React.FC<PasswordInputProps>;