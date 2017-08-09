'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var copy = require('gulp-contrib-copy');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var imageop = require('gulp-image-optimization');
var es = require('event-stream');
var minify = require('gulp-minify');
var csscomb =require('gulp-csscomb');
var bump = require('gulp-bump');
var del = require('del');
var sequence = require('run-sequence');

var globalConfig = {
  scripts_src_dir: 'js',
  scripts_min_dir: '../build/js',
  img_src_dir: 'images',
  img_min_dir: '../build/images',
  sass_dir: 'sass',
  css_dir: '../build/css',
  base_theme_dir: '../../../contrib/gent_base',
  styleguide_dir: './node_modules/gent_styleguide',
  build_dir: '../build'
};

/*
 *
 * Build settings for your styles.
 * Includes:
 *  Sass globbing
 *  SCSS linting
 *  Compresssed output style
 *  Autoprefixer
 *
 */
gulp.task('styles:build', function() {
  gulp.src(globalConfig.sass_dir + '/**/*.s+(a|c)ss')
    .pipe(sassGlob())
    .pipe(sassLint({
      configFile: './.sass-lint.yml',
      formatter: 'stylish',
      'merge-default-rules': false
    }))
    .pipe(sassLint.format())
    .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest(globalConfig.css_dir))
});

/*
 *
 * Compile development settings for your styles.
 * Includes:
 *  Sass globbing
 *  SCSS linting
 *  Nested output style
 *  Sourcemaps (dev only!)
 *  Autoprefixer
 *
 */
gulp.task('styles:dist', function() {
  gulp.src(globalConfig.sass_dir + '/**/*.s+(a|c)ss')
    .pipe(sassGlob())
    .pipe(sassLint({
      configFile: './.sass-lint.yml',
      formatter: 'stylish',
      'merge-default-rules': false
    }))
    .pipe(sassLint.format())
    .pipe(sourcemaps.init())
    .pipe(csscomb())
    .pipe(sass({outputStyle: 'nested'})).on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
        browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest(globalConfig.css_dir))
});

/*
 *
 * Validate SCSS files.
 *
 */
gulp.task('styles:validate', function() {
  return gulp.src(globalConfig.sass_dir + '/**/*.s+(a|c)ss')
  .pipe(sassLint({
    configFile: './.sass-lint.yml'
  }))
  .pipe(sassLint.format())
});

/*
 *
 * Watch SCSS files For Changes.
 *
 */
gulp.task('styles:watch', function() {
  gulp.watch(globalConfig.sass_dir + '/**/*.scss', ['styles:dist', 'styles:validate']);
});

/*
 *
 * Copy JS files.
 *
 */
gulp.task('js:build', function() {
  gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
    .pipe(rename({dirname: ''}))
    .pipe(minify({
      noSource: true
    }))
    .pipe(gulp.dest(globalConfig.scripts_min_dir));
});

/*
 *
 * Development copy JS files.
 *
 */
gulp.task('js:dist', function() {
  gulp.src(globalConfig.scripts_src_dir + '/**/*.js')
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
    .pipe(eslint({
      configFile: './.eslintrc'
    }))
    .pipe(eslint.format())
});

/*
 *
 * Watch JS files For Changes.
 *
 */
gulp.task('js:watch', function() {
  gulp.watch(globalConfig.scripts_src_dir + '/**/*.js', ['js:dist', 'js:validate']);
});

/*
 *
 * Minify images.
 *
 */
gulp.task('images:minify', ['styles:build'], function(cb) {
  gulp.src([globalConfig.img_src_dir + '/**/*.png', globalConfig.img_src_dir + '/**/*.jpg', globalConfig.img_src_dir + '/**/*.gif', globalConfig.img_src_dir + '/**/*.jpeg']).pipe(imageop({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
  })).pipe(gulp.dest(globalConfig.img_min_dir)).on('end', cb).on('error', cb);
});

/*
 * Clean build directory.
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
gulp.task('default', ['styles:watch', 'js:watch']);
gulp.task('watch', ['default']);

/*
 *
 * Validate task:
 * Usage:
 *  gulp validate
 *
 *  Used to only validate the SCSS and JS code.
 *
 */
gulp.task('validate', ['styles:validate', 'js:validate']);

/*
 * Compile the theme.
 * Usage:
 *  gulp compile
 *
 *  Used build the SCSS and JS code. This also minifies images.
 */
gulp.task('compile', function (done) {
  sequence('build:clean', ['styles:build', 'js:build', 'images:minify'], done);
});

gulp.task('compile:dev', function (done) {
  sequence('build:clean', ['styles:dist', 'js:dist', 'images:minify'], done);
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
