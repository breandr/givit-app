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
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  lr = require('tiny-lr'),
  server = lr(),
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
  // gulp.src(src.html + '**/*.jade')
  //   .pipe(jade({
  //     data: pkg,
  //     pretty: true
  //   }))
  gulp.src(src.html + '*.html')
    .pipe(gulpIf(IS_RELEASE_BUILD, usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({
        empty: true
      })],
      js: [uglify(), rev()]
    })))
    .pipe(gulp.dest(dest.html))
    .pipe(livereload(server));
});

// Styles
gulp.task('styles', function () {
  return gulp.src(src.sass + '*.scss')
    .pipe(sass({
      style: 'expanded',
      loadPath: 'app/bower_components'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(dest.css))
  // .pipe(rename({
  //   suffix: '.min'
  // }))
  // .pipe(minifyCss())
  .pipe(livereload(server))
  // .pipe(gulp.dest(dest.css))
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
  .pipe(gulp.dest(dest.js))
  // .pipe(rename({
  //   suffix: '.min'
  // }))
  // .pipe(gulpIf(IS_RELEASE_BUILD, uglify()))
  .pipe(livereload(server))
  // .pipe(gulp.dest(dest.js))
  .pipe(notify({
    message: 'Scripts task complete'
  }));
});

// Images
gulp.task('images', function () {
  return gulp.src(src.img + '/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(livereload(server))
    .pipe(gulp.dest(dest.img))
    .pipe(notify({
      message: 'Images task complete'
    }));
});

// Clean
gulp.task('clean', function () {
  return gulp.src([dest.css, dest.js, dest.img], {
    read: false
  })
    .pipe(clean());
});

// Default task
gulp.task('default', ['build']);
gulp.task('build', ['clean'], function () {
  gulp.start('styles', 'scripts', 'images', 'html');
});

// //Watch
gulp.task('watch', function () {
  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };

  	console.log('... Listening on %s (pid: %s) ...', port);

    // Watch html files
    gulp.watch(src.html + '*.html', ['html']);

    // Watch sass files
    gulp.watch(src.sass + '**/*.scss', ['styles']);


    // Watch js files
    gulp.watch(src.js + '**/*.js', ['scripts']);

    // Watch image files
    gulp.watch(src.img + '**/*', ['images']);

  });
});


gulp.task('connect', ['build'], connect.server({
  root: [dest.root],
  port: 9000,
  livereload: true,
  open: {
    browser: 'chrome'
  }
}));

// // Watch
// gulp.task('watch', ['connect'], function () {
//   // Watch for changes in `app` folder
//   gulp.watch([
//     src.html + '*.html',
//     src.sass + '**/*.scss',
//     src.js + '**/*.js',
//     src.img + '**/*'
//   ], connect.reload);

//   // Watch html files
//   gulp.watch(src.html + '*.html', ['html']);

//   // Watch sass files
//   gulp.watch(src.sass + '**/*.scss', ['styles']);


//   // Watch js files
//   gulp.watch(src.js + '**/*.js', ['scripts']);

//   // Watch image files
//   gulp.watch(src.img + '**/*', ['images']);
// });