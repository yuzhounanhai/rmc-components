import React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import CheckOutlined from '@ant-design/icons/lib/icons/CheckOutlined'
import { mount } from 'enzyme';
import FadeIn from '../../fade/fadeIn';
import baseTest from '../../../tests/common/baseTest';
import Toast from '..';
import BaseToast from '../toast';
import { sleep } from '../../../tests/common/utils';
import baseReactDOMTest, { $$ } from '../../../tests/common/baseReactDOMTest';
import { defaultPrefixCls } from '../../_config/dict';

describe('Toast', () => {
  baseReactDOMTest();

  baseTest(
    <BaseToast
      content="content"
    />
  );

  baseTest(
    <BaseToast
      content="content"
      smooth
    />
  );

  baseTest(
    <BaseToast
      content="content"
      round
    />
  );

  baseTest(
    <BaseToast
      content="content"
      at="top"
    />
  );

  baseTest(
    <BaseToast
      content="content"
      at="bottom"
    />
  );

  baseTest(
    <BaseToast
      content="content"
      icon={(
        <CheckOutlined />
      )}
    />
  );

  it('onHide callback should trigger when Toast is hide', async () => {
    const onHideCb = jest.fn();
    const wrapper = mount(
      <Toast
        content="content"
        onHide={onHideCb}
      />
    );
    await act(async () => {
      await sleep(50);
      wrapper.update();
    });
    wrapper.find(FadeIn).simulate('transitionend');
    await act(async () => {
      await sleep(3000);
      wrapper.update();
    });
    expect(wrapper.find(FadeIn).prop('show')).toBeFalsy();
    wrapper.find(FadeIn).simulate('transitionend');
    expect(onHideCb).toBeCalled();
  });

  it('"duration" prop should control the Toast components time of show.', async () => {
    const onHideCb = jest.fn();
    const wrapper = mount(
      <Toast
        content="content"
        onHide={onHideCb}
        duration={3000}
      />
    );
    await act(async () => {
      await sleep(50);
      wrapper.update();
    });
    wrapper.find(FadeIn).simulate('transitionend');
    await act(async () => {
      await sleep(2000);
      wrapper.update();
    });
    expect(wrapper.find(FadeIn).prop('show')).toBeTruthy();
    await act(async () => {
      await sleep(1000);
      wrapper.update();
    });
    expect(wrapper.find(FadeIn).prop('show')).toBeFalsy();
    expect(onHideCb).not.toBeCalled();
    wrapper.find(FadeIn).simulate('transitionend');
    expect(onHideCb).toBeCalled();
  });

  it('"transitionSpeed" props need give to <FadeIn/>', () => {
    const speed = 1;
    const wrapper = mount(
      <Toast
        content="content"
        transitionSpeed={speed}
      />
    );
    expect(wrapper.find(FadeIn).prop('speed')).toBe(speed);
  });

  it('quick function to create Toast should be defined.', () => {
    expect(Toast.info).toBeDefined();
    expect(Toast.loading).toBeDefined();
    expect(Toast.delayLoading).toBeDefined();
    expect(Toast.fail).toBeDefined();
    expect(Toast.success).toBeDefined();
    expect(Toast.hide).toBeDefined();
  });

  it('Call "Toast.hide" should not throw any warning or error whether Toast exist or not.', async () => {
    expect(() => {
      Toast.hide();
    }).not.toThrow();
    Toast.info('content');
    expect(() => {
      Toast.hide();
    }).not.toThrow();
    Toast.delayLoading(1000);
    expect(() => {
      Toast.hide();
    }).not.toThrow();
    Toast.delayLoading(100);
    await act(async () => {
      await sleep(200);
    });
    Toast.hide();
  });

  it('should not throw any warning or error when call quick function one by one.', () => {
    expect(() => {
      Toast.success('content');
      Toast.success({
        content: 'content',
      });
      Toast.delayLoading();
      Toast.fail('content');
      Toast.fail({
        content: 'content',
      });
    }).not.toThrow();
  });

  it('should destory Toast which created by quick function when "onHide" has been triggered.', async () => {
    const onHideCb = jest.fn();
    Toast.info({
      content: 'content',
      onHide: onHideCb,
      duration: 200,
      className: 'test-toast'
    });
    await act(async () => {
      await sleep(50);
    });
    expect($$('.test-toast')).not.toBeNull();
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    await act(async () => {
      await sleep(500);
    });
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    await sleep(50);
    expect(onHideCb).toHaveBeenCalledTimes(1);
    expect($$('.test-toast')).toBeNull();
  });

  it('should clear timeout when component will unmount after "onShowCb" has been triggered.', async () => {
    const wrapper = mount(
      <Toast
        content="content"
        duration={3000}
      />
    );
    const wrapper1 = mount(
      <Toast
        content="content"
        duration={0}
      />
    );
    await act(async () => {
      await sleep(50);
      wrapper.update();
      wrapper1.update();
    });
    wrapper.find(FadeIn).simulate('transitionend');
    wrapper1.find(FadeIn).simulate('transitionend');
    expect(() => {
      wrapper.unmount()
    }).not.toThrow();
    expect(() => {
      wrapper1.unmount()
    }).not.toThrow();
  });
});