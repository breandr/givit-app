var paths = require('./config.js').paths,
  gulp = require('gulp'),
  changed = require('gulp-changed'),
  // cache = require('gulp-cache'),
  imageMin = require('gulp-imagemin'),
  connect = require('gulp-connect');

// 1. Optimize changed images
// 2. Write changed images to debug and release image directories
gulp.task('images', function () {
  return gulp.src(paths.src.img + '/**/*')
    .pipe(changed(paths.debug.img))
    .pipe(/*cache(*/imageMin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })/*)*/)
    .pipe(gulp.dest(paths.debug.img))
    .pipe(gulp.dest(paths.release.img))
    .pipe(connect.reload());
});
