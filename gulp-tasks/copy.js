var paths = require('./config.js').paths,
  gulp = require('gulp'),
  changed = require('gulp-changed');

// 1. copy files to debug and release root directories
// 2. copy bower components to debug root directory
gulp.task('copy', function () {
  var filesToCopy = [
    paths.src.root + 'fonts/**',
    paths.src.root + '.htaccess',
    paths.src.root + 'favicon.ico',
    paths.src.root + 'robots.txt',
    paths.src.root + '**/.pgbomit'
  ];

  return gulp.src(filesToCopy, {
    base: paths.src.root
  })
    .pipe(changed(paths.debug.root))
    .pipe(gulp.dest(paths.debug.root))
    .pipe(gulp.dest(paths.release.root))
    .pipe(gulp.src(paths.src.root + 'bower_components/**', {
      base: paths.src.root
    }))
    .pipe(gulp.dest(paths.debug.root))
});