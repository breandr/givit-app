'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(); // Load all gulp plugins defined in package.json

require('gulp-grunt')(gulp);

// Styles
gulp.task('styles', function () {
  gulp.src('./app/sass/*.scss')
    .pipe($.rubySass({
      style: 'expanded',
      loadPath: ['./app/bower_components']
    }))
    .pipe($.autoprefixer('last 1 version', 'ie >= 10'))
    .pipe(gulp.dest('./app/styles'))
    .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
  gulp.src('./app/scripts/**/*.js')
    .pipe($.jscs())
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
  /*.pipe($.uglify({
      outSourceMap: true
    }))*/
  .pipe($.size());
});

// HTML
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe($.usemin())
    .pipe(gulp.dest('./dist'))
    .pipe($.size());
});

// Images
gulp.task('images', function () {
  gulp.src('./app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('./dist/images'))
    .pipe($.size());
});

// Clean
gulp.task('clean', function () {
  gulp.src(['./dist/styles', './dist/scripts', './dist/images'], {
    read: false
  }).pipe($.clean());
});

// Bundle
// gulp.task('bundle', ['styles', 'scripts'], $.bundle('./app/*.html'));

// Build
gulp.task('build', ['html', /*'bundle',*/ 'images']);

// Build production
gulp.task('build:prod', ['build'], function () {
  // Clean dist folder
  gulp.src('./dist')
    .pipe($.clean());

  // Copy html; minify
  gulp.src('./app/**/*.html', {
    base: './app'
  })
    .pipe($.useMin({
      css: [$.minifyCss(), 'concat', $.uncss({
        html: './app/**/*.html'
      })],
      html: [$.minifyHtml({
        empty: true
      })],
      js: [$.stripDebug(), $.uglify(), $.rev()]
    }))
    .pipe(gulp.dest('./dist'));

  // Copy scripts; strip debug; minify
  gulp.src('./app/scripts/**/*.js', {
    base: './app/scripts'
  })
    .pipe($.stripDebug())
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/scripts'));

  // Copy css; minify
  gulp.src('./app/styles/**/*.css', {
    base: './app/styles'
  })
    .pipe($.minifyCSS())
    .pipe(gulp.dest('./dist/styles'));

  // Copy images
  gulp.src('./app/images')
    .pipe(gulp.dest('./dist/images'));
});

// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// Connect
gulp.task('connect', ['build'], $.connect.server({
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
    './app/*.html',
    './app/styles/**/*.css',
    './app/scripts/**/*.js',
    './app/images/**/*'
  ], $.connect.reload);

  // Watch .scss files
  gulp.watch('./app/sass/**/*.scss', ['styles']);


  // Watch .js files
  gulp.watch('./app/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('./app/images/**/*', ['images']);
});

gulp.task('grunt-serve', function () {
  gulp.run('grunt-serve');
});