## Button 按钮

按钮组件封装了按钮的基本表现和简单功能。

#### 使用示例

+ 基本使用

```javascript
<Button>button</Button>
```

+ 使用不同表现的按钮， 如 primary、warning 等

```javascript
<Button
  // type="primary"
  type="warning"
>
  button
</Button>
```

+ 禁用按钮

```javascript
<Button
  disabled
>
  button
</Button>
```

+ 使按钮处于加载态

```javascript
<Button
  // loading={true}
  loading
>
  button
</Button>
```

+ 附加自定义icon

```javascript
import SwapOutlined from '@ant-design/icons/lib/icons/SwapOutlined';

<Button
  icon={(
    <SwapOutlined />
  )}
>
  button
</Button>
```

+ 点击

```javascript
<Button
  onClick={() => {
    console.log('click!');
  }}
>
  button
</Button>
```

#### API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | class | string | - | - |
| disabled | 是否禁用 | boolean | false | - |
| icon | 自定义图标（loading 时会被替换） | React.ReactNode | - | - |
| type | 按钮类型 | 'default' &#124; 'primary' &#124; 'link' &#124; 'text' &#124; 'warning' | 'default' | - |
| loading | 是否处于加载状态, 处于加载态时会显示 Loading 图标（会替换icon配置的自定义图标） | boolean | false | - |
| prefixCls | class 前缀 | string | - | - |
| shape | 按钮的形状 | undefined &#124; 'round' &#124; 'circle' | undefined | - |
| onClick | 按钮点击的回调 | React.MouseEventHandler<HTMLElement> | - | - |
| rootDom | 按钮的实际呈现元素 | keyof React.ReactHTML | 'a' | - |

