import React from 'react';
import ReactDOM from 'react-dom';
import PortalFactory, {
  contentRenderFn,
} from '@/portalFactory/index';
import BaseDrawer, {
  QuickDrawerProps,
  DrawerProps,
} from './drawer';

// Feature 是否存在更好的实现方式，如Symbol
const closeFnCallFlag = '@@__symbols__fromCloseFn_';

const renderDrawer: contentRenderFn = (props: QuickDrawerProps, update, destroy) => {
  const {
    content,
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

  const onCancelFn = (...customParam: any[]) => {
    typeof onCancel === 'function'
        ? onCancel(close, ...customParam)
        : close();
  };

  const onHideFn = () => {
    typeof onHide === 'function' && onHide();
    if (isInClosing) {
      destroy();
    }
  };

  return (
    <BaseDrawer
      {...restProps}
      onCancel={onCancelFn}
      onHide={onHideFn}
    >
      {content}
    </BaseDrawer>
  )
};

export type DrawerType = typeof BaseDrawer & {
  createDrawer: (config: QuickDrawerProps) => void,
};

const Drawer: DrawerType = (props: DrawerProps) => {
  return ReactDOM.createPortal(
    <BaseDrawer
      {...props}
    />,
    document.body,
  );
};

Drawer.createDrawer = (config) => {
  const props = {
    ...(config || {}),
  };
  const pf = PortalFactory(renderDrawer);
  pf.render(props);
};

export default Drawer;
