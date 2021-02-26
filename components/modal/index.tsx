import React from 'react';
import ReactDOM from 'react-dom';
import PortalFactory, {
  contentRenderFn,
} from '../portal-factory/index';
import BaseModal, {
  QuickModalProps,
  ModalProps,
} from './modal';

export type { QuickModalProps, ModalProps } from './modal';

export type ModalType = typeof BaseModal & {
  info: (config?: QuickModalProps) => void,
  confirm: (config?: QuickModalProps) => void,
  showCustom: (config?: QuickModalProps) => void,
};

const Modal: ModalType = (props: ModalProps) => {
  return ReactDOM.createPortal(
    <BaseModal
      {...props}
    />,
    document.body,
  );
};

// Feature 是否存在更好的实现方式，如Symbol
const closeFnCallFlag = '@@__symbols__fromCloseFn_';

const renderModal: contentRenderFn = (props: QuickModalProps, update, destroy) => {
  const {
    content,
    children,
    onOk,
    onHide,
    onCancel,
    ...restProps
  } = props;
  const isInClosing = !!props[closeFnCallFlag];
  delete restProps[closeFnCallFlag];
  const close = () => {
    if (isInClosing) {
      return;
    }
    const newProps = {
      ...props,
      [closeFnCallFlag]: true,
      visible: false,
    };
    update(newProps);
  };
  const onHideFn = () => {
    typeof onHide === 'function' && onHide();
    // 判断是否由close方法引发的onHide
    // onShow/onHide 是由 Fade 组件提供的, Fade 组件判断
    // 在transitionend时触发何种回调,是根据内部的status
    // 变量进行判断的。快速方法没有暴露任何操作show参数、
    // 更新组件props的方法，因此 onHide 回调只能是关闭引发的
    // if (isInClosing) {
    // }
    destroy();
  };
  const onOkFn = () => {
    typeof onOk === 'function'
        ? onOk(close)
        : close();
  }
  const onCancelFn = () => {
    typeof onCancel === 'function'
        ? onCancel(close)
        : close();
  }
  return (
    <BaseModal
      {...restProps}
      onHide={onHideFn}
      onOk={onOkFn}
      onCancel={onCancelFn}

    >
      {content || children}
    </BaseModal>
  );
};

Modal.info = function(config) {
  const modalProps = {
    confirmable: false,
    cancelText: '确定',
    ...config
  };
  const pf = PortalFactory(renderModal);
  pf.render(modalProps);
};

Modal.confirm = function(config) {
  const modalProps = {
    ...config
  };
  const pf = PortalFactory(renderModal);
  pf.render(modalProps);
}

Modal.showCustom = function(config) {
  const modalProps = {
    maskClosable: true,
    customStructure: true,
    ...config
  };
  const pf = PortalFactory(renderModal);
  pf.render(modalProps);
}

export default Modal;
