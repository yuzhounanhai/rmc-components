## Picker

弹出式 PickerView 选择触发器组件

该组件将渲染一个触发器，点击该触发器可以弹出 PickerView 选择器

#### 基本使用

```javascript
const data = [
  [
    {
      key: '1-1',
      value: '2013',
    },
    {
      key: '1-2',
      value: '2014',
    },
  ],
  [
    {
      key: '2-1',
      value: '春',
    },
    {
      key: '2-2',
      value: '秋',
    },
  ]
];
<Picker
  data={data}
  defaultValue={['1-1', '2-2']}
>
  click me!
</Picker>

<Picker
  data={data}
  defaultValue={['1-1', '2-2']}
>
  <button>click me!</button>
</Picker>

<Picker
  data={data}
  defaultValue={['1-1', '2-2']}
>
  {
    (openPop, value, currentValue) => (
      <div>
        <p>实时选择值： {currentValue.join(',')}</p>
        <p>选择值： {value.join(',')}</p>
        <button onClick={openPop}>选择</button>
      </div>
    )
  }
</Picker>
```

#### API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| prefixCls | class 前缀 | string | - | - |
| className | class | string | - | - |
| cancelText | 弹出层取消按钮文案 | string | '取消' | - |
| okText | 弹出层确定按钮文案 | string | '确定' | - |
| title | 弹出层标题文案 | string | - | - |
| defaultValue | 弹出PickerView默认选择值 | - | - |
| onOk | 弹出层点击确定按钮的回调 | (value: Key[]) => void | - | - |
| onCancel | 弹出层点击取消按钮的回调 | (value: Key[]) => void | - | - |
| onCreatePop | 弹出层出现（被创建时）的回调 | () => void | - | - |
| popClassName | 弹出层的className | - | - |
| maskClosable | 弹出层的遮罩是否可以触发关闭 | boolean | false | - |

该组件因引用了 PickerView， 因此支持传递 PickerView 组件所有的参数。