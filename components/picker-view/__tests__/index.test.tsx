import React from 'react';
import baseTest from '../../../tests/common/baseTest';
import PickerView from '../index';
import CustomSwiper from '../swiper';
import { mount } from 'enzyme';
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
});