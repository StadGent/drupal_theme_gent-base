'use strict';

import gulp from "gulp";
import eslint from "gulp-eslint";
import {deleteAsync} from 'del';
import plumber from "gulp-plumber";

var globalConfig = {
  scripts_src_dir: 'js',
  build_dir: '../build'
};

/*
 *
 * Validate JS files.
 *
 */
gulp.task('js:validate', function () {
  return gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
    .pipe(plumber())
    .pipe(eslint({
      configFile: './.eslintrc'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/*
 *
 * Watch JS files For Changes.
 *
 */
gulp.task('js:watch', function () {
  return gulp.watch(globalConfig.scripts_src_dir + '/**/*.js', gulp.series('js:validate'));
});

/*
 * Clean build directory.
 *
 * This deletes the build directory before recompiling.
 */
gulp.task('build:clean', function () {
  return deleteAsync(globalConfig.build_dir + '/**', {force: true});
});

/*
 *
 * Validate task:
 * Usage:
 *  gulp validate
 *
 *  Used to validate JS code.
 *
 */
gulp.task('validate', gulp.series('js:validate'));

/*
 *
 * Build task:
 * Usage:
 *  gulp build
 *
 *  Used to validate and build production ready code.
 *
 */
gulp.task('build', gulp.parallel('validate'));

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
gulp.task('default', gulp.series('js:watch'));
gulp.task('watch', gulp.series('default'));
