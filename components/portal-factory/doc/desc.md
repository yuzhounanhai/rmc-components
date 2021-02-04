## PortalFactory Portal工厂

文档组件渲染

React 的 Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的方案, 区别于 React 的 Portal， PortalFactory 则是提供了一套将子节点渲染到 `<body>` 下（创建的新div进行承载）的方案。

这是一个工具函数，调用执行并传入内容渲染方法，将返回一个带有渲染函数、更新函数、销毁函数的对象字面量。

### 基本使用

```javascript
import PortalFactory as renderComponentAtBody from '...';

// ...

// 创建实际渲染函数
const renderFn = (props, updateFn, destroyFn) => (
  <div>
    <span className="contentValue">{props.content}</span>
    <Button
      className="btn1"
      onClick={() => {
        // 在渲染函数中内置更新组件的方法
        updateFn({
          content: 'new content'
        })
      }}
    >
      btn1
    </Button>
    <Button
      className="btn2"
      onClick={() => {
        // 在渲染函数中内置销毁组件的方法
        destroyFn();
      }}
    >
      btn2
    </Button>
  </div>
);

// 调用工具函数获得渲染方法集合，并结构拆解
// 创建渲染方法集合，并不会去渲染组件（但是已经在body中创建了一个承载div容器）
const {
  render: renderComponent,
  update: updateComponent,
  destroy: destroyComponent,
} = renderComponentAtBody(renderFn);

// 执行渲染，调用该方法后才会去执行renderFn
renderComponent({
  content: 'init content',
});

// ...
setTimeout(() => {
  // 可以在业务逻辑中更新刚才渲染的组件
  updateComponent({
    content: 'refresh',
  });
}, 3000);

// ...
setTimeout(() => {
  // 可以在业务逻辑中销毁刚才渲染的组件
  destroyComponent();
}, 10000);

```

### 主渲染函数

```typescript
type contentRenderFn = (
  props: RenderProps,
  updateCmpFn: UpdateRenderFn,
  destroyCmpFn: DestroyRenderFn,
) => React.ReactElement;
```
主渲染函数是文档组件渲染工具的核心，文档组件渲染工具将使用你提供的渲染函数去渲染组件至顶层（body）

主渲染函数接收三个参数

+ props: 实时组件props，你可以将它理解为函数组件的props
+ updateCmpFn: 组件更新方法，你可以调用该方法，去触发一次props更新
+ destroyCmpFn： 组件销毁方法，你可以调用该方法，将该渲染在顶层的组件内容进行销毁

主渲染函数返回 ReactElement

### RenderProps 渲染参数

```typescript
interface RenderProps {
  [key: string]: any;
};
```

渲染参数将在主渲染函数中供你自定义使用，你可以使用对象字面量的形式，传递任何形式的参数，供主渲染函数使用。

### RenderFuncUtils 文档组件渲染工具集

```typescript
type RenderFuncUtils = {
  render: RenderFn,
  update: UpdateRenderFn,
  destroy: DestroyRenderFn,
};
```

执行 `bodyFactory(renderFn)` 后返回文档组件渲染工具集，该工具集包含三个方法：

+ render: 文档组件渲染方法，调用该方法后，才真正将组件渲染至body中
+ update: 文档组件更新方法，调用该方法后，可传递修改的props，更新body的渲染内容
+ destroy: 文档组件销毁方法，调用该方法后，可将组件从顶层销毁移除

### RenderFn 文档组件渲染方法

```typescript
type RenderFn = (props?: RenderProps) => void;
```

区别于主渲染函数，文档组件渲染方法是将组件渲染至文档流中的方法，主渲染函数则是处理怎么渲染内容的

### UpdateRenderFn 文档组件更新方法

```typescript
type UpdateRenderFn = (props?: RenderProps) => void;
```

调用该方法后，可传递修改的props，更新内容

### DestroyRenderFn 文档组件销毁方法

```typescript
type DestroyRenderFn = () => void;
```

调用该方法后，调用该方法后，可将组件从顶层销毁移除