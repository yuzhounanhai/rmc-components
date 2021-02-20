import React from 'react';
import baseTest from '../../../tests/common/baseTest';
import Picker from '../index';
import { mount } from 'enzyme';
import { defaultPrefixCls } from '../../_config/dict';
import Button from '../../button';

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
  )

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
});