// TODO:
// set up jscs in scripts task
// set up gulp-uncss in styles task
// set up gulp-combine-media-queries in styles task
// convert html to jade and add jade step to html task
var _ = require('lodash'),
  buildConfig = require('./config/build.config.js'),
  pkg = require('./package.json'),
  argv = require('minimist')(process.argv.slice(2)),
  gulp = require('gulp'),
  // gulpGrunt = require('gulp-grunt')(gulp),
  // 
  plumber = require('gulp-plumber'),
  connect = require('gulp-connect'),
  gulpIf = require('gulp-if'),
  header = require('gulp-header'),
  stripDebug = require('gulp-strip-debug'),
  template = require('gulp-template'),
  gutil = require('gulp-util'),
  jade = require('gulp-jade'),
  usemin = require('gulp-usemin'),
  minifyHtml = require('gulp-minify-html'),
  jscs = require('gulp-jscs'),
  rev = require('gulp-rev'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  ngmin = require('gulp-ngmin'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  // livereload = require('gulp-livereload'),
  // lr = require('tiny-lr'),
  // server = lr(),
  IS_RELEASE_BUILD = !! argv.release,
  BUILD_TYPE = IS_RELEASE_BUILD ? 'release' : 'debug',
  src = buildConfig.paths.src,
  dest = buildConfig.paths[BUILD_TYPE],
  banner = _.template(buildConfig.banner, {
    pkg: pkg
  });

if (IS_RELEASE_BUILD) {
  gutil.log(
    gutil.colors.red('--release:'),
    'Building release version (minified, debugs stripped)...'
  );
}

// gulp.task('phonegap', function () {
//   gulp.run('build-phonegap');
// });

// Html
gulp.task('html', function () {
  // var html = gulp.src(src.html + '**/*.jade')
  //   .pipe(jade({
  //     data: pkg,
  //     pretty: true
  //   }))
  var html = gulp.src(src.html + '*.html');

  if(IS_RELEASE_BUILD){
    html = html.pipe(usemin({
      vendorCss: [minifyCss(), 'concat', rev()],
      appCss: [minifyCss(), 'concat', rev()],
      vendorJs: [uglify(), rev()],
      appJs: [/*ngmin(), */uglify(), rev()],
      html: [minifyHtml({
        empty: true
      })]
    }))
    .pipe(gulp.dest(dest.root));
  }

  html.pipe(notify({
      message: 'Html task complete'
    }));
});

// Styles
gulp.task('styles', function () {
  gulp.src(src.sass + '*.scss')
    .pipe(sass({
      style: 'expanded',
      loadPath: 'app/bower_components'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  // .pipe(minifyCss())
  .pipe(connect.reload())
  .pipe(gulp.dest(src.css)) //always put processed css into the src.css path since we only want minified css in dist
  .pipe(notify({
    message: 'Styles task complete'
  }));
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src(src.js + '/**/*.js')
    // .pipe(plumber())
  	// .pipe(jscs())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
  // .pipe(concat('main.js'))
  // .pipe(rename({
  //   suffix: '.min'
  // }))
  // .pipe(gulpIf(IS_RELEASE_BUILD, uglify({outSourceMap: true})))
  // .pipe(gulpIf(IS_RELEASE_BUILD, gulp.dest(dest.js)))
  .pipe(connect.reload())
  .pipe(notify({
    message: 'Scripts task complete'
  }));
});

// Images
gulp.task('images', function () {
  if(IS_RELEASE_BUILD){
  return gulp.src(src.img + '/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(connect.reload())
    .pipe(gulp.dest(dest.img))
    .pipe(notify({
      message: 'Images task complete'
    }));
  }
});

// Clean
gulp.task('clean', function () {
  gulp.src('./dist/*/**', {/*[dest.css, dest.js, dest.img, dest.fonts]*/
    read: false
  })
    .pipe(clean());
});

// //Watch
// gulp.task('watch', function () {
//   // Listen on port 35729
//   var liveReloadPort = 35729;
  
//   server.listen(liveReloadPort, function (err) {
//     if (err) {
//       return console.log(err)
//     };

//     console.log('... Listening on %s ...', liveReloadPort);

//     // Watch html files
//     gulp.watch(src.html + '*.html', ['html']);

//     // Watch sass files
//     gulp.watch(src.sass + '**/*.scss', ['styles']);

//     // Watch js files
//     gulp.watch(src.js + '**/*.js', ['scripts']);

//     // Watch image files
//     gulp.watch(src.img + '**/*', ['images']);

//   });
// });

//Watch
gulp.task('watch', function () {
    gulp.watch(src.html + '*.html', ['html']);
    gulp.watch(src.sass + '**/*.scss', ['styles']);
    gulp.watch(src.js + '**/*.js', ['scripts']);
    gulp.watch(src.img + '**/*', ['images']);
});


gulp.task('connect', connect.server({
  root: [dest.root],
  port: 9000,
  livereload: true,
  open: {
    browser: 'chrome'
  }
}));

gulp.task('serve', ['connect', 'build', 'watch']);

// Default task
gulp.task('default', ['build']);

var preBuild = IS_RELEASE_BUILD ? ['clean'] : null;
gulp.task('build', preBuild, function () {
  gulp.start('styles', 'scripts', 'html');
});

gulp.task('build:prod', ['clean', 'build'], function(){

});