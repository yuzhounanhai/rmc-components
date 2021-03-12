## PickerView 多列滑动选择器

多列滑动选择器， 直接渲染在使用区域中。

`Picker` 引用了 `PickerView` 组件，使用弹窗窗口的交互方式。

#### 基本使用

```javascript
const dataWithoutCascade = [
  [
    {
      key: 'a1',
      value: 'a1',
    },
    {
      key: 'a2',
      value: 'a2',
    },
    {
      key: 'a3',
      value: 'a3',
    },
  ],
  [
    {
      key: 'b1',
      value: 'b1',
    },
    {
      key: 'b2',
      value: 'b2',
    },
  ],
];
<PickerView
  data={dataWithoutCascade}
  defaultValue={['a1', 'b2']}
  onChange={(v) => {
    console.log(v);
  }}
/>
```

#### 为什么使用 defaultValue 而不用 value？

很多情况下我们并不需要用value来进行双向数据绑定，仅在初始化时传入初始值并在后续数据变更时，父组件同步这个数据。这个时候 value 的作用是微乎其微的，defaultValue 将更佳适合。

#### 部分问题场景解决方案

+ 使用 defaultValue 时，默认数据需要请求接口获得，但是组件已经渲染了并使用了state的初始值，怎么办？

推荐你尝试下面两种解决方案：
1. 设置一个state： isReady，在 isReady 为 true 前，去请求预置数据，并setState，在 isReady 为 true 时再渲染页面（渲染该组件）这样 defaultValue 接收到的就是预置数据中的值

2. 使用 key值，key值与上一个key值不同时，组件不会更新，而是会重新渲染。

#### 级联数据 & 非级联数据

###### 多组并列选择数据源（非级联数据）

用于选择n个毫不相关的数据。

data数据源的格式是

```typescript
interface PickerImcascadeData {
  key: Key;
  value: React.ReactNode;
  [key: string]: any;
};
```

举个栗子：

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
]
```

上述栗子表示data是一个多组并列选择数据源。

这个数据源共有2组：

```javascript
const data = [
  [],
  [],
];
```

第一组中共有2个选项2013、2014

```javascript
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
```

第二组中共有2个选项春、秋

```javascript
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
```

#### 多对象级联选择数据源（级联数据）

当选项之间有关联，那么请使用多对象级联选择数据源格式

如下面的场景适合级联选择数据源

例一： 2008年的1月有31天，2月有29天，2009年的2月有28天，这个时候日期的选择与年、月有关，需要使用这一数据格式。

例二： 中国有浙江省、福建省等，浙江省有杭州市、嘉兴市等，杭州市有西湖区、滨江区等，福建省有福州市等；市级城市与省份挂钩、区县与市级城市挂钩，使用级联选择

级联选择数据源的格式：

```typescript
interface PickerCascadeData {
  key: Key;
  value: React.ReactNode;
  children?: PickerCascadeData[];
  [key: string]: any;
};
```

举个实例：

```javascript
const data = [
  {
    value: '北京',
    key: '01',
    children: [
      {
        value: '东城区',
        key: '01-1',
      },
      {
        value: '西城区',
        key: '01-2',
      },
      {
        value: '崇文区',
        key: '01-3',
      },
      {
        value: '宣武区',
        key: '01-4',
      },
    ],
  },
  {
    value: '浙江',
    key: '02',
    children: [
      {
        value: '杭州',
        key: '02-1',
        children: [
          {
            value: '西湖区',
            key: '02-1-1',
          },
          {
            value: '上城区',
            key: '02-1-2',
          },
          {
            value: '江干区',
            key: '02-1-3',
          },
          {
            value: '下城区',
            key: '02-1-4',
          },
        ],
      },
      {
        value: '宁波',
        key: '02-2',
        children: [
          {
            value: 'xx区',
            key: '02-2-1',
          },
          {
            value: 'yy区',
            key: '02-2-2',
          },
        ],
      },
      {
        value: '温州',
        key: '02-3',
      },
      {
        value: '嘉兴',
        key: '02-4',
      },
      {
        value: '湖州',
        key: '02-5',
      },
      {
        value: '绍兴',
        key: '02-6',
      },
    ],
  },
];
```

#### 简单实例(伪代码)

+ 并列

```javascript
const data = [
  [
    {
      key: '2013',
      value: '2013',
    },
    {
      key: '2014',
      value: '2014',
    },
  ],
  [
    {
      key: '春',
      value: '春',
    },
    {
      key: '夏',
      value: '夏',
    },
  ],
];

<PickerView
  data={data}
  defaultValue={['2014', '春']}
  onChange={(v) => {
    console.log(v);
  }}
/>
```

+ 级联

```javascript
const data = [
  {
    value: '北京',
    key: '01',
    children: [
      {
        value: '东城区',
        key: '01-1',
      },
      {
        value: '西城区',
        key: '01-2',
      },
      {
        value: '崇文区',
        key: '01-3',
      },
      {
        value: '宣武区',
        key: '01-4',
      },
    ],
  },
  {
    value: '浙江',
    key: '02',
    children: [
      {
        value: '杭州',
        key: '02-1',
        children: [
          {
            value: '西湖区',
            key: '02-1-1',
          },
          {
            value: '上城区',
            key: '02-1-2',
          },
          {
            value: '江干区',
            key: '02-1-3',
          },
          {
            value: '下城区',
            key: '02-1-4',
          },
        ],
      },
      {
        value: '宁波',
        key: '02-2',
        children: [
          {
            value: 'xx区',
            key: '02-2-1',
          },
          {
            value: 'yy区',
            key: '02-2-2',
          },
        ],
      },
      {
        value: '温州',
        key: '02-3',
      },
      {
        value: '嘉兴',
        key: '02-4',
      },
      {
        value: '湖州',
        key: '02-5',
      },
      {
        value: '绍兴',
        key: '02-6',
      },
    ],
  },
];

<PickerView
  data={data}
  defaultValue={['01', '01-1']}
  onChange={(v) => {
    console.log(v);
  }}
  // 从数据来看, 部分城市有区县选择, 部分城市没有, 因此为了减少列的变动, 可以设置最小显示3级
  minCols={3}
/>
```

## API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| prefixCls | class 前缀 | string | - | - |
| className | class | string | - | - |
| data | 数据（可以选择级联、非级联两种形式的数据） | PickerImcascadeData[][] &#124; PickerCascadeData[] | - | - |
| defaultValue | 初始化时的默认值 | string[] | - | - |
| defaultShowCount | 在可视区域中每组选择列显示多少个可供选择项 | number | 6 | - |
| minCols | 最少显示多少组选择列（参考上文级联数据层级会在2/3级变动的例子） | - | - |
| onChange | 当选择项改变时触发回调 | (value: Key[]) => void | - | - |