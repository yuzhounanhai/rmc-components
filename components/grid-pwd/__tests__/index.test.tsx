import React from 'react';
import baseTest from '../../../tests/common/baseTest';
import { mount } from 'enzyme';
import GridPwd, {
  GridPwdRef,
} from '../index';
import { defaultPrefixCls } from '../../_config/dict';
import BaseInput from '../../input/input';

describe('GridPwd', () => {
  baseTest(
    <GridPwd />
  );

  baseTest(
    <GridPwd
      gridCount={8}
    />
  );

  baseTest(
    <GridPwd
      onFinished={jest.fn()}
      onChange={jest.fn()}
    />
  );

  baseTest(
    <GridPwd
      type="text"
    />
  );

  it('should lock input when passed "onFinished" prop and the value has reaches the maximum input length.', () => {
    const onFinishedCb = jest.fn();
    const onChangeCb = jest.fn();
    const wrapper = mount(
      <GridPwd
        onFinished={onFinishedCb}
        onChange={onChangeCb}
      />
    );
    wrapper.find('input').simulate('change', {
      target: {
        value: '12345',
      },
    });
    expect(onFinishedCb).toHaveBeenCalledTimes(0);
    expect(onChangeCb).toHaveBeenCalledTimes(1);
    wrapper.find('input').simulate('change', {
      target: {
        value: '123456',
      },
    });
    expect(onFinishedCb).toHaveBeenCalledTimes(1);
    expect(onChangeCb).toHaveBeenCalledTimes(2);
    wrapper.find('input').simulate('change', {
      target: {
        value: '123457',
      },
    });
    expect(onFinishedCb).toHaveBeenCalledTimes(1);
    expect(onChangeCb).toHaveBeenCalledTimes(2);
    const onChangeCb1 = jest.fn();
    const wrapper1 = mount(
      <GridPwd
        onChange={onChangeCb1}
      />
    );
    wrapper1.find('input').simulate('change', {
      target: {
        value: '12345',
      },
    });
    expect(onChangeCb1).toHaveBeenCalledTimes(1);
    wrapper1.find('input').simulate('change', {
      target: {
        value: '123456',
      },
    });
    expect(onChangeCb1).toHaveBeenCalledTimes(2);
    wrapper1.find('input').simulate('change', {
      target: {
        value: '123457',
      },
    });
    expect(onChangeCb1).toHaveBeenCalledTimes(3);
  });

  it('The password length should be customized.', () => {
    const length = 8;
    const wrapper = mount(
      <GridPwd
        gridCount={length}
      />
    );
    expect(wrapper.find(`.${defaultPrefixCls}-grid-pwd-item`)).toHaveLength(length);
    expect(wrapper.find(BaseInput).prop('maxLength')).toBe(length);
  });

  it('should has correct class in different state.', () => {
    const wrapper = mount(
      <GridPwd />
    );
    expect(wrapper.find(`.${defaultPrefixCls}-grid-pwd-item`).at(0).hasClass(`${defaultPrefixCls}-grid-pwd-next-grid`)).toBeTruthy();
    wrapper.find('input').simulate('change', {
      target: {
        value: '1',
      },
    });
    expect(wrapper.find(`.${defaultPrefixCls}-grid-pwd-item`).at(0).hasClass(`${defaultPrefixCls}-grid-pwd-next-grid`)).toBeFalsy();
    expect(wrapper.find(`.${defaultPrefixCls}-grid-pwd-item`).at(0).hasClass(`${defaultPrefixCls}-grid-pwd-has-value`)).toBeTruthy();
    expect(wrapper.find(`.${defaultPrefixCls}-grid-pwd-item`).at(1).hasClass(`${defaultPrefixCls}-grid-pwd-next-grid`)).toBeTruthy();
    // TODO 似乎autoFocus不会引发enzyme去触发input的focus事件？
    // 暂时先验证prop的接收，然后再模拟 focus 和 blur 事件。
    expect(wrapper.find('input').prop('autoFocus')).toBeTruthy();
    wrapper.find('input').simulate('focus');
    expect(wrapper.find(`.${defaultPrefixCls}-grid-pwd`).hasClass(`${defaultPrefixCls}-grid-pwd-focus`)).toBeTruthy();
    wrapper.find('input').simulate('blur');
    expect(wrapper.find(`.${defaultPrefixCls}-grid-pwd`).hasClass(`${defaultPrefixCls}-grid-pwd-focus`)).toBeFalsy();
  });

  it('should ref object has correct instance.', () => {
    const ref = React.createRef<GridPwdRef>();
    mount(
      <GridPwd
        ref={ref}
      />
    );
    expect(ref.current.reset).toBeDefined();
    expect(ref.current.resetAndFocus).toBeDefined();
  });
});