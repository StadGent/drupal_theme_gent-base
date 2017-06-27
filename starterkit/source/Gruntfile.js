'use strict';

module.exports = function(grunt) {

  var globalConfig = {
    scripts_src_dir: 'js',
    scripts_min_dir: '../build/js',
    sass_dir: 'sass',
    css_dir: '../build/css',
    base_theme_dir: '../../../contrib/gent_base',
    // When the styleguide is available as Bower component in gent base,
    // we should use that location.
    styleguide_dir: '../../../../../vendor/gent/gent-styleguide'
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
          dest: '<%= globalConfig.scripts_min_dir  %>',
          cwd: '<%= globalConfig.scripts_src_dir  %>',
          rename: function(dest, src) { return dest + '/' + src.replace('.js', '.min.js'); }
        }, {
          expand: true,
          mangle: false,
          preserveComments: 'some',
          src: ['*.js', '!*.min.js'],
          dest: '<%= globalConfig.base_theme_dir %>/build/js',
          cwd: '<%= globalConfig.base_theme_dir %>/source/js',
          rename: function(dest, src) { return dest + '/' + src.replace('.js', '.min.js'); }
        }]
      }
    },

    // Javascript linting.
    eslint: {
      src: ['<%= globalConfig.scripts_src_dir %>/*.js']
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
      options: {
        livereload: true
      },
      sass: {
        files: '<%= globalConfig.sass_dir %>/{,**/}*.{scss,sass}',
        tasks: ['sasslint', 'sass:dev', 'postcss:dev', 'copy:fonts']
      },
      scripts: {
        files: ['<%= globalConfig.scripts_src_dir %>/**/*.js'],
        tasks: ['copy:js', 'eslint', 'uglify'],
        options: {
          spawn: false
        }
      }
    },

    // Copy font task
    copy: {
      fonts: {
        cwd: '<%= globalConfig.styleguide_dir %>/public/fonts',
        src: '**/*',
        dest: '../build/fonts',
        expand: true
      },
      js: {
        cwd: '<%= globalConfig.styleguide_dir %>/components',
        src: ['**/*.js'],
        dest:'<%= globalConfig.base_theme_dir %>/source/js',
        flatten: true,
        filter: 'isFile',
        expand: true
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

  grunt.registerTask('build', ['copy', 'eslint', 'uglify', 'sasslint', 'sass:dist', 'postcss:dist']);

  // Development tasks.
  grunt.registerTask('compile', ['sasslint', 'postcss:dev']);
  grunt.registerTask('default', ['watch']);

};
