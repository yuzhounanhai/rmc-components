import React from 'react';
import baseTest from '../../../tests/common/baseTest';
import { act, Simulate } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import GridPwd, {
  GridPwdRef,
} from '../index';
import { defaultPrefixCls } from '../../_config/dict';
import BaseInput from '../../input/input';

jest.mock('copy-to-clipboard');

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
    let freeFn = () => {};
    const wrapper = mount(
      <GridPwd
        onFinished={(v, freeCb) => {
          onFinishedCb();
          freeFn = () => {
            freeCb();
          };
        }}
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
    
    // 锁定后 input元素上会附加 readOnly 等属性从原生层面禁用组件
    wrapper.find('input').simulate('change', {
      target: {
        value: '123457',
      },
    });
    expect(onFinishedCb).toHaveBeenCalledTimes(1);
    expect(onChangeCb).toHaveBeenCalledTimes(2);
    
    // 强制引发一个 onChange
    wrapper.find(BaseInput).invoke('onChange')('123');
    expect(onFinishedCb).toHaveBeenCalledTimes(1);
    expect(onChangeCb).toHaveBeenCalledTimes(2);
    // freeCb 后要允许重新输入
    act(() => {
      freeFn();
    });
    wrapper.find('input').simulate('change', {
      target: {
        value: '123457',
      },
    });
    expect(onFinishedCb).toHaveBeenCalledTimes(2);
    expect(onChangeCb).toHaveBeenCalledTimes(3);

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

  it('should not throw any warning or error when input trigger "paste" event.', () => {
    const wrapper = mount(
      <GridPwd/>
    );
    expect(() => {
      wrapper.find('input').simulate('paste');
    }).not.toThrow();
  });

  it('should focus input when click element.', () => {
    const wrapper = mount(
      <GridPwd/>
    );
    (wrapper.find('input').getDOMNode() as HTMLInputElement).blur();
    expect(document.activeElement).not.toBe(wrapper.find('input').getDOMNode());
    wrapper.find(`.${defaultPrefixCls}-grid-pwd`).simulate('click');
    expect(document.activeElement).toBe(wrapper.find('input').getDOMNode());
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
    const wrapper = mount(
      <GridPwd
        ref={ref}
      />
    );
    expect(ref.current.reset).toBeDefined();
    wrapper.find('input').simulate('change', {
      target: {
        value: '123',
      },
    });
    expect(() => {
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('123');
      act(() => {
        ref.current.reset();
      });
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('');
    }).not.toThrow();
    wrapper.find('input').simulate('change', {
      target: {
        value: '123',
      },
    });
    (wrapper.find('input').getDOMNode() as HTMLInputElement).blur();
    expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('123');
    expect(ref.current.resetAndFocus).toBeDefined();
    expect(() => {
      act(() => {
        ref.current.resetAndFocus();
      });
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('');
      expect(document.activeElement).toBe(wrapper.find('input').getDOMNode());
    }).not.toThrow();
  });
});