import React from 'react';
import { Simulate, act } from 'react-dom/test-utils';
import baseTest from '../../../tests/common/baseTest';
import baseReactDOMTest, { $$ } from '../../../tests/common/baseReactDOMTest';
import { sleep } from '../../../tests/common/utils';
import { mount } from 'enzyme';
import { defaultPrefixCls } from '../../_config/dict';
import Button from '../../button';
import Picker from '../index';

jest.mock('../../picker-view/index', () => (props) => (
  <div
    className="mock-components-trigger"
    onClick={() => {
      typeof props.onChange === 'function' && props.onChange(['b', 'b1']);
    }}
  >
    btn
  </div>
));

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

describe('Picker', () => {
  baseReactDOMTest();

  baseTest(
    <Picker
      data={dataCascade}
    >
      btn
    </Picker>
  );

  baseTest(
    <Picker
      data={dataCascade}
    >
      btn
      <br/>
      btn
    </Picker>
  );

  baseTest(
    <Picker
      data={dataCascade}
    >
      <Button onClick={jest.fn()}>btn</Button>
    </Picker>
  );

  baseTest(
    <Picker
      data={dataCascade}
    >
      {
        (openPop, value, currentValue) => (
          <div>
            <div className="btn" onClick={openPop}>btn</div>
            <p>{`${value}-${currentValue}`}</p>
          </div>
        )
      }
    </Picker>
  );

  baseTest(
    <Picker
      data={dataCascade}
      children={null}
    />
  );

  it('should Picker render correctly.', () => {
    const onCreatePop = jest.fn();
    const wrapper1 = mount(
      <Picker
        data={dataCascade}
        onCreatePop={onCreatePop}
      >
        btn
      </Picker>
    );
    expect(wrapper1.find(`.${defaultPrefixCls}-picker-trigger`)).toHaveLength(1);
    wrapper1.find(`.${defaultPrefixCls}-picker-trigger`).simulate('click');
    expect(onCreatePop).toHaveBeenCalledTimes(1);
    const btnClickCb = jest.fn();
    const wrapper2 = mount(
      <Picker
        data={dataCascade}
        onCreatePop={onCreatePop}
      >
        <Button onClick={btnClickCb}>btn</Button>
      </Picker>
    );
    expect(wrapper2.find(`.${defaultPrefixCls}-picker-trigger`)).toHaveLength(0);
    wrapper2.find(Button).simulate('click');
    expect(onCreatePop).toHaveBeenCalledTimes(2);
    expect(btnClickCb).toHaveBeenCalled();
    const wrapper3 = mount(
      <Picker
        data={dataCascade}
        onCreatePop={onCreatePop}
      >
        {
          (openPop, value, currentValue) => (
            <div>
              <div className="btn" onClick={openPop}>btn</div>
              <p>{`${value}-${currentValue}`}</p>
            </div>
          )
        }
      </Picker>
    );
    expect(wrapper2.find(`.${defaultPrefixCls}-picker-trigger`)).toHaveLength(0);
    wrapper3.find('.btn').simulate('click');
    expect(onCreatePop).toHaveBeenCalledTimes(3);
  });
  
  it('should destory elements whick created by "Drawer" when trigger close event.', async () => {
    const wrapper = mount(
      <Picker
        data={dataCascade}
      >
        <div className="trigger-btn">btn</div>
      </Picker>
    );
    wrapper.find('.trigger-btn').simulate('click');
    expect($$(`.${defaultPrefixCls}-picker-wrapper`)).not.toBeNull();
    await act(async () => {
      await sleep(50);
    });
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    Simulate.click($$(`.${defaultPrefixCls}-picker-cancel`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    expect($$(`.${defaultPrefixCls}-picker-wrapper`)).toBeNull();
    wrapper.find('.trigger-btn').simulate('click');
    await act(async () => {
      await sleep(50);
    });
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.click($$(`.${defaultPrefixCls}-picker-ok`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    expect($$(`.${defaultPrefixCls}-picker-wrapper`)).toBeNull();

    let v1: any, v2: any;
    const wrapper1 = mount(
      <Picker
        data={dataCascade}
        defaultValue={['a', 'a1']}
        onCancel={v => {
          v1 = v;
        }}
        onOk={v => {
          v2 = v;
        }}
      >
        <div className="trigger-btn">btn</div>
      </Picker>
    );
    wrapper1.find('.trigger-btn').simulate('click');
    await act(async () => {
      await sleep(50);
    });
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    Simulate.click($$(`.mock-components-trigger`));
    Simulate.click($$(`.${defaultPrefixCls}-picker-cancel`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    ['a', 'a1'].forEach((item, idx) => {
      expect(item).toBe(v1[idx]);
    });
    wrapper1.find('.trigger-btn').simulate('click');
    await act(async () => {
      await sleep(50);
    });
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    Simulate.click($$(`.mock-components-trigger`));
    Simulate.click($$(`.${defaultPrefixCls}-picker-ok`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-slide`));
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    ['b', 'b1'].forEach((item, idx) => {
      expect(item).toBe(v2[idx]);
    });
  });

  afterAll(() => {
    jest.unmock('../../picker-view/index');
  });
});