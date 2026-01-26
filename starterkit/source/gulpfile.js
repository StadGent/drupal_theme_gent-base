'use strict';

import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import stylelint from 'gulp-stylelint-esm';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import eslint from 'gulp-eslint';
import minify from 'gulp-minify';
import { deleteAsync } from 'del';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import calc from 'postcss-calc';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';
import gifsicle from 'imagemin-gifsicle';
import svgo from 'imagemin-svgo';

const sass = gulpSass(dartSass);

const globalConfig = {
  scriptsSrcDir: 'js',
  scriptsMinDir: '../build/js',
  imgSrcDir: 'img',
  imgMinDir: '../build/img',
  sassDir: 'sass',
  cssDir: '../build/css',
  buildDir: '../build'
};

const SASS_LOAD_PATHS = [
  '../../../contrib/', // Make 'gent_base/...' available for @use.
  '../../../contrib/gent_base/build', // Make @use 'styleguide/...' available.
  '../../../contrib/gent_base/source/sass/shortcuts', // Make gent_base shortcuts available for @use.
  '../../../contrib/gent_base/source/node_modules/breakpoint-sass/stylesheets',
  '../../../custom/', // Make 'my_custom_theme/...' available for @use.
];

/**
 * Styles build task.
 *
 * Includes:
 * - Sass globbing
 * - SCSS linting
 * - Compresssed output style
 * - Autoprefixer
 */
gulp.task('styles:build', function () {
  return gulp.src(globalConfig.sassDir + '/**/*.s+(a|c)ss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(stylelint({
      failAfterError: true,
      fix: false,
      reporters: [
        { formatter: 'stylish', console: true },
      ],
      debug: false,
    }))
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: SASS_LOAD_PATHS,
      loadPaths: SASS_LOAD_PATHS,
    })).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(postcss([calc]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(globalConfig.cssDir));
});

/**
 * Styles dist task.
 *
 * Includes:
 * - Sass globbing
 * - SCSS linting
 * - Nested output style
 * - Sourcemaps (dev only!)
 * - Autoprefixer
 */
gulp.task('styles:dist', function () {
  return gulp.src(globalConfig.sassDir + '/**/*.s+(a|c)ss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: SASS_LOAD_PATHS,
      loadPaths: SASS_LOAD_PATHS,
    })).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(globalConfig.cssDir));
});

/**
 * Validate SCSS files.
 */
gulp.task('styles:validate', () => {
  return gulp.src(globalConfig.sassDir + '/**/*.s+(a|c)ss')
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
 */
gulp.task('styles:watch', function () {
  return gulp.watch([
    globalConfig.sassDir + '/**/*.scss',
    '../../../contrib/gent_base/source/sass/**/*.scss'

  ], gulp.parallel('styles:dist', 'styles:validate'));
});

/**
 * JS files build task.
 *
 * Copies and minifies your JS files to build/js/
 */
gulp.task('js:build', function () {
  return gulp.src(globalConfig.scriptsSrcDir + '/**/*.js')
    .pipe(plumber())
    .pipe(rename({dirname: ''}))
    .pipe(minify({
      noSource: true
    }))
    .pipe(gulp.dest(globalConfig.scriptsMinDir));
});

/**
 * JS files dist task.
 *
 * Copies your JS files to build/js/
 * No minification is done here!
 */
gulp.task('js:dist', function () {
  return gulp.src(globalConfig.scriptsSrcDir + '/**/*.js')
    .pipe(plumber())
    .pipe(rename({
      dirname: '',
      suffix: '-min'
    }))
    .pipe(gulp.dest(globalConfig.scriptsMinDir));
});

/**
 * Validate JS files.
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

/**
 * Watch JS files For Changes.
 */
gulp.task('js:watch', function () {
  return gulp.watch(globalConfig.scriptsSrcDir + '/**/*.js', gulp.parallel('js:dist', 'js:validate'));
});

/**
 * Minify images.
 */
gulp.task('images:minify', function () {
  return gulp.src(globalConfig.imgSrcDir + '/**/*.{png,jpg,jpeg,gif,svg}', {
    encoding: false,
    base: globalConfig.imgSrcDir
  })
    .pipe(plumber())
    .pipe(imagemin([
      pngquant({ quality: [0.6, 0.8] }),
      mozjpeg({ quality: 75, progressive: true }),
      gifsicle({ interlaced: true }),
      svgo({
        plugins: [{
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false
            }
          }
        }]
      })
    ]))
    .pipe(gulp.dest(globalConfig.imgMinDir));
});

/**
 * Clean build directory.
 *
 * This deletes the build directory before recompiling.
 */
gulp.task('build:clean', function () {
  return deleteAsync(globalConfig.buildDir + '/**', {force: true});
});

/**
 * Validate task.
 *
 * Used to only validate the SCSS and JS code.
 *
 * Usage:
 *  gulp validate
 */
gulp.task('validate', gulp.parallel('styles:validate', 'js:validate'));

/**
 * Compile the theme.
 *
 * Used build the SCSS and JS code. This also minifies images.
 *
 * Usage:
 *  gulp compile
 */
gulp.task('compile', gulp.series('build:clean', gulp.parallel('styles:build', 'js:build', 'images:minify')));
gulp.task('compile:dev', gulp.series('build:clean', gulp.parallel('styles:dist', 'js:dist', 'images:minify')));

/**
 * Build task:
 *
 * Used to validate and build production ready code.
 *
 * Usage:
 *  gulp build
 */
gulp.task('build', gulp.series('build:clean', gulp.parallel('validate', 'compile')));

/**
 * Default tasks.
 *
 * Used for local development to compile and validate after every change.
 *
 * Usage:
 *  gulp
 *  gulp watch
 */
gulp.task('default', gulp.parallel('styles:watch', 'js:watch'));
gulp.task('watch', gulp.series('default'));
