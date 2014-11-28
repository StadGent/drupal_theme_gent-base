'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
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
  });

  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('build', [
    'compass:dist',
  ]);
};
