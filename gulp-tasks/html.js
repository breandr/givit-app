var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  filter = require('gulp-filter'),
  plumber = require('gulp-plumber'),
  jade = require('gulp-jade'),
  useref = require('gulp-useref'),
  ngmin = require('gulp-ngmin'),
  minifyCss = require('gulp-minify-css'),
  replace = require('gulp-replace'),
  minifyHtml = require('gulp-minify-html'),
  connect = require('gulp-connect');


// 1. Compile index.jade to HTML and write to debug root directory
// 2. Get CSS and JS files referenced in index.html
// ...
// ?. Replace references to concatenated files with revved versions
// ?. Minify HTML and write to release root directory
gulp.task('html', ['styles', 'scripts', 'ng-template-cache'], function () {
  var indexHtmlFilter = filter('index.html'),
    ngViewsFilter = filter('views/*.html'),
    appJsFilter = filter('js/app.js'),
    appCssFilter = filter('css/app.css'),
    vendorCssFilter = filter('css/vendor.css'),
    rev = require('gulp-rev'),
    revvedVendorCss = revvedAppCss = revvedVendorJs = revvedAppJs = '';

  return gulp.src(src.root + 'index.jade')
    .pipe(plumber())
    .pipe(jade({
      data: pkg,
      pretty: true
    }))
    .pipe(gulp.dest(debugDest.root))
  // .pipe(useref.assets({
  //   searchPath: debugDest.root
  // }))
  //   .pipe(vendorJsFilter)
  //   .pipe(changed)
  //   .pipe(ngmin())
  // // .pipe(uglify({
  // //   mangle: false
  // // }))
  // // .pipe(rev()).on('data', function (file) {
  // //   revvedVendorJs = file.relative;
  // // })
  // .pipe(vendorJsFilter.restore())
  // .pipe(appJsFilter)
  //   .pipe(ngmin())
  // .pipe(uglify({
  //   mangle: false
  // }))
  // .pipe(rev()).on('data', function (file) {
  //   revvedAppJs = file.relative;
  // })
  // .pipe(appJsFilter.restore())
  //   .pipe(vendorCssFilter)
  //   .pipe(minifyCss())
  // .pipe(rev()).on('data', function (file) {
  //   revvedVendorCss = file.relative;
  // })
  // .pipe(gulp.dest(releaseDest.root))
  //   .pipe(vendorCssFilter.restore())
  //   .pipe(appCssFilter)
  //   .pipe(minifyCss())
  // .pipe(rev()).on('data', function (file) {
  //   revvedAppCss = file.relative;
  // })
  // .pipe(appCssFilter.restore())
  //   .pipe(rev()).on('data', function (file) {
  //     console.log(file.base, file.stat, file.revOrigPath, file.path);
  //     Object.keys(file).forEach(function (path, orig) {
  //       console.log(path, orig);
  //     });
  //   })
  //   .pipe(rev.manifest()).on('data', function (manifest) {
  //     // console.log(manifest.base, manifest.stat, manifest.revOrigPath, manifest.path);
  //     Object.keys(manifest).forEach(function (path, orig) {
  //       console.log(path, orig);
  //     });
  //   })
  // .pipe(useref.restore())
  // .pipe(useref())
  // .pipe(indexHtmlFilter)
  // .pipe(replace('css/vendor.css', function () {
  //   return revvedVendorCss;
  // }))
  // .pipe(replace('css/app.css', function () {
  //   return revvedAppCss;
  // }))
  // .pipe(replace('js/vendor.js', function () {
  //   return revvedVendorJs;
  // }))
  // .pipe(replace('js/app.js', function () {
  //   return revvedAppJs;
  // }))
  // .pipe(minifyHtml({
  //   empty: true,
  //   spare: true,
  //   quotes: true
  // }))
  // .pipe(indexHtmlFilter.restore())
  // .pipe(gulp.dest(releaseDest.root))
  // .pipe(rev.manifest())
  .pipe(connect.reload());
});