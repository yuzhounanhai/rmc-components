const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const through2 = require('through2');
const del = require('del');

const cjsBabelConfig = require('./babel.cjs.config');
const esmBabelConfig = require('./babel.esm.config');

const paths = {
  dest: {
    lib: 'lib',
    es: 'es',
  },
  styles: 'components/**/style/*.less',
  indexStyles: 'components/**/style/index.less',
  _styles: 'components/_style/*.less',
  _indexStyles: 'components/_style/index.less',
  scripts: [
    'components/**/*.{ts,tsx}',
    '!components/**/demo/*.{ts,tsx}',
    '!components/**/__tests__/*.{ts,tsx}',
    '!components/_hook/**/__tests__/*.{ts,tsx}',
  ],
};

function delDirectory() {
  return del([
    paths.dest.lib,
    paths.dest.es,
    'types',
  ]);
}

/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css');
}

/**
 * 编译脚本文件
 * @param {string} babelEnv babel环境变量
 * @param {string} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  return gulp
    .src(scripts)
    .pipe(babel(
      babelEnv === 'esm' ? esmBabelConfig : cjsBabelConfig
    )) // 使用gulp-babel处理
    .pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        // 找到目标
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 处理文件内容
          file.path = file.path.replace(/index\.js/, 'css.js'); // 文件重命名
          this.push(file); // 新增该文件
          next();
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(destDir));
}

/**
 * 编译cjs
 */
function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.lib);
}

/**
 * 编译es
 */
function compileES() {
  const { dest } = paths;
  return compileScripts('esm', dest.es);
}

const buildScripts = gulp.series(compileCJS, compileES);

/**
 * 拷贝less文件
 */
function copyLess() {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.es));
}

function copyComponentsLess() {
  return gulp
    .src(paths._styles)
    .pipe(gulp.dest(paths.dest.lib + '/_style'))
    .pipe(gulp.dest(paths.dest.es + '/_style'));
}

/**
 * 生成css文件
 */
function less2css() {
  return gulp
    .src(paths.indexStyles)
    .pipe(less()) // 处理less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.es));
}

function componentsLess2css() {
  return gulp
    .src(paths._indexStyles)
    .pipe(less()) // 处理less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
    .pipe(gulp.dest(paths.dest.lib + '/_style'))
    .pipe(gulp.dest(paths.dest.es + '/_style'));
}

const build = gulp.parallel(buildScripts, copyLess, copyComponentsLess, less2css, componentsLess2css);

const flow = gulp.series(delDirectory, build);

exports.default = flow;