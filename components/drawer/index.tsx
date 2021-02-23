import React from 'react';
import ReactDOM from 'react-dom';
import PortalFactory, {
  contentRenderFn,
} from '../portal-factory/index';
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
    // 可以通过控制 show 参数来触发 onHide 回调，下面的
    // 这个判断本意是区分是由内部的关闭函数引发的还是show
    // 参数的改变引发的，但是这个方法中并没有暴露出修改props
    // 的接口, 因此可以去掉这个判断.
    // if (isInClosing) {
    // }
    destroy();
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
    ...config,
  };
  const pf = PortalFactory(renderDrawer);
  pf.render(props);
};

export default Drawer;
