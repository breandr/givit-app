var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  changed = require('gulp-changed'),
  // cache = require('gulp-cache'),
  imageMin = require('gulp-imagemin'),
  connect = require('gulp-connect');

// 1. Optimize changed images
// 2. Write changed images to debug and release image directories
gulp.task('images', function () {
  return gulp.src(src.img + '/**/*')
    .pipe(changed(debugDest.img))
    .pipe(/*cache(*/imageMin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })/*)*/)
    .pipe(gulp.dest(debugDest.img))
    .pipe(gulp.dest(releaseDest.img))
    .pipe(connect.reload());
});
