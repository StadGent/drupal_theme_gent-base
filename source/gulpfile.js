'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import {deleteAsync} from 'del';
import plumber from 'gulp-plumber';
import sassGlob from 'gulp-sass-glob';
import stylelint from 'gulp-stylelint-esm';
import gulpif from 'gulp-if';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import postcss from 'gulp-postcss';
import calc from 'postcss-calc';
import { normalizeCkeditorCss } from './gulp/ckeditor-css.js';

var globalConfig = {
  scriptsSrcDir: 'js',
  buildDir: '../build',
  sassDir: 'sass',
  cssDir: '../build/css',
};

let build = false;
const sass = gulpSass(dartSass);
const SASS_LOAD_PATHS = [
  '../../', // Make 'gent_base/...' available for @use.
  '../build', // Make @use 'styleguide/...' available.
];

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
    'styles:ckeditor',
  )));
});

/**
 * Compile base CKEditor stylesheet for subthemes to consume directly.
 */
gulp.task('styles:ckeditor', function () {
  return gulp.src(globalConfig.sassDir + '/ckeditor5.scss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: SASS_LOAD_PATHS,
      loadPaths: SASS_LOAD_PATHS,
    })).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(postcss([calc]))
    .pipe(normalizeCkeditorCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(globalConfig.cssDir));
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
gulp.task('build', gulp.parallel('validate', 'styles:ckeditor'));

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
