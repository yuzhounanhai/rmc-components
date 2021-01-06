module.exports = {
  // https://www.jestjs.cn/docs/configuration

  // 默认值会根据执行的测试文件数量而决定，仅有一
  // 个测试文件时，默认为true，否则默认值为false
  // 指示是否应在运行期间报告每个单独的测试（的执行情况）
  // 所有运行错误的测试用例也将在执行后展示在底部。
  verbose: true,
  // type: array default: []
  // 一个路径数组，路径所对应的模块可以用来设置/配置测试
  // 环境。每个setupFile将对每个测试文件运行一次。这些脚
  // 本将在执行测试代码之前。setupFiles在环境中安装测试
  // 框架之前执行
  setupFiles: [
    './tests/setup.js',
  ],
  // type: array default: []
  // 与 setupFiles 相似，都是在执行测试代码之前执行，
  // setupFilesAfterEnv 将在测试环境准备好之后执行，
  // 因此 setupFiles 先于 setupFilesAfterEnv 执行。
  setupFilesAfterEnv: [
  ],
  // type: string[], Default: ["js", "jsx", "ts", "tsx", "json", "node"]
  // 类似于 webpack 的 resolve.extensions, 当引用模块缺省文件后缀时，
  // 将根据该数组所提供的后缀，依次去匹配模块。
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
  ],
  // object<string, string | array<string>>
  // default: null
  // 正则表达式到模块名称或模块名称数组的映射
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/components/$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  // type: string[]
  // Default: ["/node_modules/", "\\.pnp\\.[^\\\/]+$"]
  // 设置哪些文件不需要转译
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  // type: array
  // default: undefined
  // 从提供的 glob patterns 收集测试覆盖率信息，即使该文件不包含
  // 测试文件, 也会收集该文件的测试覆盖率
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
  ],
  // 指定搜索测试文件的范围, 规定了在哪些目录范围及什么规
  // 则下的文件才是测试文件, 如果超出了圈定的范围, 或者命
  // 名相关不符合如下限制, 则jest不会认为这个是测试文件.
  testMatch: [
    "<rootDir>/components/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/components/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  // type: string, default: node
  // 指定设置测试环境, 常用的值有: jest-environment-jsdom-fourteen、
  // enzyme等.
  testEnvironment: 'jest-environment-jsdom-fourteen',
  // 此选项设置jsdom环境的URL。它反映在诸如location.href之类的属性中。
  testURL: 'http://localhost',
};