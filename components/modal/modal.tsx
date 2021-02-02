import React from 'react';
import cn from 'classnames';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import FadeIn from '../fade/fadeIn';
import { defaultPrefixCls } from '../_config/dict';

export interface ModalCommonProps {
  className?: string;
  visible?: boolean;
  width?: string,
  mask?: boolean;
  maskClosable?: boolean;
  confirmable?: boolean;
  customStructure?: boolean;
  confirmCareful?: boolean;
  title?: React.ReactNode;
  cancelText?: React.ReactNode;
  closeCorner?: boolean;
  footer?: React.ReactNode;
  okText?: React.ReactNode;
  hideDestroy?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export interface ModalProps extends ModalCommonProps {
  onCancel?: (e: React.MouseEvent) => void;
  onOk?: () => void;
  children?: React.ReactNode;
  [key: string]: any;
};

export interface QuickModalProps extends ModalCommonProps {
  onCancel?: (close: () => void) => void;
  onOk?: (close: () => void) => void;
  content?: React.ReactNode;
  [key: string]: any;
};

function Modal(props: ModalProps) {
  const {
    className,
    width,
    visible = true,
    mask = true,
    maskClosable = false,
    confirmCareful = false,
    closeCorner = false,
    confirmable = true,
    hideDestroy = true,
    okText = '确定',
    cancelText = '取消',
    title,
    footer,
    customStructure,
    children,
    prefixCls = defaultPrefixCls,
    onOk,
    onCancel,
    onShow,
    onHide,
    ...restProps
  } = props;

  const onClickMask = (e: React.MouseEvent) => {
    if (maskClosable) {
      typeof onCancel === 'function' && onCancel(e);
    }
  };

  const renderFooter = () => {
    if (footer === null) {
      return null;
    }
    const okBtn = (
      <div
        className={`${prefixCls}-modal-button ${prefixCls}-modal-ok`}
        onClick={onOk}
      >
        {okText}
      </div>
    );
    const cancelBtn = (
      <div
        className={`${prefixCls}-modal-button ${prefixCls}-modal-cancel`}
        onClick={onCancel}
      >
        {cancelText}
      </div>
    )
    return (
      <div className={`${prefixCls}-modal-footer`}>
        {
          footer || (
            confirmCareful ? (
              <>
                {Boolean(confirmable) && okBtn}
                {cancelBtn}
              </>
            ) : (
              <>
                {cancelBtn}
                {Boolean(confirmable) && okBtn}
              </>
            )
          )
        }
      </div>
    )
  };

  const renderedCloseCorner = () => {
    if (closeCorner) {
      return (
        <div className={`${prefixCls}-modal-corner-close`} onClick={onCancel}>
          <CloseOutlined />
        </div>
      )
    }
    return null;
  }

  return (
    <FadeIn
      show={visible}
      needDestroy={hideDestroy}
      limitTstProperty
      onShow={onShow}
      onHide={onHide}
    >
      <div
        className={cn(`${prefixCls}-modal`, className)}
        {...restProps}
      >
        {
          !!mask && (
            <div
              className={`${prefixCls}-modal-mask`}
              onClick={onClickMask}
            />
          )
        }
        {
          customStructure ? (
            <div className={`${prefixCls}-modal-custom-content`}>
              {typeof children === 'function' ? children(onOk, onCancel) : children}
              {renderedCloseCorner()}
            </div>
          ) : (
            <div
              className={cn(`${prefixCls}-modal-content`, {
                [`${prefixCls}-modal-content-no-title`]: !title
              })}
              style={width ? {
                width,
              } : undefined}
            >
              {
                !!title && (
                  <div className={`${prefixCls}-modal-header`}>
                    {title}
                  </div>
                )
              }
              <div className={`${prefixCls}-modal-body`}>
                {children}
              </div>
              {renderFooter()}
              {renderedCloseCorner()}
            </div>
          )
        }
      </div>
    </FadeIn>
  )
}

export default Modal;
