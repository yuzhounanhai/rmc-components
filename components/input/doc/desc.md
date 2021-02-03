## Input 输入框组件

输入框组件提供了部分输入场景的封装能力，例如文本输入框、手机号码输入框、密码输入框、快速清除输入值等。

#### 其他类型输入框

其他类型输入框，如密码输入框、号码输入框，被附加在 `Input` 变量上，你可以通过解构的方式读取并使用。

```javascript
const {
  Password,
  Phone,
} = Input;
// 使用
<Password
  {...}
/>
<Phone
  {...}
/>
// 直接使用
<Input.Password
  {...}
/>
<Input.Phone
  {...}
/>
```

#### 基本使用

```javascript
function Demo() {
  const [v, setV] = useState('');
  return (
    <Input
      value={v}
      onChange={(newValue) => {
        setV(newValue);
      }}
    />
  );
}
```

#### API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| prefixCls | class 前缀 | string | - | - |
| className | class | string | - | - |
| maxLength | 最大可输入长度 | number | - | - | - |
| defaultValue | 输入框初始值 | string | - | - | - |
| value | 输入框值 | string | - | - | - |
| placeholder | 输入框占位提示文案 | string | - | - | - |
| clear | 是否允许快速清除功能 | boolean | false | - | - |
| type | 输入框的类型，如 `password/text/number` 等，参考 Html input type 规范，数字 `number` (为了尽量唤起带小数点的数字键盘，此类型并不是原生 `number`，而是 `<input type="text" pattern="[0-9]*" />` ); `digit` (表示原生的 `number` 类型) | string | 'text' | - |
| addonAfter | 在输入框尾部增加一些内容 | React.ReactNode | - | - |
| addonBefore | 在输入框前部增加一些内容 | React.ReactNode | - | - |
| disabled | 是否禁用 | boolean | false | - |
| onChange | 当输入框内容发生变化时触发该回调 | (value: string) => void | - | - |
| onHandleSelectionPos | 处理输入框的选中位置 | (currentValue: string, startPos: number | null, endPos: number | null) => { start?: number | null, end?: number | null } | - | - |

#### ref 接口

+ handlePosition: 处理选择位置，在一些特殊场景下，可能会造成输入光标重置的情况，可以使用这个方法去手动修正。

+ focus：使文本框聚焦

+ blur： 使文本框失焦

+ select：选中当前文本框的输入文本

#### Phone 输入框组件

Phone 输入框组件用以输入手机号码，并在手机号码的第三位、第七位后面增加空格，增加可读性。

Phone 输入框组件在号码中间黏贴场景下可能会存在光标位置异常的问题。

Phone 输入框组件拥有和 Input 组件相同的 API 和 ref 接口

#### Password 输入框组件

Password 输入框组件用以输入密码

Password 输入框组件继承了 Input 组件相同的 API，并提供了额外的 API:

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| pwdVisible | 组件是否显示一个按钮，用以令使用者可以通过该按钮达成密码可视的目的 | boolean | false | - |

Password 输入框组件拥有和 Input 组件相同的 ref 接口。