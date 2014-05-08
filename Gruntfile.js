'use strict';

module.exports = function (grunt) {
  var paths = require('./gulp-tasks/config.js').paths,
    IS_RELEASE_BUILD = !! grunt.option('release'),
    BUILD_TYPE = IS_RELEASE_BUILD ? 'release' : 'debug',
    src = paths[BUILD_TYPE],
    dest = paths[('phonegap-' + BUILD_TYPE)];

  grunt.initConfig({
    phonegap: {
      config: {
        root: src.root,
        config: './phonegap/config.xml',
        cordova: './phonegap/.cordova',
        path: dest.root,
        platforms: ['android', 'ios'],
        maxBuffer: 200, // You may need to raise this for iOS.
        verbose: true,
        remote: {
          username: 'brett.j.andrews@gmail.com',
          password: 'password',
          platforms: ['android', 'ios', 'wp8']
        }
      }
    }
  });

  grunt.loadNpmTasks('graceful-fs');
  grunt.loadNpmTasks('grunt-phonegap');

  grunt.registerTask('phonegap-build', function () {
    grunt.task.run('phonegap:build');
  });

  grunt.registerTask('phonegap-build-android', function () {
    grunt.task.run('phonegap:build:android');
  });

  grunt.registerTask('phonegap-run-android', function () {
    grunt.task.run('phonegap:run:android');
  });
};