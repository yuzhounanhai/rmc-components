import React from 'react';
import Button from '../../button';
import createPortalUtils, {
  contentRenderFn,
} from '../../portalFactory/index';
import baseReactDOMTest, {
  $$,
  $$A,
} from '../../../tests/common/baseReactDOMTest';

const renderFn: contentRenderFn = (props, updateFn, destroyFn) => (
  <div className="contain">
    <span className="contentValue">{props.content}</span>
    <span className="numberValue">{props.number}</span>
    <Button
      className="btn btn1"
      onClick={() => {
        updateFn({
          content: '二'
        })
      }}
    >
      btn1
    </Button>
    <Button
      className="btn btn2"
      onClick={() => {
        destroyFn();
      }}
    >
      btn2
    </Button>
  </div>
);

describe('portalFactory', () => {
  baseReactDOMTest();
  it('should render correctly', () => {
    const pf = createPortalUtils(renderFn);
    expect(pf).toBeDefined();
    expect(pf.render).toBeDefined();
    expect(pf.update).toBeDefined();
    expect(pf.destroy).toBeDefined();
    const content = '一';
    const number = '1';
    pf.render({
      content,
      number,
    });
    expect(
      $$('.contentValue')?.textContent
    ).toBe(content);
    expect(
      $$('.numberValue')?.textContent
    ).toBe(number);
    expect(
      $$A('.btn').length
    ).toBe(2);
  });

  it('should update correctly', () => {
    const pf = createPortalUtils(renderFn);
    const content1 = '一';
    const number1 = '1';
    const content2 = '二';
    const number2 = '2';
    pf.render({
      content: content1,
      number: number1,
    });
    pf.update({
      content: content2,
    });
    expect(
      $$('.contentValue')?.textContent
    ).toBe(content2);
    expect(
      $$('.numberValue')?.textContent
    ).toBe(number1);
    pf.update({
      content: content1,
      number: number2,
    });
    expect(
      $$('.contentValue')?.textContent
    ).toBe(content1);
    expect(
      $$('.numberValue')?.textContent
    ).toBe(number2);
  });

  it('should destroy correctly', () => {
    const pf = createPortalUtils(renderFn);
    const content = '一';
    const number = '1';
    pf.render({
      content,
      number,
    });
    pf.destroy();
    expect($$('.contain')).toBeDefined();
  });

  it('call updateFn should not throw error when not call renderFn', () => {
    const pf = createPortalUtils(renderFn);
    const content = '一';
    const number = '1';
    expect(() => {
      pf.update({
        content,
        number,
      });
    }).not.toThrow();
  });

  it('call destroyFn should not throw error when not call renderFn', () => {
    const pf = createPortalUtils(renderFn);
    expect(() => {
      pf.destroy();
    }).not.toThrow();
  });

  it('should update content when updateFn called in contentRenderFn', () => {
    const pf = createPortalUtils(renderFn);
    const content = '一';
    const number = '1';
    pf.render({
      content,
      number,
    });
    ($$('.btn1') as HTMLElement).click();
    expect(
      $$('.contentValue')?.textContent
    ).toBe('二');
    expect(
      $$('.numberValue')?.textContent
    ).toBe(number);
  });

  it('should destroy when destroy called in contentRenderFn', () => {
    const pf = createPortalUtils(renderFn);
    const content = '一';
    const number = '1';
    pf.render({
      content,
      number,
    });
    ($$('.btn2') as HTMLElement).click();
    expect($$A('.contain').length).toBe(0);
  });
});