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
  changed = require('gulp-changed'),
  watch = require('gulp-watch'),
  wiredep = require('wiredep'),
  filter = require('gulp-filter')
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

  if (IS_RELEASE_BUILD) {
    html = html.pipe(usemin({
      vendorCss: [minifyCss(), 'concat', rev()],
      appCss: [minifyCss(), 'concat', rev()],
      vendorJs: [ngmin(), uglify(), rev()],
      appJs: [ /*ngmin(), */ uglify(), rev()],
      html: [minifyHtml({
        empty: true
      })]
    }))
      .pipe(gulp.dest(dest.root));
  }

  return html;
  // html.pipe(notify({
  //     message: 'Html task complete'
  //   }));
});

gulp.task('views', function () {
  return gulp.src(src.root + 'views/*.html')
    .pipe(watch())
    .pipe(plumber())
    .pipe(connect.reload());
});

// Styles
gulp.task('styles', function () {
  return gulp.src(src.sass + '*.scss')
    .pipe(watch())
    .pipe(plumber())
    .pipe(sass({
      style: 'expanded',
      loadPath: 'app/bower_components'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', {cascade: true}))
    .pipe(gulp.dest(dest.css))
    .pipe(connect.reload());
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src(src.js + '/**/*.js', {
    base: src.js
  })
    .pipe(watch())
    .pipe(plumber())
  // .pipe(jscs())
  .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
  // .pipe(jshint.reporter('fail'))
  // .pipe(plumber())
  // .pipe(filter('app.js'))
  // .pipe(browserify({
  //   insertGlobals: true,
  //   debug: !IS_RELEASE_BUILD
  // }))
  // .pipe(filter.restore())
  .pipe(gulp.dest(dest.js))
    .pipe(connect.reload())
  // .pipe(notify({
  //   message: 'Scripts task complete'
  // }));
});

// Images
gulp.task('images', function () {
  return gulp.src(src.img + '/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(connect.reload())
    .pipe(gulp.dest(dest.img))
  // .pipe(notify({
  //   message: 'Images task complete'
  // }));
});

// Clean
gulp.task('clean', function () {
  return gulp.src('./dist', { /*[dest.css, dest.js, dest.img, dest.fonts]*/
    read: false
  })
    .pipe(clean());
});

// Copy
gulp.task('copy', function () {
  gulp.src([src.fonts + '**', src.root + 'views/**', src.root + '.htaccess', src.root + 'favicon.ico', src.root + 'robots.txt'], {
    base: src.root
  })
    .pipe(gulp.dest(dest.root));
});

//Watch
gulp.task('watch', ['views'], function () {
  gulp.watch(src.html + '**/*.html', ['html']);
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

gulp.task('serve', ['build', 'connect', 'watch']);

// Default task
gulp.task('default', ['build']);

gulp.task('bower', function () {
  wiredep({
    directory: src.root + 'bower_components',
    bowerJson: require('./bower.json'),
    src: src.root + 'index.html',
    ignorePath: 'app/',
    exclude: [
      /app\\bower_components\\sass-bootstrap\\dist\\css\\bootstrap\.css/, //we include this in main
    ]
  });
});

var preBuild = IS_RELEASE_BUILD ? ['clean'] : null;
gulp.task('build', preBuild, function () {
  gulp.start('styles', 'scripts', 'bower', 'html');
});