# Gulp 简易入门笔记

## 安装
1. 首先要全局安装一遍

	`npm install gulp -g`
2. 到项目的根目录再安装一遍
	`npm install gulp --save-dev`

注:	
	* 根目录存在package.json文件
	* —save-dev这个属性会将条目保存到你package.json的devDependencies里面
	
## 安装Gulp插件
常用插件: 
	* sass的编译（gulp-ruby-sass）
	* 自动添加css前缀（gulp-autoprefixer）
	* 压缩css（gulp-minify-css）
	* js代码校验（gulp-jshint）
	* 合并js文件（gulp-concat）
	* 压缩js代码（gulp-uglify）
	* 压缩图片（gulp-imagemin）
	* 自动刷新页面（gulp-livereload）
	* 图片缓存，只有图片替换了才压缩（gulp-cache）
	* 更改提醒（gulp-notify）
	* 清除文件（del）
	
安装命令为`npm install gulp-ruby-sass --save-dev`

注:
	* 	安装时可同时写多个插件的名字

## 加载插件
1. 首先在根目录创建一个 `gulpfile.js `文件
2. 在文件中加载插件

```
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

});
```

## 建立任务
1. `gulp.task` 可以创建任务
2. `gulp.src` 设置需要处理的文件的路径，可以是多个文件以数组的形式`[a.scss, b.scss]`，或正则表达式`/**/*.scss`
3. `.pipe()` 将需要处理的文件导向插件
4. `gulp.dest` 设置生成文件的路径

## 清除文件

```
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});
```
注:
	* 在任务执行前，最好先清除之前生成的文件
	* 用一个回调函数（cb）确保在退出前完成任务

## 设置默认任务（default）
使用`gulp.task`创建任务，因为在`gulp.start()`里的任务执行的顺序是不确定的，所以将要在它们之前执行的任务写在数组里面

## 监听文件
用`gulp.watch`，监听文件的是否修改以便执行相应的任务

## 自动刷新页面
修改watch任务，配置LiveReload，实现当文件修改时自动刷新页面

```
gulp.task('watch', function() {
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
```

## 一个简单的demo

```
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
// Styles
gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))    
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});
// Clean
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
// Watch
gulp.task('watch', function() {
  // 监听 .scss 文件
  gulp.watch('src/styles/**/*.scss', ['styles']);
  // 监听 .js 文件
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  // 监听 image 文件
  gulp.watch('src/images/**/*', ['images']);
  // 配置 LiveReload 服务
  livereload.listen();
  // 监听 dist/目录下的所有文件, 有改动的时候就重新加载  
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
```


