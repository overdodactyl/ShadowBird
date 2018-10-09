'use strict';

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var exec = require('gulp-exec');

/* Minify all base code, edit in place */
gulp.task('minify_base_code', function() {
  return gulp.src(['css/*.css'])
    .pipe(cleanCSS({
      level : 2 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});


/* Add everything to userChrome */
gulp.task('userChrome', function() {
  return gulp.src(['css/*.css'])
    .pipe(concatCss('userChrome.css'))
    .pipe(gulp.dest('.'));
});

/* Minify final user files */
gulp.task('minify_final', function() {
  return gulp.src(['userChrome.css'])
    .pipe(cleanCSS({
      level : 2 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest(function(file) {
      return file.base;
    }));
});


/* All */
gulp.task('all', gulp.parallel('userChrome', function() {
  return gulp.src(['userChrome.css'])
    .pipe(cleanCSS({
      level : 1 ,
      format: 'beautify'
    }))
    .pipe(gulp.dest('.'));
}));

/* Publish */
gulp.task('publish', gulp.series('minify_base_code', 'userChrome', 'minify_final'));



/* Gulp Push - used to push to GitHub and re-add internal UUIDs */
gulp.task('push', function() {
  return gulp.src('.')
    .pipe(exec('git push'))
});
