'use strict';

module.exports = function(grunt) {

  var globalConfig = {
    scripts_dir: 'js',
    sass_dir: 'sass',
    css_dir: 'css',
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
          dest: '<%= globalConfig.scripts_dir  %>/min',
          cwd: '<%= globalConfig.scripts_dir  %>',
          rename: function(dest, src) { return dest + '/' + src.replace('.js', '.min.js'); }
        }]
      }
    },

    // Javascript linting.
    eslint: {
      src: ['<%= globalConfig.scripts_dir %>/*.js']
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
          'css/main.css' : '<%= globalConfig.sass_dir %>/main.scss'
        }
      },
      dist: {
        options:{
          style: 'compressed',
          sourcemap: 'none',
          importer: require('node-sass-globbing')
        },
        files: {
          'css/main.css' : '<%= globalConfig.sass_dir %>/main.scss'
        }
      }
    },

    // Sass linting task.
    sasslint: {
      options: {
        configFile: '.sass-lint.yml'
      },
      target: ['sass/**/*.s+(a|c)ss']
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
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-lint');

  grunt.registerTask('build', ['eslint', 'uglify', 'sasslint', 'sass:dist', 'postcss:dist']);

  // Development tasks.
  grunt.registerTask('watch', ['sasslint', 'watch', 'postcss:dev']);
  grunt.registerTask('compile', ['sasslint', 'compass:dev']);

};
