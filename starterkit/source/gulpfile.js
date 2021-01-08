'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minify = require('gulp-minify');
var del = require('del');
var plumber = require('gulp-plumber');

var globalConfig = {
  scripts_src_dir: 'js',
  scripts_min_dir: '../build/js',
  img_src_dir: 'img',
  img_min_dir: '../build/img',
  sass_dir: 'sass',
  css_dir: '../build/css',
  build_dir: '../build'
};

const includePaths = [
  '../../../contrib/gent_base/source/node_modules/breakpoint-sass/stylesheets',
  '../../../contrib/gent_base/source/node_modules/susy/sass'
];

/*
 *
 * Styles build task.
 * Includes:
 *  Sass globbing
 *  SCSS linting
 *  Compresssed output style
 *  Autoprefixer
 *
 */
gulp.task('styles:build', function () {
  return gulp.src(globalConfig.sass_dir + '/**/*.s+(a|c)ss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths
    })).on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(globalConfig.css_dir))
});

/*
 *
 * Styles dist task.
 * Includes:
 *  Sass globbing
 *  SCSS linting
 *  Nested output style
 *  Sourcemaps (dev only!)
 *  Autoprefixer
 *
 */
gulp.task('styles:dist', function () {
  return gulp.src(globalConfig.sass_dir + '/**/*.s+(a|c)ss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested',
      includePaths
    })).on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(globalConfig.css_dir))
});

/*
 *
 * Validate SCSS files.
 *
 */
gulp.task('styles:validate', function () {
  return gulp.src(globalConfig.sass_dir + '/**/*.s+(a|c)ss')
    .pipe(plumber())
    .pipe(sassLint({
      configFile: './.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

/*
 *
 * Watch SCSS files For Changes.
 *
 */
gulp.task('styles:watch', function () {
  return gulp.watch(globalConfig.sass_dir + '/**/*.scss', gulp.parallel('styles:dist', 'styles:validate'));
});

/*
 *
 * JS files build task.
 *
 * Copies and minifies your JS files to build/js/
 *
 */
gulp.task('js:build', function () {
  return gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
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
gulp.task('js:dist', function () {
  return gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
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
gulp.task('js:validate', function () {
  return gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
    .pipe(plumber())
    .pipe(eslint({
      configFile: './.eslintrc'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

/*
 *
 * Watch JS files For Changes.
 *
 */
gulp.task('js:watch', function () {
  return gulp.watch(globalConfig.scripts_src_dir + '/**/*.js', gulp.parallel('js:dist', 'js:validate'));
});

/*
 *
 * Minify images.
 *
 */
gulp.task('images:minify', gulp.series('styles:build', function (cb) {
  gulp.src([
    globalConfig.img_src_dir + '/**/*.png',
    globalConfig.img_src_dir + '/**/*.jpg',
    globalConfig.img_src_dir + '/**/*.gif',
    globalConfig.img_src_dir + '/**/*.jpeg',
    globalConfig.img_src_dir + '/**/*.svg'
  ])
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(globalConfig.img_min_dir)).on('end', cb).on('error', cb);
}));

/*
 * Clean build directory.
 *
 * This deletes the build directory before recompiling.
 */
gulp.task('build:clean', function (cb) {
  return del(globalConfig.build_dir + '/**', {force:true});
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
gulp.task('validate', gulp.parallel('styles:validate', 'js:validate'));

/*
 * Compile the theme.
 * Usage:
 *  gulp compile
 *
 *  Used build the SCSS and JS code. This also minifies images.
 */
gulp.task('compile', gulp.series('build:clean', gulp.parallel('styles:build', 'js:build', 'images:minify')));
gulp.task('compile:dev', gulp.series('build:clean', gulp.parallel('styles:dist', 'js:dist', 'images:minify')));

/*
 *
 * Build task:
 * Usage:
 *  gulp build
 *
 *  Used to validate and build production ready code.
 *
 */
gulp.task('build', gulp.series('build:clean', gulp.parallel('validate', 'compile')));

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
gulp.task('default', gulp.parallel('styles:watch', 'js:watch'));
gulp.task('watch', gulp.series('default'));
