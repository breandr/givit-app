'use strict';
var gulp = require('gulp'),
  // Load all gulp plugins defined in package.json
  $ = require('gulp-load-plugins')();

require('gulp-grunt')(gulp);

// Styles
gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.rubySass({
      style: 'expanded',
      loadPath: ['app/bower_components']
    }))
    .pipe($.autoprefixer('last 1 version', 'ie >= 10'))
    .pipe(gulp.dest('app/styles'))
    .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jscs())
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
    .pipe($.size());
});

// HTML
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

// Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {
    read: false
  }).pipe($.clean());
});

// Bundle
gulp.task('bundle', ['styles', 'scripts'], $.bundle('./app/*.html'));

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// Connect
gulp.task('connect', $.connect.server({
  root: ['app'],
  port: 9000,
  livereload: true,
  open: {
    browser: 'chrome'
  }
}));

// Watch
gulp.task('watch', ['connect'], function () {
  // Watch for changes in `app` folder
  gulp.watch([
    'app/*.html',
    'app/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ], $.connect.reload);

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);


  // Watch .js files
  gulp.watch('app/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);
});

gulp.task('gulp-bower-install', function () {
  return gulp.run('grunt-bower-install');
});