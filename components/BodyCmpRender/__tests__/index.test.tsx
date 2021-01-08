import * as React from 'react';
import Button from '@/button/button';
import BodyCmpRender, {
  contentRenderFn,
} from '@/BodyCmpRender/index';

const renderFn: contentRenderFn = (props, updateFn, destoryFn) => (
  <div>
    <span className="contentValue">{props.content}</span>
    <Button
      className="btn1"
      onClick={() => {
        updateFn({
          content: '2'
        })
      }}
    >
      btn1
    </Button>
    <Button
      className="btn2"
      onClick={() => {
        destoryFn();
      }}
    >
      btn2
    </Button>
  </div>
);

// TODO 内置的ReactDOM.render如何测试？
// describe('BodyCmpRender', () => {
//   it('')
// });