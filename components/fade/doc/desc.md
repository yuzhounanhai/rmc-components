## Fade 淡入淡出过渡动画

可以使用 Fade 组件包裹元素，使其获得淡入淡出的动画效果。

#### 底层实现

Fade 组件封装了一套与淡入淡出有关的行为表现，实际上是为元素附加淡入淡出有关的 CSS transition 相关的样式来实现的，因此一些与transition 动画有关的 CSS 样式，都将影响到 Fade 组件。

对于这种已经携带 `transition`、`opacity` 相关 CSS 样式的元素，若要应用 Fade 组件，推荐使用一个元素（如 `div`）将其包裹，以免 Fade 组件的行为影响原元素的表现。

#### 初始状态不显示动画

```javascript
<Fade show={true}>
  <span>content</span>
</Fade>
```
对于上述代码，Fade 组件接受到的显示状态为显示，在渲染时，content 并不会呈现淡入的效果，因为 `true` 值是 `<Fade>` 组件接受到的初始状态，对于初始状态，`<Fade>` 将直接渲染该状态的最终结果，待参数 `show` 后续改变时，才会呈现淡入淡出的过渡效果。


#### FadeIn

当参数 `show` 接受到 `true` 初始值时，（`<Fade>` 组件不渲染初始过渡效果）但任然有需求在初始值为 `true` 时展示过渡效果时，可以使用 `<FadeIn>` 组件。

`<FadeIn>` 与 `<Fade>` 组件的唯一不同是：当参数 `show` 的初始值为 `true` 时，会进行淡入过渡。

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
    <Fade
      show={isShow}
    >
      <span>content</span>
    </Fade>
  );
}
```

#### API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| show | 元素是否显示 | boolean | false | - |
| speed | 过渡效果的时间，即 `transition-duration`, 单位s | number | 0.5 | - |
| delay | 过渡延迟，即 `transition-delay`, 单位s | number | - | - |
| limitTstProperty | 是否限制参与过渡的属性，如若不限制，`transition-property` 的值为 `all`, 如若限制，则被限制为只有 `Fade` 组件使用到的相关 CSS 属性 | boolean | false | - |
| needDestroy | 在不显示时，是否销毁元素，设置为 `false` 时，该元素仅被附加 `opacity: 0` 的样式 | boolean | false | - |
| timingFunction | 渐入渐出时的动效函数，即 `transition-timing-function` | string | 'ease' | - |
| showTimingFunction | 渐入时的动效函数，即 `transition-timing-function`, 该配置优先级比 `timingFunction` 配置高 | string | - | - |
| hideTimingFunction | 渐出时的动效函数，即 `transition-timing-function`, 该配置优先级比 `timingFunction` 配置高 | string | - | - |
| prefixCls | class 前缀 | string | - | - |
| onTransitionEnd | transition 动画结束时触发回调 | (e: TransitionEvent) => void | - | - |
| onShow | 淡入动画结束时触发回调 | () => void | - | - |
| onHide | 淡出动画结束时触发回调 | () => void | - | - |
| onChange | 淡入淡出动画结束时都触发 | (isShow: boolean) => void | - | - |
