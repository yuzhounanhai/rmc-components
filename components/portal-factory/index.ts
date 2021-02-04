import React from 'react';
import ReactDOM from 'react-dom';

export interface RenderProps {
  [key: string]: any;
};

export type UpdateRenderFn = (props?: RenderProps) => void;

export type DestroyRenderFn = () => void;

export type contentRenderFn = (
  props: RenderProps,
  updateCmpFn: UpdateRenderFn,
  destroyCmpFn: DestroyRenderFn,
) => React.ReactElement;

export type RenderFn = (props?: RenderProps) => void;

export type RenderFuncUtils = {
  render: RenderFn,
  update: UpdateRenderFn,
  destroy: DestroyRenderFn,
};

function renderComponentNode(renderFn: contentRenderFn): RenderFuncUtils {
  let prevProps: RenderProps = {};
  let render: RenderFn = () => {
    console.error('renderFn is not a function');
  };
  let destroy: DestroyRenderFn = () => {
    console.error('destroyFn is not a function');
  };
  let update: UpdateRenderFn = () => {};
  if (typeof renderFn === 'function') {
    const div = document.createElement('div');
    document.body.appendChild(div);

    destroy = () => {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }

    render = (props) => {
      const jsx = renderFn({
        ...(prevProps || {}),
        ...(props || {}),
      }, update, destroy);
      prevProps = props || {};
      ReactDOM.render(
        jsx,
        div,
      );
    }
  }
  update = (newProps: RenderProps) => {
    render(newProps);
  };
  return {
    render,
    destroy,
    update,
  }
}

export default renderComponentNode;