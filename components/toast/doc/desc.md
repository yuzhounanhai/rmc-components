## Toast 浮层提示

创建一个打断的Toast顶层提示信息。

#### 基本使用

```javascript
//...
Toast.info('提示信息');
//...
Toast.loading();
//...
Toast.hide();
//...
```

#### Toast API

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| prefixCls | class 前缀 | string | - | - |
| className | class | string | - | - |
| round | 是否应用 round 样式 | boolean | false | - |
| smooth | 是否应用 smooth 样式 | boolean | false | - |
| duration | 组件将显示多久（经过duration时间后将会触发隐藏回调）单位毫秒，当duration为0时，将不会隐藏 | number | 2000 | - |
| transitionSpeed | 过渡时间, 单位s，如 0.5 | number | - | - |
| at | toast 出现的位置 | 'top' &#124; 'bottom' &#124; 'center' | 'center' | - |
| icon | toast 显示一个 icon | React.ReactNode | - | - |
| onHide | toast 触发隐藏时回调 | () => void | - | - |
| content | Toast 的内容 | React.ReactNode | - | - |


#### Toast 预制快速创建方法

Toast 预先定制了一系列快速创建不同类型 Toast 的方法, 这些 Toast 方法可以使用上述 API 参数

+ 加载提示：Toast.loading(config);

```javascript
// 创建一个字样为“加载中...”，持续时间为一直加载的加载提示
Toast.loading();
// 创建一个自定义配置的加载提示
Toast.loading({
  content: 'loading..',
  duration: 3000,
});
```

+ 延迟加载提示：Toast.delayLoading(delay, config)

对于一些快响应场景，不希望对在一定时间内返回结果的请求展示加载提示，可以使用延迟加载，当超过延迟时间后才会出现加载提示。

```javascript
// 延迟300毫秒创建一个Toast.loading();
Toast.delayLoading(300);
// 延迟300毫秒创建一个
// Toast.loading({
//   content: 'loading..',
//   duration: 3000,
// });
Toast.delayLoading(300, {
  content: 'loading..',
  duration: 3000,
});
```

+ 信息提示：Toast.info(configOrContent);

```javascript
// 创建一个显示内容为“提示信息”的信息提示，并持续2s
Toast.info('提示信息');
// 创建一个可以自定义配置的信息提示。
Toast.info({
  content: '提示信息',
  duration: 3000,
  at: 'bottom',
});
```

+ 成功提示：Toast.success(configOrContent);

同 Toast.info 使用方式一致。只不过Toast.success会显示成功icon

+ 失败提示：Toast.fail(configOrContent);

同 Toast.info 使用方式一致。只不过Toast.fail会显示失败icon