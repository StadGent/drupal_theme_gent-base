'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import {deleteAsync} from 'del';
import plumber from 'gulp-plumber';
import sassGlob from 'gulp-sass-glob';
import stylelint from 'gulp-stylelint-esm';
import gulpif from 'gulp-if';

var globalConfig = {
  scriptsSrcDir: 'js',
  buildDir: '../build',
};

let build = false;

/**
 * Get the sassFiles.
 */
const _sassFiles = () => {
  return gulp.src(['sass/**/*.s+(a|c)ss'])
    .pipe(sassGlob());
};

/**
 * Validate SCSS files.
 * Includes:
 *  - Stylelint
 */
gulp.task('styles:validate', () => {
  return _sassFiles()
    .pipe(stylelint({
      failAfterError: false,
      fix: false,
      reporters: [
        { formatter: 'stylish', console: true },
      ],
      debug: false,
    }));
});

/**
 * Watch SCSS files For Changes.
 * Includes:
 *  Styles:validate
 *  Styles:dist
 */
gulp.task('styles:watch', () => {
  return gulp.watch('sass/**/*.s+(a|c)ss', gulp.series(gulp.parallel(
    'styles:validate',
  )));
});

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
    .pipe(gulpif(build, eslint.failAfterError()));
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
 *  Used to validate SASS and JS code.
 *
 */
gulp.task('validate', gulp.parallel('styles:validate', 'js:validate'));

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
gulp.task('default', gulp.parallel('js:watch', 'styles:watch'));
gulp.task('watch', gulp.series('default'));
