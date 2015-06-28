var paths = require('./config.js').paths,
  gulp = require('gulp'),
  filter = require('gulp-filter'),
  plumber = require('gulp-plumber'),
  jade = require('gulp-jade'),
  useref = require('gulp-useref'),
  changed = require('gulp-changed'),
  ngAnnotate = require('gulp-ng-annotate'),
  minifyCss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace'),
  replace = require('gulp-replace'),
  minifyHtml = require('gulp-minify-html'),
  connect = require('gulp-connect'),
  debug = require('gulp-debug');

gulp.task('useref', function () {
  var manifest;

  gulp.src(paths.debug.root + 'index.html')
    .pipe(plumber())
    .pipe(useref.assets())
    .pipe(rev())
    // .pipe(rev.manifest().on('data', function (file) {
    //   manifest = JSON.parse(file.contents);
    // }))
    .pipe(useref.restore())
    .pipe(useref())
    .pipe(revReplace())
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(gulp.dest(paths.release.root))
    .pipe(gulp.src(paths.release.root + 'index.html'))
  // .pipe(replace('css/vendor.css', function () {
  //   console.log(manifest['css\\vendor.css']);
  //   return manifest['css\\vendor.css'];
  // }))
  // .pipe(replace('css/app.css', function () {
  //   console.log(manifest['css\\app.css']);
  //   return manifest['css\\app.css'];
  // }))
  // .pipe(replace('js/vendor.js', function () {
  //   console.log(manifest['js\\vendor.js']);
  //   return manifest['js\\vendor.js'];
  // }))
  // .pipe(replace('js/app.js', function () {
  //   console.log(manifest['js\\app.js']);
  //   return manifest['js\\app.js'];
  // }))
  .pipe(gulp.dest(paths.release.root))
    .pipe(connect.reload());
});

gulp.task('useref-vendor-css', function () {
  var indexHtmlFilter = filter('index.html'),
    vendorCssFilter = filter('css/vendor.css'),
    revvedVendorCss = '';

  return gulp.src(paths.debug.root + 'index.html')
    .pipe(plumber())
    .pipe(useref.assets())
    .pipe(vendorCssFilter)
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.release.root))
    .pipe(vendorCssFilter.restore())
    .pipe(indexHtmlFilter)
    .pipe(gulp.dest(paths.release.root))
    .pipe(connect.reload());
});

gulp.task('useref-app-css', function () {
  var indexHtmlFilter = filter('index.html'),
    appCssFilter = filter('css/app.css'),
    revvedAppCss = '';

  return gulp.src(paths.debug.root + 'index.html')
    .pipe(plumber())
    .pipe(useref.assets())
    .pipe(appCssFilter)
    .pipe(minifyCss())
    .pipe(gulp.dest(paths.release.root))
    .pipe(appCssFilter.restore())
    .pipe(indexHtmlFilter)
    .pipe(gulp.dest(paths.release.root))
    .pipe(connect.reload());
});

gulp.task('useref-vendor-js', function () {
  var indexHtmlFilter = filter('index.html'),
    vendorJsFilter = filter('js/vendor.js'),
    revvedVendorJs = '';

  return gulp.src(paths.debug.root + 'index.html')
    .pipe(plumber())
    .pipe(useref.assets({
      // searchPath: paths.debug.root
    }))
    .pipe(vendorJsFilter)
  .pipe(ngAnnotate())
  .pipe(uglify(/*{
    mangle: false
  }*/))
    .pipe(gulp.dest(paths.release.root))
    .pipe(vendorJsFilter.restore())
    .pipe(indexHtmlFilter)
    .pipe(gulp.dest(paths.release.root))
    .pipe(connect.reload());
});

gulp.task('useref-app-js', function () {
  var indexHtmlFilter = filter('index.html'),
    appJsFilter = filter('js/app.js'),
    revvedAppJs = '';

  return gulp.src(paths.debug.root + 'index.html')
    .pipe(plumber())
    .pipe(useref.assets())
    .pipe(appJsFilter)
  .pipe(ngAnnotate())
  .pipe(uglify(/*{
    mangle: false
  }*/))
    .pipe(gulp.dest(paths.release.root))
    .pipe(appJsFilter.restore())
    .pipe(indexHtmlFilter)
    .pipe(gulp.dest(paths.release.root))
    .pipe(connect.reload());
});