import React from 'react';
import { act } from 'react-dom/test-utils';
import baseTest from '../../../tests/common/baseTest';
import {
  sleep,
} from '../../../tests/common/utils';
import Slide from '../index';
import { mount } from 'enzyme';

describe('Slide', () => {
  baseTest(
    <Slide>
      <div className="wrapper">content</div>
    </Slide>
  );
  baseTest(
    <Slide
      direction="up"
    >
      <div className="wrapper">content</div>
    </Slide>
  );
  baseTest(
    <Slide
      direction="→"
    >
      <div className="wrapper">content</div>
    </Slide>
  );
  baseTest(
    <Slide
      direction="←"
      limitTstProperty
    >
      <div className="wrapper">content</div>
    </Slide>
  );
  baseTest(
    <Slide
      direction="right"
      opacityTst={false}
    >
      <div className="wrapper">content</div>
    </Slide>
  );
  baseTest(
    <Slide.slideIn
      direction="left"
    >
      <div className="wrapper">content</div>
    </Slide.slideIn>
  );
  baseTest(
    <Slide
      show={false}
      needDestroy
    >
      <div className="wrapper">content</div>
    </Slide>
  );
  it('should trigger correct events when transitionend event dispatch', async () => {
    const transitionEndCb = jest.fn();
    const onShowCb = jest.fn();
    const onHideCb = jest.fn();
    const onChangeCb = jest.fn();
    const wrapper = mount(
      <Slide
        show={false}
        onTransitionEnd={transitionEndCb}
        onHide={onHideCb}
        onShow={onShowCb}
        onChange={onChangeCb}
      >
        <div>content</div>
      </Slide>
    );
    wrapper.simulate('transitionend');
    expect(transitionEndCb).toBeCalled();
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
    expect(onHideCb).toBeCalledTimes(0);
    expect(onShowCb).toBeCalled();
    expect(onChangeCb).toBeCalledTimes(1);
    wrapper.setProps({
      show: false,
    });
    wrapper.update();
    wrapper.simulate('transitionend');
    expect(transitionEndCb).toBeCalledTimes(3);
    expect(onHideCb).toBeCalledTimes(1);
    expect(onShowCb).toBeCalledTimes(1);
    expect(onChangeCb).toBeCalledTimes(2);
  });

  it('<SlideIn /> should trigger onShow callback when props "show" is true', async () => {
    const onShowCb = jest.fn();
    const onHideCb = jest.fn();
    const wrapper1 = mount(
      <Slide.slideIn
        show
        onShow={onShowCb}
      >
        <div className="inner-content">content</div>
      </Slide.slideIn>
    );
    await act(async () => {
      await sleep(100);
      wrapper1.update();
    });
    wrapper1.find(Slide).simulate('transitionend');
    expect(onShowCb).toBeCalled();
    const wrapper2 = mount(
      <Slide.slideIn
        show={false}
        onHide={onHideCb}
      >
        <div className="inner-content">content</div>
      </Slide.slideIn>
    );
    await act(async () => {
      await sleep(100);
      wrapper2.update();
    });
    wrapper2.find(Slide).simulate('transitionend');
    expect(onHideCb).not.toBeCalled();
  });

  it('should not render DOM when needDestroy to be TRUE', async () => {
    const wrapper1 = mount(
      <Slide
        show={false}
        needDestroy
      >
        <div className="wrapper1">content</div>
      </Slide>
    );
    expect(wrapper1.find('.wrapper')).toHaveLength(0);
    const wrapper2 = mount(
      <Slide
        show={false}
      >
        <div className="wrapper">content</div>
      </Slide>
    );
    expect(wrapper2.find('.wrapper')).toHaveLength(1);
    const wrapper3 = mount(
      <Slide
        needDestroy
      >
        <div className="wrapper">content</div>
      </Slide>
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
      <Slide
        timingFunction="linear"
        showTimingFunction="ease-out"
        hideTimingFunction="ease-in"
      >
        <div className="wrapper">content</div>
      </Slide>
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
      <Slide
        timingFunction="linear"
        hideTimingFunction="ease-in"
      >
        <div className="wrapper">content</div>
      </Slide>
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
      <Slide
        timingFunction="linear"
        showTimingFunction="ease-in"
      >
        <div className="wrapper">content</div>
      </Slide>
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
  });

  it('should add correct transition-property.', () => {
    const wrapper = mount(
      <Slide
        limitTstProperty
      >
        <div className="wrapper">content</div>
      </Slide>
    );
    expect((wrapper.find('.wrapper').getDOMNode() as HTMLElement).style.transitionProperty).toBe('transform,opacity');
    wrapper.setProps({
      limitTstProperty: false,
    });
    wrapper.update();
    expect((wrapper.find('.wrapper').getDOMNode() as HTMLElement).style.transitionProperty).toBe('');
    wrapper.setProps({
      limitTstProperty: true,
      opacityTst: false,
    });
    wrapper.update();
    expect((wrapper.find('.wrapper').getDOMNode() as HTMLElement).style.transitionProperty).toBe('transform');
  });

  it('should add correct transition-delay and transition-duration when given speed and delay props', () => {
    const wrapper = mount(
      <Slide
        speed={1}
        delay={0.5}
      >
        <div className="wrapper">content</div>
      </Slide>
    );
    expect((wrapper.find('.wrapper').getDOMNode() as HTMLElement).style.transitionDuration).toBe('1s');
    expect((wrapper.find('.wrapper').getDOMNode() as HTMLElement).style.transitionDelay).toBe('0.5s');
  });
});