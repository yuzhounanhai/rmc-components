## Drawer 抽屉弹出层

`<Drawer>` 组件提供了自底向上/自顶向下的弹出内容层功能。

#### 使用示例

+ 基本使用

```javascript
function BasicUsage() {
  const [visible, setVisible] = useState(true);
  return (
    <Drawer
      visible={visible}
      onCancel={() => {
        setVisible(false)
      }}
    >
      <div>content</div>
    </Drawer>
  );
}
```

+ 改变为自顶向下弹出内容

```javascript
<Drawer
  direction="down"
>
  <div>content</div>
</Drawer>
```

+ 指定children中的任一元素触发关闭回调

```javascript
function FunctionalChildren() {
  const [visible, setVisible] = useState(true);
  return (
    <Drawer
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
    >
      {
        (onTriggerOnCancel) => (
          <div>
            <p>content</p>
            <button onClick={onTriggerOnCancel}>close</button>
          </div>
        )
      }
    </Drawer>
  );
}
```

#### QuickDrawer Drawer的快速简单使用

对于简单的业务场景，你可以调用 `Drawer.createDrawer` 方法，传递相关参数，快速的创建一个抽屉弹层。

+ 基本使用

```javascript
Drawer.createDrawer({
  content: (onTriggerOnCancel) => (
    <div>
      <p>content</p>
      <button onClick={onTriggerOnCancel}>close</button>
    </div>
  ),
});
```

与 `<Drawer>` 在参数上略有区别， 如函数方法中使用 `content` 字段代替 `<Drawer>` 的 `children` 等。 具体差别查看具体表格。

#### API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| prefixCls | class 前缀 | string | - | - |
| className | class | string | - | - |
| maskClosable | mask 层是否可关闭 | boolean | true | - |
| direction | Drawer 的弹出方向 | 'up' &#124; 'down' &#124; '↑' &#124; '↓' | 'up' | - |
| visible | 是否弹出显示 | boolean | true | - |
| mask | 是否显示遮罩层 | boolean | true | - |
| onHide | 当弹出层隐藏时触发回调 | () => void | - | - |
| onShow | 当弹出层出现时触发回调 | () => void | - | - |
| onCancel | 触发关闭的回调 | (...customParams: any[]) => void | - | - |

#### Drawer 与 QuickDrawer 的参数区别

+ children

QuickDrawer 不存在 children 参数

+ content

QuickDrawer 的 content 参数 全等于 Drawer 的 children 参数

+ onCancel

类型： `(close: () => void, ...customParams: any[]) => void`

第一个参数是关闭函数，调用后将会进行关闭过渡，并在关闭过渡结束后销毁组件。