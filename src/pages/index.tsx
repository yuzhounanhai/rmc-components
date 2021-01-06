import * as React from 'react';
import Button from '@/button/button';
import SwapOutlined from '@ant-design/icons/lib/icons/SwapOutlined';

export default () => {
  return (
    <div>
      <Button type="warning" loading>123</Button>
      <Button
        icon={(
          <SwapOutlined
            className="test-icon"
          />
        )}
      >
        button
      </Button>
    </div>
  );
};
