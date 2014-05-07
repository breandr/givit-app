var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  changed = require('gulp-changed');

// 1. copy files to debug and release root directories
// 2. copy bower components to debug root directory
gulp.task('copy', function () {
  var filesToCopy = [
    src.root + 'fonts/**',
    src.root + '.htaccess',
    src.root + 'favicon.ico',
    src.root + 'robots.txt',
    src.root + '**/.pgbomit'
  ];

  return gulp.src(filesToCopy, {
    base: src.root
  })
    .pipe(changed(debugDest.root))
    .pipe(gulp.dest(debugDest.root))
    .pipe(gulp.dest(releaseDest.root))
    .pipe(gulp.src(src.root + 'bower_components/**', {
      base: src.root
    }))
    .pipe(gulp.dest(debugDest.root))
});