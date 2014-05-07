var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  clean = require('gulp-clean');

// 1. Delete debug and release directories
gulp.task('clean', function () {
  return gulp.src([debugDest.root, releaseDest.root], {
    read: false
  })
    .pipe(clean());
});