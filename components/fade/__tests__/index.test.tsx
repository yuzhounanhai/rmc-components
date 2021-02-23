import React from 'react';
import { act } from 'react-dom/test-utils';
import baseTest from '../../../tests/common/baseTest';
import {
  sleep,
} from '../../../tests/common/utils';
import Fade from '../index';
import { mount } from 'enzyme';

describe('Fade', () => {
  baseTest(
    <Fade>
      <div>content</div>
    </Fade>
  );

  baseTest(
    <Fade.fadeIn>
      <div>content</div>
    </Fade.fadeIn>
  );

  baseTest(
    <Fade show={false}>
      <div>content</div>
    </Fade>
  );

  baseTest(
    <Fade.fadeIn show={false}>
      <div>content</div>
    </Fade.fadeIn>
  );

  baseTest(
    <Fade show prefixCls="test">
      <div>content</div>
    </Fade>
  );
  it('should trigger correct events when transitionend event dispatch', async () => {
    const transitionEndCb = jest.fn();
    const childrenTransitionendCb = jest.fn();
    const onHideCb = jest.fn();
    const onShowCb = jest.fn();
    const onChangeCb = jest.fn();
    const wrapper = mount(
      <Fade
        show={false}
        onTransitionEnd={transitionEndCb}
        onHide={onHideCb}
        onShow={onShowCb}
        onChange={onChangeCb}
      >
        <div
          className="inner-content"
          onTransitionEnd={childrenTransitionendCb}
        >
          content
        </div>
      </Fade>
    );
    wrapper.simulate('transitionend');
    expect(transitionEndCb).toBeCalled();
    expect(childrenTransitionendCb).toBeCalled();
    expect(onHideCb).not.toBeCalled();
    expect(onShowCb).not.toBeCalled();
    expect(onChangeCb).not.toBeCalled();
    wrapper.setProps({
      show: true,
    });
    wrapper.update();
    await sleep(50);
    wrapper.simulate('transitionend');
    expect(transitionEndCb).toBeCalledTimes(2);
    expect(childrenTransitionendCb).toBeCalledTimes(2);
    expect(onHideCb).toBeCalledTimes(0);
    expect(onShowCb).toBeCalled();
    expect(onChangeCb).toBeCalledTimes(1);
    wrapper.setProps({
      show: false,
    });
    wrapper.update();
    wrapper.simulate('transitionend');
    expect(transitionEndCb).toBeCalledTimes(3);
    expect(childrenTransitionendCb).toBeCalledTimes(3);
    expect(onHideCb).toBeCalledTimes(1);
    expect(onShowCb).toBeCalledTimes(1);
    expect(onChangeCb).toBeCalledTimes(2);
  });

  it('<FadeIn/> should trigger onShow callback when props "show" is true', async () => {
    const onShowCb = jest.fn();
    const onHideCb = jest.fn();
    const wrapper1 = mount(
      <Fade.fadeIn
        show
        onShow={onShowCb}
      >
        <div className="inner-content">content</div>
      </Fade.fadeIn>
    );
    await act(async () => {
      await sleep(100);
      wrapper1.update();
    });
    wrapper1.find(Fade).simulate('transitionend');
    expect(onShowCb).toBeCalled();
    const wrapper2 = mount(
      <Fade.fadeIn
        show={false}
        onHide={onHideCb}
      >
        <div className="inner-content">content</div>
      </Fade.fadeIn>
    );
    await act(async () => {
      await sleep(100);
      wrapper2.update();
    });
    wrapper2.find(Fade).simulate('transitionend');
    expect(onHideCb).not.toBeCalled();
  });

  it('should not render DOM when needDestroy to be TRUE', async () => {
    const wrapper1 = mount(
      <Fade
        show={false}
        needDestroy
      >
        <div className="wrapper1">content</div>
      </Fade>
    );
    expect(wrapper1.find('.wrapper')).toHaveLength(0);
    const wrapper2 = mount(
      <Fade
        show={false}
      >
        <div className="wrapper">content</div>
      </Fade>
    );
    expect(wrapper2.find('.wrapper')).toHaveLength(1);
    const wrapper3 = mount(
      <Fade
        needDestroy
      >
        <div className="wrapper">content</div>
      </Fade>
    );
    wrapper3.setProps({
      show: false,
    });
    wrapper3.update();
    await sleep(50);
    expect(wrapper3.find('.wrapper')).toHaveLength(0);
  });

  it('should add correct inline timingFunction style', () => {
    const wrapper1 = mount(
      <Fade
        timingFunction="linear"
        showTimingFunction="ease-out"
        hideTimingFunction="ease-in"
      >
        <div className="wrapper">content</div>
      </Fade>
    );
    wrapper1.setProps({
      show: false,
    });
    wrapper1.update();
    expect((wrapper1.find('.wrapper').getDOMNode() as HTMLElement).style.transitionTimingFunction).toBe('ease-in');
    wrapper1.setProps({
      show: true,
    });
    wrapper1.update();
    expect((wrapper1.find('.wrapper').getDOMNode() as HTMLElement).style.transitionTimingFunction).toBe('ease-out');
    const wrapper2 = mount(
      <Fade
        timingFunction="linear"
        hideTimingFunction="ease-in"
      >
        <div className="wrapper">content</div>
      </Fade>
    );
    wrapper2.setProps({
      show: false,
    });
    wrapper2.update();
    expect((wrapper2.find('.wrapper').getDOMNode() as HTMLElement).style.transitionTimingFunction).toBe('ease-in');
    wrapper2.setProps({
      show: true,
    });
    wrapper2.update();
    expect((wrapper2.find('.wrapper').getDOMNode() as HTMLElement).style.transitionTimingFunction).toBe('linear');
    const wrapper3 = mount(
      <Fade
        timingFunction="linear"
        showTimingFunction="ease-in"
      >
        <div className="wrapper">content</div>
      </Fade>
    );
    wrapper3.setProps({
      show: false,
    });
    wrapper3.update();
    expect((wrapper3.find('.wrapper').getDOMNode() as HTMLElement).style.transitionTimingFunction).toBe('linear');
    wrapper3.setProps({
      show: true,
    });
    wrapper3.update();
    expect((wrapper3.find('.wrapper').getDOMNode() as HTMLElement).style.transitionTimingFunction).toBe('ease-in');
    const wrapper4 = mount(
      <Fade
        timingFunction=""
        showTimingFunction=""
        hideTimingFunction=""
      >
        <div className="wrapper">content</div>
      </Fade>
    );
    wrapper4.setProps({
      show: false,
    });
    wrapper4.update();
    expect((wrapper4.find('.wrapper').getDOMNode() as HTMLElement).style.transitionTimingFunction).toBe('');
    wrapper4.setProps({
      show: true,
    });
    wrapper4.update();
    expect((wrapper4.find('.wrapper').getDOMNode() as HTMLElement).style.transitionTimingFunction).toBe('');
  });

  it('should add correct transition-property when limitTstProperty props to be TRUE', () => {
    const wrapper = mount(
      <Fade
        limitTstProperty
      >
        <div className="wrapper">content</div>
      </Fade>
    );
    expect((wrapper.find('.wrapper').getDOMNode() as HTMLElement).style.transitionProperty).toBe('opacity');
    wrapper.setProps({
      limitTstProperty: false,
    });
    wrapper.update();
    expect((wrapper.find('.wrapper').getDOMNode() as HTMLElement).style.transitionProperty).toBe('');
  });

  it('should add correct transition-delay and transition-duration when given speed and delay props', () => {
    const wrapper = mount(
      <Fade
        speed={1}
        delay={0.5}
      >
        <div className="wrapper">content</div>
      </Fade>
    );
    expect((wrapper.find('.wrapper').getDOMNode() as HTMLElement).style.transitionDuration).toBe('1s');
    expect((wrapper.find('.wrapper').getDOMNode() as HTMLElement).style.transitionDelay).toBe('0.5s');
  });

  it('should not throw any error or warning when destory a <FadeIn /> component.', async () => {
    const wrapper1 = mount(
      <Fade.fadeIn
        show
      >
        <div className="wrapper">content</div>
      </Fade.fadeIn>
    );
    const wrapper2 = mount(
      <Fade.fadeIn
        show
      >
        <div className="wrapper">content</div>
      </Fade.fadeIn>
    );
    expect(() => {
      wrapper1.unmount();
    }).not.toThrow();
    await act(async () => {
      await sleep(50);
    });
    expect(() => {
      wrapper2.unmount();
    }).not.toThrow();
  });
});