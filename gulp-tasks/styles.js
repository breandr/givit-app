var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  connect = require('gulp-connect');

// 1. Compile changed SASS to CSS
// 2. Autoprefix CSS
// 3. Write to debug CSS directory
gulp.task('styles', function () {
  return gulp.src([src.sass + '*.scss', '!' + src.sass + '_*.scss'])
    .pipe(plumber())
    .pipe(changed(debugDest.css, {
      extension: '.css'
    }))
    .pipe(sass({
      style: 'expanded',
      loadPath: 'app/bower_components'
    }))
    .pipe(autoprefixer('last 1 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(debugDest.css))
    .pipe(connect.reload());
});
