'use strict';

module.exports = function (grunt) {
  var buildConfig = require('./gulp-tasks/config.js'),
    IS_RELEASE_BUILD = !! grunt.option('release'),
    BUILD_TYPE = IS_RELEASE_BUILD ? 'release' : 'debug',
    src = buildConfig.paths[BUILD_TYPE],
    dest = buildConfig.paths[('phonegap' + BUILD_TYPE.charAt(0).toUpperCase() + BUILD_TYPE.slice(1))];
    
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

        // Android-only integer version to increase with each release.
        // See http://developer.android.com/tools/publishing/versioning.html
        versionCode: function () {
          return (1);
        },

        // Android-only options that will override the defaults set by Phonegap in the
        // generated AndroidManifest.xml
        // See https://developer.android.com/guide/topics/manifest/uses-sdk-element.html
        minSdkVersion: function () {
          return (10);
        },
        targetSdkVersion: function () {
          return (19);
        },

        // iOS7-only options that will make the status bar white and transparent
        iosWhiteStatusBar: true,

        // If you want to use the Phonegap Build service to build one or more
        // of the platforms specified above, include these options.
        // See https://build.phonegap.com/
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