import React from 'react';
import {
  act,
  Simulate,
} from 'react-dom/test-utils';
import { mount } from 'enzyme';
import baseTest from '../../../tests/common/baseTest';
import baseReactDOMTest, { $$ } from '../../../tests/common/baseReactDOMTest';
import { sleep } from '../../../tests/common/utils';
import FadeIn from '../../fade/fadeIn';
import BaseModal from '../modal';
import Modal from '..';
import { defaultPrefixCls } from '../../_config/dict';

function TestComponent() {
  return (
    <div>test</div>
  );
}

describe('Modal', () => {
  baseReactDOMTest();

  baseTest(
    <BaseModal hideDestroy={false}>
      content
    </BaseModal>
  );

  baseTest(
    <BaseModal
      hideDestroy={false}
      width="80%"
    >
      content
    </BaseModal>
  );

  baseTest(
    <BaseModal
      title="title"
      hideDestroy={false}
    >
      <div>content</div>
    </BaseModal>
  );

  baseTest(
    <BaseModal
      title="title"
      hideDestroy={false}
      footer={(
        <TestComponent />
      )}
    >
      <div>content</div>
    </BaseModal>
  );

  baseTest(
    <BaseModal
      title="title"
      hideDestroy={false}
      footer={null}
    >
      <div>content</div>
    </BaseModal>
  );

  baseTest(
    <BaseModal
      confirmCareful
      hideDestroy={false}
    >
      <div>content</div>
    </BaseModal>
  );

  baseTest(
    <BaseModal
      closeCorner
      hideDestroy={false}
    >
      <div>content</div>
    </BaseModal>
  );

  baseTest(
    <BaseModal
      okText="ok"
      hideDestroy={false}
      cancelText="cancel"
    >
      <div>content</div>
    </BaseModal>
  );

  baseTest(
    <BaseModal
      customStructure
      hideDestroy={false}
    >
      <div>content</div>
    </BaseModal>
  );

  baseTest(
    <BaseModal
      customStructure
      hideDestroy={false}
      closeCorner
    >
      <div>content</div>
    </BaseModal>
  );

  it('should trigger "onShow" callback or "onHide" callback when modal visible changed.', async () => {
    const onShowCb = jest.fn();
    const onHideCb = jest.fn();
    const wrapper = mount(
      <Modal
        onShow={onShowCb}
        onHide={onHideCb}
      >
        content
      </Modal>
    );
    await act(async () => {
      await sleep(50);
      wrapper.update();
    });
    wrapper.find(FadeIn).simulate('transitionend');
    expect(onShowCb).toBeCalledTimes(1);
    expect(onHideCb).toBeCalledTimes(0);
    wrapper.setProps({
      visible: false,
    });
    wrapper.update();
    wrapper.find(FadeIn).simulate('transitionend');
    expect(onShowCb).toBeCalledTimes(1);
    expect(onHideCb).toBeCalledTimes(1);
  });

  it('"okText"、"cancelText"、"confirmable"、"footer"、"confirmCareful" props should work.', async () => {
    const okText = "ok";
    const cancelText = "cancel";
    const wrapper = mount(
      <Modal
        okText={okText}
        cancelText={cancelText}
      >
        content
      </Modal>
    );
    await act(async () => {
      await sleep(50);
      wrapper.update();
    });
    expect(wrapper.find(`.${defaultPrefixCls}-modal-ok`).getDOMNode().textContent).toBe(okText);
    expect(wrapper.find(`.${defaultPrefixCls}-modal-cancel`).getDOMNode().textContent).toBe(cancelText);
    expect(wrapper.find(`.${defaultPrefixCls}-modal-button`).first().getDOMNode().textContent).toBe(cancelText);
    wrapper.setProps({
      confirmCareful: true,
    });
    wrapper.update();
    expect(wrapper.find(`.${defaultPrefixCls}-modal-button`).first().getDOMNode().textContent).toBe(okText);
    wrapper.setProps({
      confirmable: false,
    });
    wrapper.update();
    expect(wrapper.find(`.${defaultPrefixCls}-modal-button`).first().getDOMNode().textContent).toBe(cancelText);
    expect(wrapper.find(`.${defaultPrefixCls}-modal-button`)).toHaveLength(1);
    wrapper.setProps({
      confirmCareful: false,
    });
    wrapper.update();
    expect(wrapper.find(`.${defaultPrefixCls}-modal-button`).first().getDOMNode().textContent).toBe(cancelText);
    expect(wrapper.find(`.${defaultPrefixCls}-modal-button`)).toHaveLength(1);
    wrapper.setProps({
      footer: null,
    });
    wrapper.update();
    expect(wrapper.find(`.${defaultPrefixCls}-modal-footer`)).toHaveLength(0);
    wrapper.setProps({
      footer: (
        <TestComponent />
      ),
    });
    wrapper.update();
    expect(wrapper.find(`.${defaultPrefixCls}-modal-footer`).find(TestComponent)).toHaveLength(1);
  });

  it('mask should trigger "onCancel" callback when "maskClosable" is true.', async () => {
    const onCancelCb = jest.fn();
    const wrapper = mount(
      <Modal
        mask={false}
        onCancel={onCancelCb}
      >
        content
      </Modal>
    );
    await act(async () => {
      await sleep(50);
      wrapper.update();
    });
    expect(wrapper.find(`.${defaultPrefixCls}-modal-mask`)).toHaveLength(0);
    wrapper.setProps({
      mask: true,
      maskClosable: false,
    });
    wrapper.update();
    expect(wrapper.find(`.${defaultPrefixCls}-modal-mask`)).toHaveLength(1);
    wrapper.find(`.${defaultPrefixCls}-modal-mask`).simulate('click');
    expect(onCancelCb).not.toBeCalled();
    wrapper.setProps({
      maskClosable: true,
    });
    wrapper.update();
    expect(wrapper.find(`.${defaultPrefixCls}-modal-mask`)).toHaveLength(1);
    wrapper.find(`.${defaultPrefixCls}-modal-mask`).simulate('click');
    expect(onCancelCb).toBeCalledTimes(1);
  });

  it('close icon should trigger "onCancel" callback when "closeCorner" is true.', async () => {
    const onCancelCb = jest.fn();
    const wrapper = mount(
      <Modal
        closeCorner={false}
        onCancel={onCancelCb}
      >
        content
      </Modal>
    );
    await act(async () => {
      await sleep(50);
      wrapper.update();
    });
    expect(wrapper.find(`.${defaultPrefixCls}-modal-corner-close`)).toHaveLength(0);
    wrapper.setProps({
      closeCorner: true,
    });
    wrapper.update();
    expect(wrapper.find(`.${defaultPrefixCls}-modal-corner-close`)).toHaveLength(1);
    wrapper.find(`.${defaultPrefixCls}-modal-corner-close`).simulate('click');
    expect(onCancelCb).toBeCalledTimes(1);
    wrapper.setProps({
      customStructure: true,
    });
    wrapper.update();
    expect(wrapper.find(`.${defaultPrefixCls}-modal-corner-close`)).toHaveLength(1);
    wrapper.find(`.${defaultPrefixCls}-modal-corner-close`).simulate('click');
    expect(onCancelCb).toBeCalledTimes(2);
  });

  it('different modal button should trigger different callback(onOk/onCancel).', async () => {
    const onCancelCb = jest.fn();
    const onOkCb = jest.fn();
    const wrapper = mount(
      <Modal
        onCancel={onCancelCb}
        onOk={onOkCb}
      >
        content
      </Modal>
    );
    await act(async () => {
      await sleep(50);
      wrapper.update();
    });
    wrapper.find(`.${defaultPrefixCls}-modal-ok`).simulate('click');
    expect(onCancelCb).toBeCalledTimes(0);
    expect(onOkCb).toBeCalledTimes(1);
    wrapper.find(`.${defaultPrefixCls}-modal-cancel`).simulate('click');
    expect(onCancelCb).toBeCalledTimes(1);
    expect(onOkCb).toBeCalledTimes(1);
  });

  it('"customStructure" props should work.', async () => {
    const onCancelCb = jest.fn();
    const onOkCb = jest.fn();
    const wrapper1 = mount(
      <Modal customStructure>
        <TestComponent/>
      </Modal>
    );
    const wrapper2 = mount(
      <Modal
        customStructure
        onCancel={onCancelCb}
        onOk={onOkCb}
      >
        {
          (onOk, onCancel) => (
            <div>
              <div
                className="test-btn1"
                onClick={onOk}
              />
              <div
                className="test-btn2"
                onClick={onCancel}
              />
            </div>
          )
        }
      </Modal>
    );
    await act(async () => {
      await sleep(50);
      wrapper1.update();
      wrapper2.update();
    });
    expect(wrapper1.find(`.${defaultPrefixCls}-modal-custom-content`).find(TestComponent)).toHaveLength(1);
    wrapper2.find('.test-btn1').simulate('click');
    expect(onCancelCb).toBeCalledTimes(0);
    expect(onOkCb).toBeCalledTimes(1);
    wrapper2.find('.test-btn2').simulate('click');
    expect(onCancelCb).toBeCalledTimes(1);
    expect(onOkCb).toBeCalledTimes(1);
  });

  it('quick modal create function should be defined.', () => {
    expect(Modal.info).toBeDefined();
    expect(Modal.confirm).toBeDefined();
    expect(Modal.showCustom).toBeDefined();
  });

  it('quick info modal should be worked correctly.', async () => {
    const onHideCb = jest.fn();
    Modal.info({
      title: 'title',
      content: 'content',
      hideDestroy: false,
      onHide: onHideCb,
    });
    await act(async () => {
      await sleep(50);
    });
    expect($$(`.${defaultPrefixCls}-modal`)).not.toBeNull();
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    Simulate.click($$(`.${defaultPrefixCls}-modal-cancel`));
    // 连续点击不能出错
    expect(() => {
      Simulate.click($$(`.${defaultPrefixCls}-modal-cancel`));
    }).not.toThrow();
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    expect(onHideCb).toBeCalled();
    expect($$(`.${defaultPrefixCls}-modal`)).toBeNull();
  });

  it('quick confirm modal should be worked correctly.', async () => {
    const onOkCb = jest.fn();
    Modal.confirm({
      title: 'title',
      content: 'content',
      hideDestroy: false,
      className: 'modal1',
      onOk: (close) => {
        onOkCb();
        close();
      },
    });
    Modal.confirm({
      title: 'title',
      content: 'content',
      hideDestroy: false,
      className: 'modal2',
    });
    await act(async () => {
      await sleep(50);
    });
    expect($$('.modal1')).not.toBeNull();
    expect($$('.modal2')).not.toBeNull();
    Simulate.transitionEnd($$(`.modal1.${defaultPrefixCls}-fade`));
    Simulate.transitionEnd($$(`.modal2.${defaultPrefixCls}-fade`));
    Simulate.click($$(`.modal1 .${defaultPrefixCls}-modal-ok`));
    expect(onOkCb).toBeCalled();
    Simulate.click($$(`.modal2 .${defaultPrefixCls}-modal-ok`));
    Simulate.transitionEnd($$(`.modal1.${defaultPrefixCls}-fade`));
    Simulate.transitionEnd($$(`.modal2.${defaultPrefixCls}-fade`));
    expect($$('.modal1')).toBeNull();
    expect($$('.modal2')).toBeNull();
  });

  it('quick custom modal should be worked correctly.', async () => {
    const onOkCb = jest.fn();
    const onCancelCb = jest.fn();
    Modal.showCustom({
      content: (onOk, onCancel) => (
        <div>
          <button onClick={onOk} className="btn1">btn1</button>
          <button onClick={onCancel} className="btn2">btn2</button>
        </div>
      ),
      hideDestroy: false,
      onOk: onOkCb,
      onCancel: (close) => {
        onCancelCb();
        close();
      },
    });
    await act(async () => {
      await sleep(50);
    });
    expect($$(`.${defaultPrefixCls}-modal`)).not.toBeNull();
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    Simulate.click($$('.btn1'));
    expect(onOkCb).toBeCalled();
    Simulate.click($$('.btn2'));
    expect(onCancelCb).toBeCalled();
    Simulate.transitionEnd($$(`.${defaultPrefixCls}-fade`));
    expect($$(`.${defaultPrefixCls}-modal`)).toBeNull();
  });

  it('quick modal also can use children to render content(but it is not recommended).', async () => {
    Modal.info({
      children: (
        <div className="container">content</div>
      ),
    });
    await act(async () => {
      await sleep(50);
    });
    expect($$(`.${defaultPrefixCls}-modal`)).not.toBeNull();
    expect($$('.container')).not.toBeNull();
  });
});