import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import baseTest from '../../../tests/common/baseTest';
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
  baseTest(
    <BaseModal hideDestroy={false}>
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
});