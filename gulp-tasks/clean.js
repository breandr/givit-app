var paths = require('./config.js').paths,
  gulp = require('gulp'),
  clean = require('gulp-clean');

// 1. Delete debug and release directories
gulp.task('clean', function () {
  return gulp.src([paths.debug.root, paths.release.root], {
    read: false
  })
    .pipe(clean());
});