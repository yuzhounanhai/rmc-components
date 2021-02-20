import React from 'react';
import baseTest from '../../../tests/common/baseTest';
import Input from '../index';
import { InputRef } from '../input';
import { mount } from 'enzyme';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';

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

  it('should Input to be define.', () => {
    expect(Input).toBeDefined();
    expect(Input.Password).toBeDefined();
    expect(Input.Phone).toBeDefined();
  });

  it('should <Input/> ref has correctly instance.', () => {
    const inputRef = React.createRef<InputRef>();
    mount(
      <Input
        ref={inputRef}
      />
    );
    expect(inputRef.current.focus).toBeDefined();
    expect(inputRef.current.blur).toBeDefined();
    expect(inputRef.current.select).toBeDefined();
    expect(inputRef.current.handlePosition).toBeDefined();
  });

  it('should <Input/> get right value when onChange method has been triggered.', () => {
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
    })
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