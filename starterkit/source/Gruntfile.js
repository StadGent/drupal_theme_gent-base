'use strict';

module.exports = function(grunt) {

  var globalConfig = {
    scripts_src_dir: 'js',
    scripts_min_dir: '../build/js',
    sass_dir: 'sass',
    css_dir: '../build/css',
    base_theme_dir: '../../contrib/gent_base',
    // When the styleguide is available as Bower component in gent base,
    // we should use that location.
    styleguide_dir: '../../../../vendor/gent-styleguide/gent'
  };

  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),

    // Javascript minification.
    uglify: {
      min: {
        options: {
          sourceMap: false
        },
        files: [{
          expand: true,
          mangle: false,
          preserveComments: 'some',
          src: ['*.js', '!*.min.js'],
          dest: '<%= globalConfig.scripts_min_dir  %>/min',
          cwd: '<%= globalConfig.scripts_scr_dir  %>',
          rename: function(dest, src) { return dest + '/' + src.replace('.js', '.min.js'); }
        }]
      }
    },

    // Javascript linting.
    eslint: {
      src: ['<%= globalConfig.scripts_scr_dir %>/*.js']
    },

    // Sass compilation with LibSASS
    sass: {
      dev: {
        options:{
          style: 'nested',
          sourcemap: true,
          importer: require('node-sass-globbing')
        },
        files: {
          '<%= globalConfig.css_dir %>/main.css' : '<%= globalConfig.sass_dir %>/main.scss'
        }
      },
      dist: {
        options:{
          style: 'compressed',
          sourcemap: 'none',
          importer: require('node-sass-globbing')
        },
        files: {
          '<%= globalConfig.css_dir %>/main.css' : '<%= globalConfig.sass_dir %>/main.scss'
        }
      }
    },

    // Sass linting task.
    sasslint: {
      options: {
        configFile: '.sass-lint.yml'
      },
      target: ['<%= globalConfig.sass_dir %>/**/*.s+(a|c)ss']
    },

    // All postCSS tasks.
    postcss: {
      dev: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: 'last 5 versions'
            })
          ]
        },
        src: '<%= globalConfig.css_dir %>/*.css'
      },
      dist: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: 'last 5 versions'
            }),
            require('cssnano')()
          ]
        },
        src: '<%= globalConfig.css_dir %>/*.css'
      }
    },

    // Watch task.
    watch: {
      css: {
        files: 'sass/*.scss',
        tasks: ['sass', 'postcss:dev']
      }
    },

    //Copy font task
    copy: {
      files:{
        cwd: '../../../../../vendor/gent-styleguide/gent/public/css/fonts',
        src: '**/*',
        dest: '../build/fonts',
        expand:true
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['eslint', 'uglify', 'sasslint', 'sass:dist', 'postcss:dist', 'copy']);

  // Development tasks.
  grunt.registerTask('watch', ['sasslint', 'watch', 'postcss:dev']);
  grunt.registerTask('compile', ['sasslint', 'compass:dev']);

};
