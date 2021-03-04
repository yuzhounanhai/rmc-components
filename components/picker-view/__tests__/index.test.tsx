import React from 'react';
import {
  act,
} from 'react-dom/test-utils';
import baseTest from '../../../tests/common/baseTest';
import {
  sleep,
} from '../../../tests/common/utils';
import PickerView from '../index';
import CustomSwiper from '../swiper';
import { Swiper as BaseSwiper } from 'swiper';
import { Swiper as BaseReactSwiper } from 'swiper/react';
import { mount, shallow } from 'enzyme';
import { defaultPrefixCls } from '../../_config/dict';

const dataWithoutCascade = [
  [
    {
      key: 'a1',
      value: 'a1',
    },
    {
      key: 'a2',
      value: 'a2',
    },
    {
      key: 'a3',
      value: 'a3',
    },
  ],
  [
    {
      key: 'b1',
      value: 'b1',
    },
    {
      key: 'b2',
      value: 'b2',
    },
  ],
];

const dataCascade = [
  {
    key: 'a',
    value: 'a',
    children: [
      {
        key: 'a1',
        value: 'a1',
      },
      {
        key: 'a2',
        value: 'a2',
      },
    ],
  },
  {
    key: 'b',
    value: 'b',
    children: [
      {
        key: 'b1',
        value: 'b1',
      },
      {
        key: 'b2',
        value: 'b2',
      },
      {
        key: 'b3',
        value: 'b3',
      }
    ],
  }
]

const sw = new BaseSwiper(document.body);

describe('PickerView', () => {
  baseTest(
    <PickerView
      data={dataCascade}
    />
  );

  baseTest(
    <PickerView
      data={dataCascade}
      defaultValue={['b', 'b2']}
    />
  );

  baseTest(
    <PickerView
      data={dataCascade}
      defaultShowCount={8}
    />
  );

  baseTest(
    <PickerView
      data={dataCascade}
      minCols={3}
    />
  );

  baseTest(
    <PickerView
      data={dataWithoutCascade}
      onChange={jest.fn()}
    />
  );

  it('should render CustomSwiper after document is ready.', async () => {
    const e = new Event('readystatechange');
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get() { return "loading"; }
    });
    const wrapper1 = mount(
      <CustomSwiper
        className="wrapper"
      >
        <div>content</div>
      </CustomSwiper>
    );
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get() { return "interactive"; }
    });
    act(() => {
      document.dispatchEvent(e);
    });
    expect(wrapper1.find('.wrapper').getDOMNode()).toBe(null);
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get() { return "complete"; }
    });
    act(() => {
      document.dispatchEvent(e);
    });
    wrapper1.update();
    expect(wrapper1.find('.wrapper').at(0).getDOMNode()).not.toBe(null);
    wrapper1.unmount();
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get() { return "loading"; }
    });
    const wrapper2 = mount(
      <CustomSwiper>
        <div>content</div>
      </CustomSwiper>
    );
    wrapper2.unmount();
    // 重置为complete状态
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get() { return "complete"; }
    });
  });

  it('CustomSwiper should trigger events callback correctly.', () => {
    const onInitCb = jest.fn();
    const onSlideChangeCb = jest.fn();
    const wrapper = shallow(
      <CustomSwiper
        onInit={onInitCb}
        onSlideChange={onSlideChangeCb}
      >
        <div>content</div>
      </CustomSwiper>
    );
    expect(onInitCb).not.toHaveBeenCalled();
    wrapper.find(BaseReactSwiper).invoke('onSlideChange')(sw);
    expect(onSlideChangeCb).not.toHaveBeenCalled();
    wrapper.find(BaseReactSwiper).invoke('onInit')(sw);
    expect(onInitCb).toHaveBeenCalled();
    wrapper.find(BaseReactSwiper).invoke('onSlideChange')(sw);
    expect(onSlideChangeCb).toHaveBeenCalled();
  });

  it('should not throw any error or warning when "data" is undefined.', () => {
    expect(() => {
      mount(
        <PickerView />
      );
    }).not.toThrow();
  });

  it('should render correct when PickerView use cascade data.', () => {
    const wrapper = mount(
      <PickerView
        data={dataCascade}
      />
    );
    expect(wrapper.find(`.${defaultPrefixCls}-picker-view-col`)).toHaveLength(2);
    expect(wrapper.find(`.${defaultPrefixCls}-picker-view-col`).at(0).find('.swiper-slide')).toHaveLength(2);
    [
      'a',
      'b',
    ].forEach((rightValue, idx) => {
      expect(wrapper.find(`.${defaultPrefixCls}-picker-view-col`).at(0).find('.swiper-slide').at(idx).text()).toBe(rightValue);
    });
    expect(wrapper.find(`.${defaultPrefixCls}-picker-view-col`).at(1).find('.swiper-slide')).toHaveLength(2);
    [
      'a1',
      'a2',
    ].forEach((rightValue, idx) => {
      expect(wrapper.find(`.${defaultPrefixCls}-picker-view-col`).at(1).find('.swiper-slide').at(idx).text()).toBe(rightValue);
    });
    expect(wrapper.find(CustomSwiper).at(0).prop('initialSlide')).toBe(0);
    expect(wrapper.find(CustomSwiper).at(1).prop('initialSlide')).toBe(0);
    const wrapper1 = mount(
      <PickerView
        data={dataCascade}
        defaultValue={['b']}
      />
    );
    expect(wrapper1.find(`.${defaultPrefixCls}-picker-view-col`)).toHaveLength(2);
    expect(wrapper1.find(`.${defaultPrefixCls}-picker-view-col`).at(0).find('.swiper-slide')).toHaveLength(2);
    [
      'a',
      'b',
    ].forEach((rightValue, idx) => {
      expect(wrapper1.find(`.${defaultPrefixCls}-picker-view-col`).at(0).find('.swiper-slide').at(idx).text()).toBe(rightValue);
    });
    expect(wrapper1.find(`.${defaultPrefixCls}-picker-view-col`).at(1).find('.swiper-slide')).toHaveLength(3);
    [
      'b1',
      'b2',
      'b3',
    ].forEach((rightValue, idx) => {
      expect(wrapper1.find(`.${defaultPrefixCls}-picker-view-col`).at(1).find('.swiper-slide').at(idx).text()).toBe(rightValue);
    });
    expect(wrapper1.find(CustomSwiper).at(0).prop('initialSlide')).toBe(1);
    expect(wrapper1.find(CustomSwiper).at(1).prop('initialSlide')).toBe(0);
  });

  it('should render correct when PickerView is not use cascade data.', () => {
    const wrapper = mount(
      <PickerView
        data={dataWithoutCascade}
      />
    );
    expect(wrapper.find(`.${defaultPrefixCls}-picker-view-col`)).toHaveLength(2);
    expect(wrapper.find(`.${defaultPrefixCls}-picker-view-col`).at(0).find('.swiper-slide')).toHaveLength(3);
    [
      'a1',
      'a2',
      'a3'
    ].forEach((rightValue, idx) => {
      expect(wrapper.find(`.${defaultPrefixCls}-picker-view-col`).at(0).find('.swiper-slide').at(idx).text()).toBe(rightValue);
    });
    expect(wrapper.find(`.${defaultPrefixCls}-picker-view-col`).at(1).find('.swiper-slide')).toHaveLength(2);
    [
      'b1',
      'b2',
    ].forEach((rightValue, idx) => {
      expect(wrapper.find(`.${defaultPrefixCls}-picker-view-col`).at(1).find('.swiper-slide').at(idx).text()).toBe(rightValue);
    });
    expect(wrapper.find(CustomSwiper).at(0).prop('initialSlide')).toBe(0);
    expect(wrapper.find(CustomSwiper).at(1).prop('initialSlide')).toBe(0);
    const wrapper1 = mount(
      <PickerView
        data={dataWithoutCascade}
        defaultValue={['a3', 'b2']}
      />
    );
    expect(wrapper1.find(CustomSwiper).at(0).prop('initialSlide')).toBe(2);
    expect(wrapper1.find(CustomSwiper).at(1).prop('initialSlide')).toBe(1);
  });

  it('should handle error select key when at initialize.', () => {
    const wrapper1 = mount(
      <PickerView
        data={dataCascade}
        defaultValue={[undefined, 'b2']}
      />
    );
    expect(wrapper1.find(CustomSwiper).at(0).prop('initialSlide')).toBe(0);
    expect(wrapper1.find(CustomSwiper).at(1).prop('initialSlide')).toBe(0);
    const wrapper2 = mount(
      <PickerView
        data={dataCascade}
        defaultValue={['b', 'a2']}
      />
    );
    expect(wrapper2.find(CustomSwiper).at(0).prop('initialSlide')).toBe(1);
    expect(wrapper2.find(CustomSwiper).at(1).prop('initialSlide')).toBe(0);
    const wrapper3 = mount(
      <PickerView
        data={dataWithoutCascade}
        defaultValue={['b2', 'b4']}
      />
    );
    expect(wrapper3.find(CustomSwiper).at(0).prop('initialSlide')).toBe(0);
    expect(wrapper3.find(CustomSwiper).at(1).prop('initialSlide')).toBe(0);
  });

  it('should change correctly when "onSlideChange" is triggered and the swiper is use cascade data.', () => {
    let k = undefined;
    const onChangeCb = jest.fn();
    const wrapper1 = mount(
      <PickerView
        data={dataCascade}
        defaultValue={['a', 'a2']}
        onChange={(v) => {
          k = v;
          onChangeCb();
        }}
      />
    );
    act(() => {
      wrapper1.find(CustomSwiper).at(0).invoke('onSlideChange')({
        ...sw,
        activeIndex: 1,
      });
    });
    expect(onChangeCb).toHaveBeenCalledTimes(1);
    ['b', 'b1'].forEach((item, idx) => {
      expect(item).toBe(k[idx]);
    });
  });

  it('should change correctly when "onSlideChange" is triggered and the swiper is not use cascade data.', () => {
    let k = undefined;
    const onChangeCb = jest.fn();
    const wrapper1 = mount(
      <PickerView
        data={dataWithoutCascade}
        defaultValue={['a3', 'b2']}
        onChange={(v) => {
          k = v;
          onChangeCb();
        }}
      />
    );
    act(() => {
      wrapper1.find(CustomSwiper).at(0).invoke('onSlideChange')({
        ...sw,
        activeIndex: 1,
      });
    });
    expect(onChangeCb).toHaveBeenCalledTimes(1);
    ['a2', 'b2'].forEach((item, idx) => {
      expect(item).toBe(k[idx]);
    });
  });
});