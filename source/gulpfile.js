'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import {deleteAsync} from 'del';
import plumber from 'gulp-plumber';
import sassGlob from 'gulp-sass-glob';
import sassLint from 'gulp-sass-lint';
import cache from 'gulp-cached';
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
 *  Sass globbing
 *  SassLint
 */
gulp.task('styles:validate', () => {
  return _sassFiles()
    .pipe(cache('styles:validate'))
    .pipe(sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe(gulpif(build, sassLint.failOnError()))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
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
gulp.task('default', gulp.series('js:watch'));
gulp.task('watch', gulp.series('default'));
