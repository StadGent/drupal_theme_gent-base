'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import {deleteAsync} from 'del';
import plumber from 'gulp-plumber';

var globalConfig = {
  scriptsSrcDir: 'js',
  buildDir: '../build',
};

/*
 *
 * Validate JS files.
 *
 */
gulp.task('js:validate', function () {
  return gulp.src(globalConfig.scriptsSrcDir + '/**/*.js')
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
  return gulp.watch(globalConfig.scriptsSrcDir + '/**/*.js', gulp.series('js:validate'));
});

/*
 * Clean build directory.
 *
 * This deletes the build directory before recompiling.
 */
gulp.task('build:clean', function () {
  return deleteAsync(globalConfig.buildDir + '/**', {force: true});
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
 * Used to validate and build production ready code.
 * Don't add a build:clean task here, because it's already
 * populated by the scripts/install.sh.
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
