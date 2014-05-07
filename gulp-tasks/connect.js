var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', ['watch'], function () {
  connect.server({
    root: [debugDest.root],
    port: 9000,
    livereload: true
  });

  connect.server({
    root: [releaseDest.root],
    port: 9001,
    livereload: false
  });
});