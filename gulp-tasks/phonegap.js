var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  phonegapDebugDest = buildConfig.paths['phonegap-debug'],
  phonegapReleaseDest = buildConfig.paths['phonegap-release'],
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  gulpGrunt = require('gulp-grunt')(gulp);
  
gulp.task('phonegap-build', function () {
  gulp.start('grunt-phonegap-build');
});

gulp.task('phonegap-build-android', function () {
  gulp.start('grunt-phonegap-build-android');
});

gulp.task('phonegap-run-android', function () {
  gulp.start('grunt-phonegap-run-android');
});

gulp.task('phonegap-serve', function () {
  var serve = exec('phonegap serve', {
      cwd: debugDest.root
    },
    function (error, stdout, stderr) {
      gutil.log('stdout: ' + stdout);
      gutil.log('stderr: ' + stderr);

      if (error !== null) {
        gutil.log('exec error: ' + error);
      }
    });
});