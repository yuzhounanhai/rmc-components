## Slide 滑入滑出过渡动画

可以使用 Slide 组件包裹元素，使其获得滑入滑出的动画效果。

#### 底层实现

Slide 组件封装了一套与滑入滑出有关的行为表现，实际上是为元素附加淡入淡出有关的 CSS transition 相关的样式来实现的，因此一些与transition 动画有关的 CSS 样式，都将影响到 Slide 组件。

对于这种已经携带 `transition`、`transform` 等相关 CSS 样式的元素，若要应用 Slide 组件，推荐使用一个元素（如 `div`）将其包裹，以免 Fade 组件的行为影响原元素的表现。

#### 初始状态不显示动画

```javascript
<Slide show={true}>
  <span>content</span>
</Slide>
```
对于上述代码，Slide 组件接受到的显示状态为显示，在渲染时，content 并不会呈现滑入的效果，因为 `true` 值是 `<Slide>` 组件接受到的初始状态，对于初始状态，`<Slide>` 将直接渲染该状态的最终结果，待参数 `show` 后续改变时，才会呈现出滑入滑出的过渡效果。

#### SlideIn

当参数 `show` 接受到 `true` 初始值时，（`<Slide>` 组件不渲染初始过渡效果）但任然有需求在初始值为 `true` 时展示过渡效果时，可以使用 `<SlideIn>` 组件。

`<SlideIn>` 与 `<Slide>` 组件的唯一不同是：当参数 `show` 的初始值为 `true` 时，会进行滑入过渡。

#### 基本使用

```javascript
function Test() {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  }, []);

  return (
    <Slide
      show={isShow}
      direction="up"
    >
      <span>content</span>
    </Slide>
  );
}
```

#### API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| show | 元素是否滑入 | boolean | false | - |
| speed | 过渡效果的时间，即 `transition-duration`, 单位s | number | 0.5 | - |
| delay | 过渡延迟，即 `transition-delay`, 单位s | number | - | - |
| direction | 滑入的方向（滑出时将与滑入时相反） | StandardDirections &#124; '↑' &#124; '↓' &#124; '←' &#124; '→' | 'down' | - |
| opacityTst | 滑入滑出时是否分别添加渐入渐出效果 | boolean | true | - |
| limitTstProperty | 是否限制参与过渡的属性，如若不限制，`transition-property` 的值为 `all`, 如若限制，则被限制为只有 `<Slide>` 组件使用到的相关 CSS 属性 | boolean | false | - |
| needDestroy | 在不显示时，是否销毁元素，设置为 `false` 时，该元素仅被附加 `opacity: 0` 的样式 | boolean | false | - |
| timingFunction | 滑入滑出时的动效函数，即 `transition-timing-function` | string | 'ease' | - |
| showTimingFunction | 滑入时的动效函数，即 `transition-timing-function`, 该配置优先级比 `timingFunction` 配置高 | string | - | - |
| hideTimingFunction | 滑出时的动效函数，即 `transition-timing-function`, 该配置优先级比 `timingFunction` 配置高 | string | - | - |
| prefixCls | class 前缀 | string | - | - |
| onTransitionEnd | transition 动画结束时触发回调 | (e: TransitionEvent) => void | - | - |
| onShow | 滑入动画结束时触发回调 | (direction: StandardDirections) => void | - | - |
| onHide | 滑出动画结束时触发回调 | (direction: StandardDirections) => void | - | - |
| onChange | 滑入滑出动画结束时都触发 | (direction: StandardDirections, isEnter: boolean) => void | - | - |


#### 附录：API 中使用到的相关类型

```typescript
type StandardDirections = 'up' | 'down' | 'left' | 'right';
```