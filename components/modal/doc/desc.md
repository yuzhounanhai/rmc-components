## Modal 模态框交互组件

Modal 模态框交互组件提供了信息提示、确认的浮层交互能力，它拥有比 Toast 组件更强的信息提示能力（需要用户确认消息并关闭）。

#### 基本使用

```javascript
function Demo() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        button
      </button>
      <Modal
        visible={visible}
        onCancel={() => {
          console.log('click cancel');
          setVisible(false);
        }}
        onOk={() => {
          console.log('click ok');
          setVisible(false);
        }}
        onHide={() => {
          console.log('Modal hide transition completed.');
        }}
        onShow={() => {
          console.log('Modal show transition completed.');
        }}
      >
        Modal Content
      </Modal>
    </div>
  );
}
```

#### 隐藏时销毁 Modal 组件

`Modal` 的 `visible` 参数控制 `Modal` 的展示/隐藏。如若你希望能够真正在隐藏时销毁 `Modal` 组件，可以额外增加一个变量用以控制 Modal 组件的渲染，并在 `onHide` 回调中设置该变量。

你可以根据自身情况，将模态框组件进行再封装，获得完整的动画与销毁能力。

```javascript
function Demo() {
  const [visible, setVisible] = useState(false);
  const [isPaint, setIsPaint] = useState(false);
  const showModal = () => {
    setVisible(true);
    setIsPaint(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const destoryModal = () => {
    setIsPaint(false);
  };
  return (
    <div>
      <button
        onClick={showModal}
      >
        button
      </button>
      {
        isPaint && (
          <Modal
            visible={visible}
            onCancel={() => {
              console.log('click cancel');
              hideModal();
            }}
            onOk={() => {
              console.log('click ok');
              hideModal();
            }}
            onHide={() => {
              console.log('Modal hide transition completed.');
              destoryModal();
            }}
          >
            Modal Content
          </Modal>
        )
      }
    </div>
  );
}
```

#### 自定义模态框

如果你只希望应用浮层交互能力，去实现例如弹屏广告等，可以使用自定义模态框。

自定义模态框的 children 允许接受一个函数，并获得 2 个触发回调的方法。

```javascript
function Demo() {
  const [visible, setVisible] = useState(true);
  return (
    <Modal
      visible={visible}
      customStructure
      onCancel={() => {
        console.log('trigger cancel');
      }}
      onOk={() => {
        console.log('trigger ok');
      }}

    >
      {
        (triggerOnOk, triggerOnCancel) => (
          <div>
            <button onClick={triggerOnOk}>ok</button>
            <button onClick={triggerOnCancel}>cancel</button>
          </div>
        )
      }
    </Modal>
  );
}
```

#### 快速创建 Modal

如若你要创建一些十分轻量的提示型模态框，或者模态框内部与模态框的包裹组件的状态和参数无关，那么你可以通过函数的调用方式，快速的创建出模态框, 以此来降低 `render` 的复杂度。

```javascript
function Demo() {
  const showTip = () => {
    Modal.info({
      content: '提示信息',
      cancelText: '我知道了',
    });
  };
  const showConfirm = () => {
    Modal.confirm({
      content: '是否确认？',
      okText: '确认',
      cancelText: '我再想想',
      onOk: (close) => {
        console.log('click ok');
        close();
      },
    });
  };
  const showCustom = () => {
    Modal.showCustom({
      content: (_, triggerOnCancel) => (
        <div>
          <img src="..." alt="" />
          <button onClick={triggerOnCancel}>close</button>
        </div>
      ),
      maskClosable: false,
    });
  },
  return (
    <div>
      <button onClick={showTip}>展示提示</button>
      <button onClick={showConfirm}>展示确认框</button>
      <button onClick={showCustom}>展示自定义模态框</button>
    </div>
  );
}
```

#### API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| prefixCls | class 前缀 | string | - | - |
| className | class | string | - | - |
| visible | 模态框是否可见 | boolean | true | - |
| width | 模态框的宽度 | string | - | - |
| mask | 是否显示蒙层 | boolean | true | - |
| maskClosable | 蒙层是否可以点击（点击时将触发onCancel回调） | boolean | false | - |
| confirmCareful | 小心确认模式，对于确认操作比较敏感的交互场景下，可以开启该模式，令确认按钮在左侧。 | boolean | false | - |
| confirmable | 是否显示确认按钮 | boolean | false | - |
| title | 模态框的标题区域内容 | React.ReactNode | - | - |
| cancelText | 取消按钮的文案 | React.ReactNode | '取消' | - |
| okText | 确认按钮的文案 | React.ReactNode | '确定' | - |
| closeCorner | 是否在内容的右上角区域显示一个关闭icon，用以触发 onCancel 回调 | boolean | false | - |
| footer | 自定义模态框底部 | React.ReactNode | - | - |
| customStructure | 是否自定义结构，自定义结构下，与模态框相关的一切配置如按钮文案、标题等都将失效 | boolean | false | - |
| hideDestroy | 隐藏时是否销毁组件的DOM | boolean | true | - |
| onHide | 模态框隐藏时触发该回调 | () => void | - | - |
| onShow | 模态框显示时触发该回调 | () => void | - | - |
| onOk | 模态框确认回调 | () => void | - | - |
| onCancel | 模态框取消回调 | () => void | - | - |

#### QuickModal API

模态框快速创建的 API 与模态框的 API 基本类似，除以下：

+ children： 不存在 `children`，使用 `content` 代替

+ content: 与 Modal 的 children 等价

+ onCancel: (close: () => void) => void, 模态框取消回调

+ onOk: (close: () => void) => void, 模态框确认回调