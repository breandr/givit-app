// TODO:
// set up jscs in scripts task
// set up gulp-uncss in styles task
// browserify
var _ = require('lodash'),
  buildConfig = require('./gulp-tasks/config.js'),
  pkg = require('./package.json'),
  requireDir = require('require-dir'),
  argv = require('minimist')(process.argv.slice(2)),
  gracefulFs = require('graceful-fs'),
  gulp = require('gulp'),
  connect = require('gulp-connect'),
  template = require('gulp-template'),
  gutil = require('gulp-util'),
  runSequence = require('run-sequence'),
  IS_RELEASE_BUILD = !! argv.release,
  IS_PHONEGAP_BUILD = !! argv.phonegap,
  LAUNCH = !! argv.launch,
  BUILD_TYPE = (function () {
    var buildType = IS_RELEASE_BUILD ? 'release' : 'debug';

    if (IS_PHONEGAP_BUILD) {
      return 'phonegap' + buildType.charAt(0).toUpperCase() + buildType.slice(1);
    }

    return buildType;
  })(),
  src = buildConfig.paths.src,
  // dest = buildConfig.paths[BUILD_TYPE],
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  banner = _.template(buildConfig.banner, {
    pkg: pkg
  });

requireDir('./gulp-tasks');

if (IS_RELEASE_BUILD) {
  gutil.log(
    gutil.colors.red('--release:'),
    'Building release version (minified, debugs stripped)...'
  );
}

// Default task
gulp.task('default', ['build']);

gulp.task('serve', ['build', 'connect']);

gulp.task('rebuild', ['clean'], function () {
  gulp.start('build');
});

gulp.task('build', /*['clean'], */ function () {
  runSequence([
    'html',
    'copy',
    'bower'
  ], [
    'useref-vendor-css',
    'useref-app-css',
    'useref-vendor-js',
    'useref-app-js'
  ], [
    'useref',
    'images'
  ]);
});