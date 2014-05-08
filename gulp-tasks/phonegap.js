var paths = require('./config.js').paths,
  gulp = require('gulp'),
  gulpGrunt = require('gulp-grunt')(gulp);

/*
gulp.task('phonegap-build', function () {
  gulp.start('grunt-phonegap-build');
});

gulp.task('phonegap-build-android', function () {
  gulp.start('grunt-phonegap-build-android');
});

gulp.task('phonegap-run-android', function () {
  gulp.start('grunt-phonegap-run-android');
});
*/

gulp.task('phonegap-serve', function () {
  var serve = exec('phonegap serve', {
      cwd: paths.debug.root
    },
    function (error, stdout, stderr) {
      gutil.log('stdout: ' + stdout);
      gutil.log('stderr: ' + stderr);

      if (error !== null) {
        gutil.log('exec error: ' + error);
      }
    });
});