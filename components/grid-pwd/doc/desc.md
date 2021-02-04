## GridPwd 宫格密码输入框

`GridPwd` 提供了类似于支付宝输入支付密码的交互形式。

#### 基本使用

```javascript
<GridPwd
  onFinished={(v, freeCb) => {
    console.log(v);
    freeCb();
  }}
/>
```

#### ref 接口能力

向 `GridPwd` 组件传递 `ref`，将获得组件提供的以下能力

+ reset: 重置宫格密码输入框的值

+ resetAndFocus: 重置输入值并聚焦输入框

#### API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| prefixCls | class 前缀 | string | - | - |
| className | class | string | - | - |
| gridCount | 宫格的个数，一个宫格代表一位密码 | number | 6 | - |
| type | 输入框组件的类型 | string | 'tel' | - |
| onFinished | 密码输入完成时的回调，若设置了该回调，当触发完成回调时，输入框将会被锁定，不能进行编辑。回调函数的第一个参数是输入完成时的值，第二个参数是解除锁定的函数。 | (value: string, freeCb: () => void) => void | - | - |
| onChange | 当输入框的值发生改变时，触发该回调 | (value: string) => void | - | - |