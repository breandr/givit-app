var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  jade = require('gulp-jade'),
  plumber = require('gulp-plumber'),
  minifyHtml = require('gulp-minify-html'),
  templateCache = require('gulp-angular-templatecache'),
  concat = require('gulp-concat');

// 1. Compiles jade views to HTML and minifies
// 2. Compiles minified HTML views to $templateCache
// 3. Concats and writes to debug js directory
gulp.task('ng-template-cache', function () {
  gulp.src(src.jade + 'views/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      data: pkg,
      pretty: true
    }))
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(templateCache({
      module: 'givitApp',
      root: 'views/'
    }))
    .pipe(concat('views.js'))
    .pipe(gulp.dest(debugDest.js));
});