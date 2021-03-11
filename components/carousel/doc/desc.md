## Carousel 走马灯轮播组件

基于 `Swiper` 二次封装的轮播样式组件。

#### 基本使用

```javascript
<Carousel
  dots
  autoplay
>
  <img src="1.png" alt="" onClick={() => {}} />
  <img src="2.png" alt="" onClick={() => {}} />
  <img src="3.png" alt="" onClick={() => {}} />
</Carousel>
```

#### Swiper 参数

由于该组件基于 `Swiper` 进行二次封装， 你可以使用 `Swiper` 的参数对该组件的默认配置进行覆盖，达到更多的可能性。

详情请查看：[Swiper 参数](https://swiperjs.com/swiper-api#parameters)

#### 基础API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | class | string | - | - |
| prefixCls | class 前缀 | string | - | - |
| autoplay | 是否自动滑动 | boolean &#124; AutoplayOptions | - | - |
| dots | 是否显示提示点 | boolean | false | - |
