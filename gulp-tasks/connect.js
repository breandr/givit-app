var paths = require('./config.js').paths,
  gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', ['watch'], function () {
  connect.server({
    root: [paths.release.root],
    port: 9001,
    livereload: false
  });

  connect.server({
    root: [paths.debug.root],
    port: 9000,
    livereload: true
  });
});