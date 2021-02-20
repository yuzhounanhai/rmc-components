import React, {
  useState,
} from 'react';
import cn from 'classnames';
import useRefState from '../_hook/useRefState';
import Drawer from '../drawer/index';
import PickerView, {
  Key,
  PickerViewProps,
} from '../picker-view/index';
import { defaultPrefixCls } from '../_config/dict';

export interface PickerProps extends PickerViewProps {
  prefixCls?: string;
  cancelText?: React.ReactNode;
  okText?: React.ReactNode;
  title?: React.ReactNode;
  defaultValue?: Key[];
  onOk?: (value: Key[]) => void;
  onCancel?: (value: Key[]) => void;
  onCreatePop?: () => void;
  popClassName?: string;
  maskClosable?: boolean;
  children?: React.ReactNode | (
    (
      createDrawer: () => void,
      value: Key[],
      currentValue: Key[],
    ) => React.ReactNode
  );
};

export default (props: PickerProps) => {
  const {
    prefixCls = defaultPrefixCls,
    cancelText = '取消',
    okText = '确定',
    title,
    defaultValue = [],
    onOk,
    onCreatePop,
    popClassName,
    onCancel: onCancelCb,
    maskClosable,
    children,
    ...restProps
  } = props;
  // PickerView提交的实际值
  const [value, setValue] = useState(defaultValue);
  // PickerView的实时值
  const [currentValueRef, setCurrentValue] = useRefState<Key[]>(defaultValue);

  const createPop = () => {
    typeof onCreatePop === 'function' && onCreatePop();
    Drawer.createDrawer({
      maskClosable,
      className: cn(`${prefixCls}-picker-wrapper`, popClassName),
      content: (onCancel) => (
        <div className={`${prefixCls}-picker`}>
          <div className={`${prefixCls}-picker-control`}>
            <div
              className={`${prefixCls}-picker-cancel`}
              onClick={() => {
                onCancel();
              }}
            >
              {cancelText}
            </div>
            <div className={`${prefixCls}-picker-title`}>{title}</div>
            <div
              className={`${prefixCls}-picker-ok`}
              onClick={() => {
                onCancel(true);
              }}
            >
              {okText}
            </div>
          </div>
          <PickerView
            {...restProps}
            defaultValue={currentValueRef.current}
            onChange={(v) => {
              setCurrentValue(v);
            }}
          />
        </div>
      ),
      onCancel: (close, isConfirm: boolean) => {
        if (isConfirm) {
          const v = [...currentValueRef.current];
          setValue(v);
          typeof onOk === 'function' && onOk(v);
        } else {
          const v = [...value];
          setCurrentValue(v);
          typeof onCancelCb === 'function' && onCancelCb(v);
        }
        close();
      }
    });
  };

  if (typeof children === 'function') {
    return children(createPop, value, currentValueRef.current);
  } else if (children) {
    // 当接受到数组类型的子节点或者纯文本的节点时, 用一层div包裹, 并在包裹的div上
    if (typeof children === 'string' || Array.isArray(children)) {
      return (
        <div
          onClick={() => {
            createPop();
          }}
          className={`${prefixCls}-picker-trigger`}
        >
          {children}
        </div>
      )
    }
    return React.cloneElement(children as React.ReactElement, {
      onClick: (e: MouseEvent) => {
        createPop();
        const originOnClick = (children as React.ReactElement).props.onClick;
        typeof originOnClick === 'function' && originOnClick(e);
      },
    })
  }
  return null;
};