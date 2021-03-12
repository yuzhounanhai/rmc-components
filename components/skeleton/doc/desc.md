## Skeleton 骨架屏

占位图形组合加载态，可以预先展示一部分基础结构以改善交互体验。

#### 基础使用

```javascript
<Skeleton
  avatar
  title
  paragraph
/>
```

#### 公共API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| prefixCls | class 前缀 | string | - | - |
| className | class | string | - | - |
| active | 是否处于加载动画 | boolean | false | - |
| style | 样式 | React.CSSProperties | - | - |

#### Skeleton.Avatar API

Skeleton.Avatar 允许你创建一个圆形头像的加载骨架元素

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| size | 大小, 可以传递诸如'50px'/'1rem'的值 | string | - | - |

#### Skeleton.Button API

Skeleton.Button 允许你创建一个类似于按钮的加载骨架元素

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| width | 骨架的宽度 | string | - | - |
| height | 骨架的高度 | string | - | - |
| shape | 按钮的形状，如圆角、矩形等 | 'smooth' &#124; 'round' &#124; 'default' | 'default' | - |


#### Skeleton.Title API

Skeleton.Title 允许你创建一个类似于标题的矩形加载骨架元素

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| width | 骨架的宽度 | string | - | - |
| height | 骨架的高度 | string | - | - |

#### Skeleton.Paragragh API

Skeleton.Paragragh 允许你创建一个类似于段落的矩形加载骨架元素

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| width | 最后一行骨架的宽度，当传递数组时，则数组的每一项对应每一行的宽度 | string &#124; string[] | '61%' | - |
| height | 段落每一行的高度 | string | - | - |
| rows | 段落的行数 | number | 3 | - |

#### Skeleton.Image API

Skeleton.Image 允许你创建一个图片加载骨架元素

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| width | 骨架的宽度 | string | - | - |
| height | 骨架的高度 | string | - | - |
| shape | 图片骨架的外观，如圆形、圆角、矩形 | 'circle' &#124; 'smooth' &#124; 'default' | 'default' | - |
| icon | 是否显示图片icon | boolean | true | - |

#### Skeleton.Element API

Skeleton.Element 允许你创建一个自定义元素的加载骨架元素

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| element | 使用什么标签创建承载元素，如'p'\'span'\'div'等 | keyof React.ReactHTML | 'div' | - |
| display | 承载容器的display属性 | string | - | - |


#### Skeleton.Article API

Skeleton.Article 是一个带有头像、标题、段落的组合结构

`<Skeleton/>` 默认使用的就是 `Skeleton.Article`

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| avatar | 是否显示头像 | boolean | false | - |
| title | 是否显示标题 | boolean | false | - |
| paragragh | 是否显示段落 | boolean | true | - |
| avatarConfig | 传递给头像的配置信息 | AvatarSkeletonProps | - | - |
| titleConfig | 传递给标题的配置信息 | TitleSkeletonProps | - | - |
| paragraphConfig | 传递给段落的配置信息 | ParagraphSkeletonProps | - | - |


#### 自定义结构

你可以使用上述提供的各个元素自己封装自己的骨架屏结构组件。