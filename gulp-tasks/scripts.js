var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed'),
  jshint = require('gulp-jshint'),
  connect = require('gulp-connect');

// 1. Lint changed JS files
// 2. Write changed JS files to debug js directory
gulp.task('scripts', function () {
  // var appFilter = filter('app.js');

  return gulp.src(src.js + '**/*.js')
    .pipe(plumber())
    .pipe(changed(debugDest.js))
  // .pipe(jscs())
  .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
  // .pipe(appFilter)
  // .pipe(browserify({
  //   insertGlobals: true,
  //   debug: !IS_RELEASE_BUILD
  // }))
  // .pipe(appFilter.restore())
  .pipe(gulp.dest(debugDest.js))
    .pipe(connect.reload());
});
