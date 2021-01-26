import React from 'react';
import { mount } from 'enzyme';
import SwapOutlined from '@ant-design/icons/SwapOutlined';
import Button from '../button';
import baseTest from '../../../tests/common/baseTest';

describe('Button', () => {

  baseTest(<Button>button</Button>);
  
  baseTest(<Button disabled>button</Button>);

  baseTest(<Button type="default" shape="circle">button</Button>);

  baseTest(<Button type="primary">button</Button>);

  baseTest(<Button type="warning" loading>button</Button>);

  baseTest(
    <Button
      type="text"
      onClick={jest.fn()}
    >
      button
    </Button>
  );

  baseTest(
    <Button
      type="link"
      rootDom="span"
      alt="description"
    >
      button
    </Button>
  );

  it('renders button element correctly', () => {
    const wrapper = mount(
      <Button>button</Button>
    );
    expect(wrapper.getDOMNode().nodeName).toBe('A');
    const wrapper1 = mount(
      <Button
        rootDom="div"
      >
        button
      </Button>
    );
    expect(wrapper1.getDOMNode().nodeName).toBe('DIV');
    const wrapper2 = mount(
      <Button
        rootDom="button"
      >
        button
      </Button>
    );
    expect(wrapper2.getDOMNode().nodeName).toBe('BUTTON');
  });

  it('renders button icon correctly', () => {
    const wrapper = mount(
      <Button
        icon={(
          <SwapOutlined />
        )}
      >
        button
      </Button>
    );
    expect(wrapper.find(SwapOutlined)).toHaveLength(1);
    const wrapper1 = mount(
      <Button
        icon={(
          <SwapOutlined />
        )}
        loading
      >
        button
      </Button>
    );
    expect(wrapper1.find(SwapOutlined)).toHaveLength(0);
  });

  it('should not clickable when button is loading or disabled', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Button
        loading
        onClick={onClick}
      >
        button
      </Button>
    );
    wrapper.simulate('click');
    expect(onClick).not.toHaveBeenCalledWith();
    const wrapper1 = mount(
      <Button
        disabled
        onClick={onClick}
      >
        button
      </Button>
    );
    wrapper1.simulate('click');
    expect(onClick).not.toHaveBeenCalledWith();
  });
});