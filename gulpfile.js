'use strict';

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var exec = require('gulp-exec');

/* Minify all base code, edit in place */
gulp.task('minify_base_code', function() {
  return gulp.src(['css/common-files/*.css', 'css/userContent-files/*.css', 'css/userChrome-files/*'])
    .pipe(cleanCSS({
      level : 2 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});


/* Add everything to userContent */
gulp.task('userContent', function() {
  return gulp.src(['css/common-files/*.css', 'css/userContent-files/*.css'])
    .pipe(concatCss('userContent.css'))
    .pipe(gulp.dest('.'));
});


/* Add everything to userChrome */
gulp.task('userChrome', function() {
  return gulp.src(['css/common-files/*.css', 'css/userChrome-files/*.css'])
    .pipe(concatCss('userChrome.css'))
    .pipe(gulp.dest('.'));
});

/* Minify final user files */
gulp.task('minify_final', function() {
  return gulp.src(['userChrome.css', 'userContent.css'])
    .pipe(cleanCSS({
      level : 2 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});



/* Publish */
gulp.task('publish', gulp.series('minify_base_code', 'userChrome', 'userContent', 'minify_final'));



/* Gulp Push - used to push to GitHub and re-add internal UUIDs */
gulp.task('push', function() {
  return gulp.src('.')
    .pipe(exec('git push'))
});
