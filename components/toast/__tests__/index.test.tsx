import React from 'react';
import { act } from 'react-dom/test-utils';
import CheckOutlined from '@ant-design/icons/lib/icons/CheckOutlined'
import { mount } from 'enzyme';
import FadeIn from '../../fade/fadeIn';
import baseTest from '../../../tests/common/baseTest';
import Toast from '..';
import BaseToast from '../toast';
import { sleep } from '../../../tests/common/utils';

describe('Toast', () => {
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

  it('Call "Toast.hide" should not throw any warning or error where Toast is not exist.', () => {
    expect(() => {
      Toast.hide();
    }).not.toThrow();
  });
});