'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var copy = require('gulp-contrib-copy');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var es = require('event-stream');
var minify = require('gulp-minify');
var del = require('del');
var sequence = require('run-sequence');
var plumber = require('gulp-plumber');

var globalConfig = {
  scripts_src_dir: 'js',
  scripts_min_dir: '../build/js',
  build_dir: '../build'
};

/*
 *
 * JS files build task.
 *
 * Copies and minifies your JS files to build/js/
 *
 */
gulp.task('js:build', function() {
  gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
    .pipe(plumber())
    .pipe(rename({dirname: ''}))
    .pipe(minify({
      noSource: true
    }))
    .pipe(gulp.dest(globalConfig.scripts_min_dir));
});

/*
 *
 * JS files dist task.
 *
 * Copies your JS files to build/js/
 * No minification is done here!
 *
 */
gulp.task('js:dist', function() {
  gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
    .pipe(plumber())
    .pipe(rename({
      dirname: '',
      suffix: "-min",
    }))
    .pipe(gulp.dest(globalConfig.scripts_min_dir));
});

/*
 *
 * Validate JS files.
 *
 */
gulp.task('js:validate', function() {
  return gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
    .pipe(plumber())
    .pipe(eslint({
      configFile: './.eslintrc'
    }))
    .pipe(eslint.format())
});

/*
 * Clean build directory.
 *
 * This deletes the build directory before recompiling.
 */
gulp.task('build:clean', function(cb) {
  return del(globalConfig.build_dir + '/**', {force:true});
});

/*
 *
 * Default tasks:
 * Usage:
 *  gulp
 *  gulp watch
 *
 * Used for local development to compile and validate after every change.
 *
 */
gulp.task('default', function (done) {
  sequence('build:clean', ['validate', 'compile'], done);
});


/*
 *
 * Validate task:
 * Usage:
 *  gulp validate
 *
 *  Used to only validate the SCSS and JS code.
 *
 */
gulp.task('validate', ['js:validate']);

/*
 * Compile the theme.
 * Usage:
 *  gulp compile
 *
 *  Used build the SCSS and JS code. This also minifies images.
 */
gulp.task('compile', function (done) {
  sequence('build:clean', ['js:build'], done);
});

gulp.task('compile:dev', function (done) {
  sequence('build:clean', ['js:dist'], done);
});

/*
 *
 * Build task:
 * Usage:
 *  gulp build
 *
 *  Used to validate and build production ready code.
 *
 */
gulp.task('build', function (done) {
  sequence('build:clean', ['validate', 'compile'], done);
});
