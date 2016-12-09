'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['sass/{,**/}*.{scss,sass}', '../../../www/sites/all/themes/contrib/gent_base/sass/{,**/}*.{scss,sass}'],
        tasks: ['sasslint', 'compass:dev'],
        options: {
          livereload: false
        }
      },
      registry: {
        files: ['*.info', '{,**}/*.{php,inc}', '../../../www/sites/all/themes/contrib/gent_base/*.info', '../../../sites/all/themes/contrib/gent_base/{,**}/*.{php,inc}'],
        tasks: ['shell'],
        options: {
          livereload: false
        }
      },
      images: {
        files: ['images/**', '../../../www/sites/all/themes/contrib/gent_base/images/**']
      },
      css: {
        files: ['css/{,**/}*.css', '../../../www/sites/all/themes/contrib/gent_base/css/{,**/}*.css']
      },
      js: {
        files: ['js/{,**/}*.js', '!js/{,**/}*.min.js'],
        tasks: ['jshint', 'uglify:dev']
      }
    },

    shell: {
      all: {
        command: 'drush cache-clear theme-registry'
      }
    },

    compass: {
      options: {
        config: 'config.rb',
        bundleExec: true,
        force: true
      },
      dev: {
        options: {
          environment: 'development'
        }
      },
      dist: {
        options: {
          environment: 'production'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: 'libraries'
      },
      all: ['js/{,**/}*.js', '!js/{,**/}*.min.js']
    },

    sasslint: {
      options: {
        configFile: '.sass-lint.yml'
      },
      target: ['sass/**/*.s+(a|c)ss']
    },

    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'js',
          dest: 'js',
          src: ['**/*.js', '!**/*.min.js'],
          rename: function(dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);
            filename = filename.substring(0, filename.lastIndexOf('.'));
            return dest + '/' + folder + filename + '.min.js';
          }
        }]
      },
      dist: {
        options: {
          mangle: true,
          compress: {}
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'js',
          dest: 'js',
          src: ['**/*.js', '!**/*.min.js'],
          rename: function(dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);
            filename = filename.substring(0, filename.lastIndexOf('.'));
            return dest + '/' + folder + filename + '.min.js';
          }
        }]
      },
      // Extra uglifying for libs that don't ship with a minified version.
      // Run after bower update.
      libs: {
        options: {
          mangle: true,
          compress: {}
        },
        files: [
        ]
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 1
        },
        files: [
          {
            expand: true,
            cwd: 'images/',
            dest: 'images/',
            src: ['**/*.{png,jpg,gif}']
          },
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', [
    'newer:imagemin:dist',
    'newer:uglify:dist',
    'sasslint',
    'compass:dist',
    'jshint'
  ]);

  grunt.registerTask('compile', [
    'sasslint',
    'compass:dev'
  ]);

  grunt.registerTask('uglifybowerlibs', [
    'uglify:libs'
  ]);

};
