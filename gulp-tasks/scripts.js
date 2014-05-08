var paths = require('./config.js').paths,
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed'),
  jshint = require('gulp-jshint'),
  connect = require('gulp-connect'),
  jsdoc = require('gulp-jsdoc');

// 1. Lint changed JS files
// 2. Write changed JS files to debug js directory
gulp.task('scripts', function () {
  // var appFilter = filter('app.js');

  return gulp.src(paths.src.js + '**/*.js')
    .pipe(plumber())
    .pipe(changed(paths.debug.js))
  // .pipe(jscs())
  .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
  // .pipe(appFilter)
  // .pipe(browserify({
  //   insertGlobals: true,
  //   debug: !IS_RELEASE_BUILD
  // }))
  // .pipe(appFilter.restore())
  .pipe(gulp.dest(paths.debug.js))
    .pipe(connect.reload())
    .pipe(jsdoc('./docs'));
});