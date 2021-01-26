从 0 搭建 react + ts + webpack 环境

## 使用 babel-plugin-import 支持按需加载

+ 安装 babel-plugin-import

```
npm install babel-plugin-import --save-dev
```

+ 在 babel 的配置文件中配置 plugin

可以在 package.json\.babelrc 等位置配置 babel

以 babelrc 配置文件为例（需自行删除代码中所有注释）
```javascript
{
  // "presets": ...
  "plugins": [
    // ...
    [
      "babel-plugin-import",
      {
        // 使用组件时自动附带上该组件的css样式
        "style": "css",
        "libraryDirectory": "es",
        "libraryName": "rmc-components"
      }
    ]
  ]
}
```
#### 按需加载支持 less 变量自定义

使用 `babel-plugin-import` 支持按需加载（含样式），你可以设置 `"style": true` 来加载 less 样式文件，并通过 `less-loader` 的 `modifyVars` 修改组件预设的变量。

通过这一方式，你可以更改组件的主题表现（颜色、大小等）。

1. 配置 `babel-plugin-import` 令其加载 less 格式的样式

```javascript
{
  // "presets": ...
  "plugins": [
    // ...
    [
      "babel-plugin-import",
      {
        // 使用组件时自动附带上该组件的less样式
        "style": true,
        "libraryDirectory": "es",
        "libraryName": "rmc-components"
      }
    ]
  ]
}
```

2. 增加 less\less-loader

```
npm install less less-loader --save-dev
```

3. 增加 webpack less 处理配置

```javascript
{
  test: /\.less$/,
  use： [
    // ...
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          modifyVars: {
            // ...
            '@baseFontSize': 100,
            // ...
          }
        }
      }
    }
  ]
}
```

`@baseFontSize` 设置一个 rem 的基础值，当设置这一基础值后，组件的大小将转换为 rem 值单位
其他支持更改的主题变量请查看 [主题变量](https://github.com/yuzhounanhai/rmc-components/blob/master/components/_style/theme.less)