import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import baseTest from '../../../tests/common/baseTest';
import { sleep } from '../../../tests/common/utils';
import Input from '../index';
import { InputRef } from '../input';
import { mount } from 'enzyme';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';

describe('Input', () => {
  baseTest(
    <Input
      value="content"
      onChange={jest.fn()}
      placeholder="please"
      className="input-item"
    />
  );

  baseTest(
    <Input
      defaultValue="content"
      onChange={jest.fn()}
      clear
      type="digit"
      maxLength={10}
    />
  );

  baseTest(
    <Input
      defaultValue="content"
      disabled
      onChange={jest.fn()}
    />
  );

  baseTest(
    <Input
      defaultValue="content"
      addonBefore={(
        <div>before</div>
      )}
      addonAfter={(
        <div>after</div>
      )}
    />
  );

  baseTest(
    <Input
      type="phone"
      value="123"
    />
  );

  it('should Input to be define.', () => {
    expect(Input).toBeDefined();
    expect(Input.Password).toBeDefined();
    expect(Input.Phone).toBeDefined();
  });

  it('should trigger clear when click clear icon.', () => {
    const wrapper = mount(
      <Input
        type="text"
        clear
        defaultValue="content"
      />
    );
    wrapper.find(CloseCircleFilled).simulate('click');
    expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('');
  });

  it('should <Input/> ref has correctly instance.', () => {
    const inputRef = React.createRef<InputRef>();
    mount(
      <Input
        ref={inputRef}
      />
    );
    expect(inputRef.current.focus).toBeDefined();
    expect(() => {
      inputRef.current.focus();
    }).not.toThrow();
    expect(inputRef.current.blur).toBeDefined();
    expect(() => {
      inputRef.current.blur();
    }).not.toThrow();
    expect(inputRef.current.select).toBeDefined();
    expect(() => {
      inputRef.current.select();
    }).not.toThrow();
    expect(inputRef.current.handlePosition).toBeDefined();
    expect(() => {
      inputRef.current.handlePosition();
    }).not.toThrow();
  });

  it('should <Input/> get right value when onChange method has been triggered.', async () => {
    let i = '';
    const onChangeCb = jest.fn();
    const wrapper = mount(
      <Input
        onChange={(v) => {
          i = v;
          onChangeCb();
        }}
      />
    );
    wrapper.find('input').simulate('change', {
      target: {
        value: 'content',
      },
    });
    expect(onChangeCb).toHaveBeenCalled();
    expect(i).toBe('content');
    wrapper.setProps({
      disabled: true,
    });
    wrapper.update();
    wrapper.find('input').simulate('change', {
      target: {
        value: 'content1',
      },
    });
    expect(i).toBe('content');
    wrapper.setProps({
      disabled: false,
      maxLength: 7,
    });
    wrapper.update();
    wrapper.find('input').simulate('change', {
      target: {
        value: 'content1',
      },
    });
    expect(i).toBe('content');
    wrapper.setProps({
      maxLength: 8,
    });
    wrapper.update();
    wrapper.find('input').simulate('change', {
      target: {
        value: 'ct',
        selectionStart: 2,
        selectionEnd: 2,
      },
    });
    const {
      selectionStart,
      selectionEnd,
    } = (wrapper.find('input').getDOMNode() as HTMLInputElement);
    expect(selectionStart).toBe(2);
    expect(selectionEnd).toBe(2);
    await act(async () => {
      wrapper.find('input').simulate('change', {
        target: {
          value: 'content123',
          selectionStart: 10,
          selectionEnd: 10,
        },
      });
      await sleep(50);
    });
    expect(i).toBe('content1');
  });

  it('should support "onHandleSelectionPos" callback to handle selectionStart/selectionEnd', () => {
    const aimedSelectionStart = 0;
    const aimedSelectionEnd = 1;
    const wrapper = mount(
      <Input
        onHandleSelectionPos={(currentValue, startPos, endPos) => {
          return {
            start: aimedSelectionStart,
            end: aimedSelectionEnd,
          };
        }}
      />
    );
    (wrapper.find('input').getDOMNode() as HTMLInputElement).focus();
    wrapper.find('input').simulate('change', {
      target: {
        value: 'content',
        selectionStart: 9,
        selectionEnd: 9,
      },
    });
    const {
      selectionStart,
      selectionEnd,
    } = (wrapper.find('input').getDOMNode() as HTMLInputElement);
    expect(selectionStart).toBe(aimedSelectionStart);
    expect(selectionEnd).toBe(aimedSelectionEnd);
  });

  it('The "onChange" callback should not be triggered when the latest value is the same as the previous value.', () => {
    const testValue = 'content';
    const onChangeCb = jest.fn();
    const wrapper = mount(
      <Input
        value={testValue}
        onChange={onChangeCb}
      />
    );
    wrapper.find('input').simulate('change', {
      target: {
        value: testValue,
      },
    });
    expect(onChangeCb).not.toHaveBeenCalled();
  });

  it('When fully controlled, components need to behave correctly', async () => {
    const Demo = () => {
      const [value, setValue] = useState('content');
      return (
        <Input
          value={value}
          onChange={(v) => {
            setValue(v);
          }}
        />
      );
    }
    const wrapper = mount(
      <Demo />
    );
    let changedValue = '';
    wrapper.find('input').simulate('change', {
      target: {
        value: changedValue,
      },
    });
    expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe(changedValue);
    changedValue = 'content';
    wrapper.find('input').simulate('change', {
      target: {
        value: changedValue,
      },
    });
    expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe(changedValue);
  });

  describe('Phone', () => {
    baseTest(
      <Input.Phone
        value="13812345678"
        onChange={jest.fn()}
      />
    );

    it('should <Phone/> render input value correctly.', () => {
      let i = '';
      const wrapper = mount(
        <Input.Phone
          value="13812345678"
          onChange={(v) => {
            i = v;
          }}
        />
      );
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('138 1234 5678');
      wrapper.find('input').simulate('change', {
        target: {
          value: '188 1234 5678',
        },
      });
      expect(i).toBe('18812345678');
    });

    it('should trigger "onChange" callback correctly.', () => {
      const onChangeCb = jest.fn();
      const wrapper = mount(
        <Input.Phone
          defaultValue=""
          disabled
          onChange={onChangeCb}
        />
      );
      wrapper.find('input').simulate('change', {
        target: {
          value: '188 1234 5678',
        },
      });
      expect(onChangeCb).not.toBeCalled();
      wrapper.setProps({
        disabled: false,
      });
      wrapper.update();
      wrapper.find('input').simulate('change', {
        target: {
          value: '188 1234 5678',
        },
      });
      expect(onChangeCb).toBeCalled();
      wrapper.setProps({
        onChange: undefined,
      });
      wrapper.update();
      wrapper.find('input').simulate('change', {
        target: {
          value: '188 8888 8888',
        },
      });
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('188 8888 8888');
    });

    it('When fully controlled, components need to behave correctly', async () => {
      const Demo = () => {
        const [value, setValue] = useState('13812345678');
        return (
          <Input.Phone
            value={value}
            onChange={(v) => {
              setValue(v);
            }}
          />
        );
      }
      const wrapper = mount(
        <Demo />
      );
      wrapper.find('input').simulate('change', {
        target: {
          value: '',
          selectionStart: 0,
          selectionEnd: 0,
        },
      });
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('');
      expect(wrapper.find(Input.Phone).prop('value')).toBe('');
      wrapper.find('input').simulate('change', {
        target: {
          value: '1381',
          selectionStart: 4,
          selectionEnd: 4,
        },
      });
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('138 1');
      expect(wrapper.find(Input.Phone).prop('value')).toBe('1381');
      wrapper.find('input').simulate('change', {
        target: {
          value: '13812345',
          selectionStart: 8,
          selectionEnd: 8,
        },
      });
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('138 1234 5');
      expect(wrapper.find(Input.Phone).prop('value')).toBe('13812345');
      wrapper.find('input').simulate('change', {
        target: {
          value: '138 1234 56789',
          selectionStart: 13,
          selectionEnd: 13,
        },
      });
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('138 1234 5');
      expect(wrapper.find(Input.Phone).prop('value')).toBe('13812345');
    });

    it('should handle selection position when "onChange" get same value.', async () => {
      // 主要针对光标在这个位置回删时的光标处理
      // 138 1234 |5 -> 138 1234| 5
      const Demo = () => {
        const [value, setValue] = useState('13812345');
        return (
          <Input.Phone
            value={value}
            onChange={(v) => {
              setValue(v);
            }}
          />
        );
      }
      const wrapper = mount(
        <Demo />
      );
      const inputNode = wrapper.find('input').getDOMNode() as HTMLInputElement;
      inputNode.selectionStart = 9;
      inputNode.selectionEnd = 9;
      await act(async () => {
        wrapper.find('input').simulate('change', {
          target: {
            value: '138 12345',
            selectionStart: 8,
            selectionEnd: 8,
          },
        });
        await sleep(50);
      });
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).selectionStart).toBe(8);
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).selectionEnd).toBe(8);
    });

    it('should <Input.Phone/> ref has correctly instance.', () => {
      const inputRef = React.createRef<InputRef>();
      mount(
        <Input.Phone
          ref={inputRef}
        />
      );
      expect(inputRef.current.focus).toBeDefined();
      expect(() => {
        inputRef.current.focus();
      }).not.toThrow();
      expect(inputRef.current.blur).toBeDefined();
      expect(() => {
        inputRef.current.blur();
      }).not.toThrow();
      expect(inputRef.current.select).toBeDefined();
      expect(() => {
        inputRef.current.select();
      }).not.toThrow();
      expect(inputRef.current.handlePosition).toBeDefined();
      expect(() => {
        inputRef.current.handlePosition();
      }).not.toThrow();
    });
  });

  describe('Password', () => {
    baseTest(
      <Input.Password
        value="123456"
        onChange={jest.fn()}
      />
    );

    baseTest(
      <Input.Password
        value="123456"
        onChange={jest.fn()}
        pwdVisible={false}
      />
    );

    baseTest(
      <Input.Password
        value="123456"
        onChange={jest.fn()}
        addonAfter={(
          <div className="addonAfter">after</div>
        )}
        addonBefore={(
          <div className="addonBefore">before</div>
        )}
      />
    );

    it('no matter what is passed, type should use "password"', () => {
      const wrapper = mount(
        <Input.Password
          type="text"
        />
      );
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).type).toBe('password');
    });

    it('type should be changed to "text" when "pwdVisible" prop is true and btn has been click.', () => {
      const wrapper = mount(
        <Input.Password
          value="123456"
          pwdVisible
        />
      );
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).type).toBe('password');
      wrapper.find(EyeInvisibleOutlined).simulate('click');
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).type).toBe('text');
      wrapper.find(EyeOutlined).simulate('click');
      expect((wrapper.find('input').getDOMNode() as HTMLInputElement).type).toBe('password');
      wrapper.setProps({
        pwdVisible: false,
      });
      wrapper.update();
      expect(wrapper.find(EyeInvisibleOutlined)).toHaveLength(0);
      expect(wrapper.find(EyeOutlined)).toHaveLength(0);
    });

    it('should render AddonAfter correctly.', () => {
      const wrapper = mount(
        <Input.Password
          value="123456"
          onChange={jest.fn()}
          addonAfter={(
            <div className="addonAfter">after</div>
          )}
          addonBefore={(
            <div className="addonBefore">before</div>
          )}
        />
      );
      expect(wrapper.find(EyeInvisibleOutlined)).toHaveLength(1);
      expect(wrapper.find('.addonAfter')).toHaveLength(1);
      expect(wrapper.find('.addonBefore')).toHaveLength(1);
    });
  });
})