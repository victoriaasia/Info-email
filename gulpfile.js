'use strict';
const gulp = require('gulp'),
      mjml = require('gulp-mjml'),
      mjmlEngine = require('mjml'),
      minify = require('gulp-minifier'),
      inlineimg = require('gulp-inline-image'),
      browserSync = require('browser-sync').create();;

gulp.task('html', function () {
  return gulp.src('src/*.mjml')
    .pipe(mjml(mjmlEngine, {minify: false}))
    .pipe(gulp.dest('dest'))
});


// gulp.task('img', function () {
//   return gulp.src('dest/*.html')
//    .pipe(inlineimg('src'))
//    .pipe(gulp.dest('dest/final/'))
// });



gulp.task('build',
    gulp.parallel('html')
);
gulp.task('watch', function() {
  gulp.watch('./src/*.mjml', gulp.series('html'))
});
gulp.task('serve', () => {
  browserSync.init({
    server: 'dest',
    port: 8080,
    ui: {
      port: 8081,
    },
  })
  browserSync.watch('dest/*.*').on('change', browserSync.reload)
});

gulp.task('dev:watch', gulp.series('build', gulp.parallel('watch', 'serve')));
