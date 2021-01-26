import React from 'react'
import ReactDOM from 'react-dom';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import CloseCircle from '../_icon/CloseCircle/index';
import CheckCircle from '../_icon/CheckCircle/index';
import PortalFactory, {
  contentRenderFn,
  RenderFuncUtils,
} from '../portalFactory/index';
import BaseToast, {
  ToastProps,
} from '../toast/toast';
import { defaultPrefixCls } from '../_config/dict';

let currentToast: RenderFuncUtils | null = null;
let timer: number | null = null;

const renderFn: contentRenderFn = (props: ToastProps, _, destroy) => {
  const {
    onHide: originOnHide,
    ...restProps
  } = props;
  const onHideCb = () => {
    typeof originOnHide === 'function' && originOnHide();
    destroy();
  }
  return (
    <BaseToast
      {...restProps}
      onHide={onHideCb}
    />
  );
};

const destroyCurrentToast = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (currentToast) {
    currentToast.destroy();
  }
};

const drawToast = (config: ToastProps) => {
  destroyCurrentToast();
  const pf = PortalFactory(renderFn);
  currentToast = pf;
  pf.render(config);
};

export type ToastType = typeof BaseToast & {
  info: (configOrContent?: ToastProps | string) => void,
  loading: (config?: ToastProps) => void;
  fail: (configOrContent?: ToastProps | string) => void;
  success: (configOrContent?: ToastProps | string) => void;
  hide: () => void;
  delayLoading: (delay?: number, config?: ToastProps) => void;
};

const Toast: ToastType = (props: ToastProps) => (
  ReactDOM.createPortal(
    <BaseToast
      {...props}
    />,
    document.body
  )
);

Toast.info = (configOrContent) => {
  const props = typeof configOrContent === 'object' ? {
    ...(configOrContent || {})
  } : {};
  if (typeof configOrContent === 'string') {
    props.content = configOrContent;
  }
  drawToast(props);
};

Toast.loading = (config) => {
  const prefixCls = config?.prefixCls || defaultPrefixCls;
  const props = {
    icon: (
      <LoadingOutlined
        className={`${prefixCls}-toast-icon`}
      />
    ),
    duration: 0,
    content: '加载中...',
    ...(config || {}),
  };
  drawToast(props);
};

Toast.delayLoading = (delay, config) => {
  let delayTime = delay || 500;
  timer = window.setTimeout(() => {
    Toast.loading(config);
    timer = null;
  }, delayTime);
};

Toast.fail = (configOrContent) => {
  const prefixCls = typeof configOrContent === 'object' ? (
    configOrContent?.prefixCls || defaultPrefixCls
  ) : defaultPrefixCls;
  let props: ToastProps = {
    icon: (
      <CloseCircle
        className={`${prefixCls}-toast-icon`}
      />
    ),
  }
  if (typeof configOrContent === 'object') {
    props = {
      ...props,
      ...(configOrContent || {}),
    };
  }
  if (typeof configOrContent === 'string') {
    props.content = configOrContent;
  }
  drawToast(props);
};

Toast.success = (configOrContent) => {
  const prefixCls = typeof configOrContent === 'object' ? (
    configOrContent?.prefixCls || defaultPrefixCls
  ) : defaultPrefixCls;
  let props: ToastProps = {
    icon: (
      <CheckCircle
        className={`${prefixCls}-toast-icon`}
      />
    ),
  }
  if (typeof configOrContent === 'object') {
    props = {
      ...props,
      ...(configOrContent || {}),
    };
  }
  if (typeof configOrContent === 'string') {
    props.content = configOrContent;
  }
  drawToast(props);
};

Toast.hide = () => {
  destroyCurrentToast();
};

export default Toast;