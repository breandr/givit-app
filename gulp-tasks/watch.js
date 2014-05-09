var paths = require('./config.js').paths,
  gulp = require('gulp'),
  watch = require('gulp-watch'),
  runSequence = require('run-sequence');

gulp.task('watch', function () {
  watch({
    glob: [paths.src.bowerComponents + '/**/*.scss']
  }, function () {
    runSequence('styles', 'useref-vendor-css');
  });

  watch({
    glob: [paths.src.sass + '/**/_*.scss']
  }, function () {
    runSequence('styles', 'useref-app-css');
  });

  watch({
    glob: [paths.src.bowerComponents + '**/*.js']
  }, function () {
    runSequence('scripts', 'useref-vendor-js');
  });

  watch({
    glob: paths.src.js + '**/*.js'
  }, function () {
    runSequence('scripts', 'useref-app-js');
  });

  watch({
    glob: [paths.src.root + 'index.jade']
  }, function () {
    runSequence('html', 'useref');
  });

  watch({
    glob: [paths.src.views + '/**/*.jade']
  }, function () {
    runSequence('ng-template-cache', 'scripts', 'useref-app-js');
  });
});