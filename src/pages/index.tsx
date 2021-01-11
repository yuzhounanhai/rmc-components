import * as React from 'react';
import Button from '@/button/button';
import SwapOutlined from '@ant-design/icons/lib/icons/SwapOutlined';

export default () => {
  return (
    <div>
      <Button type="warning" loading>123</Button>
      <Button type="warning" loading>123</Button>
      <Button type="warning" disabled loading>123</Button>
      <Button loading>123</Button>
      <Button type="primary" loading>123</Button>
      <Button type="primary" disabled loading>123</Button>
      <Button
        icon={(
          <SwapOutlined
            className="test-icon"
          />
        )}
      >
        button
      </Button>
      <Button type="text" loading>123</Button>
      <Button type="text" disabled loading>123</Button>
      <Button type="link" loading>123</Button>
      <Button type="link" disabled loading>123</Button>
    </div>
  );
};
