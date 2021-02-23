import React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import BaseDrawer from '../drawer';
import Drawer from '..';
import { mount } from 'enzyme';
import FadeIn from '../../fade/fadeIn';
import SlideIn from '../../slide/slideIn';
import baseTest from '../../../tests/common/baseTest';
import { sleep } from '../../../tests/common/utils';
import baseReactDOMTest, { $$ } from '../../../tests/common/baseReactDOMTest';
import { defaultPrefixCls } from '../../_config/dict';

describe('Drawer', () => {
  baseReactDOMTest();

  baseTest(
    <BaseDrawer>
      <div>content</div>
    </BaseDrawer>
  );

  baseTest(
    <BaseDrawer
      direction="↓"
    >
      <div>content</div>
    </BaseDrawer>
  );

  baseTest(
    <BaseDrawer
      onShow={jest.fn()}
      onHide={jest.fn()}
      onCancel={jest.fn()}
      visible={false}
    >
      <div>content</div>
    </BaseDrawer>
  );

  baseTest(
    <BaseDrawer
      onCancel={jest.fn()}
      visible
    >
      {
        (onTriggerCancel) => (
          <div
            onClick={onTriggerCancel}
          >
            close
          </div>
        )
      }
    </BaseDrawer>
  );

  it('should trigger onShow/onHide callback when <Drawer /> visible status changed', async () => {
    const onHideCb = jest.fn();
    const onShowCb = jest.fn();
    const wrapper = mount(
      <Drawer
        onShow={onShowCb}
        onHide={onHideCb}
        visible={false}
      >
        <div>content</div>
      </Drawer>
    );
    await act(async () => {
      await sleep(100);
      wrapper.update();
    });
    expect(onShowCb).not.toBeCalled();
    expect(onHideCb).not.toBeCalled();
    wrapper.setProps({
      visible: true,
    });
    wrapper.update();
    wrapper.find(SlideIn).simulate('transitionend');
    wrapper.find(FadeIn).simulate('transitionend');
    await sleep(50);
    expect(onShowCb).toBeCalledTimes(1);
    expect(onHideCb).toBeCalledTimes(0);
    wrapper.setProps({
      visible: false,
    });
    wrapper.update();
    wrapper.find(SlideIn).simulate('transitionend');
    wrapper.find(FadeIn).simulate('transitionend');
    await sleep(50);
    expect(onShowCb).toBeCalledTimes(1);
    expect(onHideCb).toBeCalledTimes(1);
    const wrapper1 = mount(
      <Drawer
        mask={false}
        visible={false}
        onShow={onShowCb}
        onHide={onHideCb}
      >
        <div>content</div>
      </Drawer>
    );
    await act(async () => {
      await sleep(100);
      wrapper1.update();
    });
    wrapper1.setProps({
      visible: true,
    });
    wrapper1.update();
    wrapper1.find(SlideIn).simulate('transitionend');
    await sleep(50);
    expect(onShowCb).toBeCalledTimes(2);
    expect(onHideCb).toBeCalledTimes(1);
    wrapper1.setProps({
      visible: false,
    });
    wrapper1.update();
    wrapper1.find(SlideIn).simulate('transitionend');
    await sleep(50);
    expect(onShowCb).toBeCalledTimes(2);
    expect(onHideCb).toBeCalledTimes(2);
  });

  it('should call onCancel when trigger close action.', async () => {
    const onCancelCb = jest.fn();
    const wrapper = mount(
      <Drawer
        onCancel={onCancelCb}
        maskClosable
        prefixCls="rc"
      >
        {
          (onTriggerClose) => (
            <div
              className="btn-close"
              onClick={onTriggerClose}
            >
              close
            </div>
          )
        }
      </Drawer>
    );
    await act(async () => {
      await sleep(100);
      wrapper.update();
    });
    wrapper.find('.rc-drawer-mask').simulate('click');
    expect(onCancelCb).toBeCalledTimes(1);
    wrapper.find('.btn-close').simulate('click');
    expect(onCancelCb).toBeCalledTimes(2);
    wrapper.setProps({
      maskClosable: false,
    });
    wrapper.update();
    wrapper.find('.rc-drawer-mask').simulate('click');
    expect(onCancelCb).toBeCalledTimes(2);
  });

  it('should not render mask when mask set FALSE.', async () => {
    const wrapper = mount(
      <Drawer
        mask={false}
        prefixCls="rc"
      >
        <div>content</div>
      </Drawer>
    );
    expect(wrapper.find('.rc-drawer.mask')).toHaveLength(0);
  });

  it('Drawer.createDrawer should be defined', () => {
    expect(Drawer.createDrawer).toBeDefined();
  });

  it('Drawer should run correctly whick created by "createDrawer" without "onCancel" parameter.', async () => {
    const onHideCb = jest.fn();
    Drawer.createDrawer({
      content: 'content',
      onHide: onHideCb,
      className: 'test-drawer',
    });
    expect($$('.test-drawer')).not.toBeNull();
    await act(async () => {
      await sleep(50);
    });
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    Simulate.click($$(`.${defaultPrefixCls}-drawer-mask`));
    expect(onHideCb).not.toBeCalled();
    await act(async () => {
      await sleep(10);
    });
    expect(() => {
      Simulate.click($$(`.${defaultPrefixCls}-drawer-mask`));
    }).not.toThrow();
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    expect(onHideCb).toBeCalled();
    expect($$('.test-drawer')).toBeNull();
  });

  it('Drawer should run correctly whick created by "createDrawer" with "onCancel" parameter.', async () => {
    const onHideCb = jest.fn();
    const onCancelCb = jest.fn();
    Drawer.createDrawer({
      content: 'content',
      onHide: onHideCb,
      onCancel: (close) => {
        close();
        onCancelCb();
      },
      className: 'test-drawer',
    });
    expect($$('.test-drawer')).not.toBeNull();
    await act(async () => {
      await sleep(50);
    });
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    Simulate.click($$(`.${defaultPrefixCls}-drawer-mask`));
    expect(onCancelCb).toBeCalled();
    expect(onHideCb).not.toBeCalled();
    await act(async () => {
      await sleep(10);
    });
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    expect(onHideCb).toBeCalled();
    expect($$('.test-drawer')).toBeNull();
  });
});