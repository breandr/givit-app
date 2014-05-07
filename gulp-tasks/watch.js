var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  watch = require('gulp-watch'),
  runSequence = require('run-sequence');

gulp.task('watch', function () {
  watch({
    glob: [src.bowerComponents + '/**/*.scss']
  }, function () {
    runSequence('styles', 'useref-vendor-css')
  });

  watch({
    glob: [src.sass + '/**/*.scss']
  }, function () {
    runSequence('styles', 'useref-app-css')
  });

  watch({
    glob: [src.bowerComponents + '**/*.js']
  }, function () {
    runSequence('scripts', 'useref-vendor-js')
  });

  watch({
    glob: src.js + '**/*.js'
  }, function () {
    runSequence('scripts', 'useref-app-js')
  });

  watch({
    glob: [src.root + 'index.jade']
  }, function () {
    runSequence('html', 'useref')
  });

  watch({
    glob: [src.views + '/**/*.jade']
  }, function () {
    runSequence('ng-template-cache', 'scripts', 'useref-app-js')
  });
});