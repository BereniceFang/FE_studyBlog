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
