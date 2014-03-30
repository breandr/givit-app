// TODO:
// set up jscs in scripts task
// set up gulp-uncss in styles task
// set up gulp-combine-media-queries in styles task
// browserify
// usemin
// change watch to livereload
var _ = require('lodash'),
  buildConfig = require('./config/build.config.js'),
  pkg = require('./package.json'),
  argv = require('minimist')(process.argv.slice(2)),
  gracefulFs = require('graceful-fs'),
  gulp = require('gulp'),
  gulpGrunt = require('gulp-grunt')(gulp),
  plumber = require('gulp-plumber'),
  connect = require('gulp-connect'),
  gulpIf = require('gulp-if'),
  header = require('gulp-header'),
  stripDebug = require('gulp-strip-debug'),
  template = require('gulp-template'),
  gutil = require('gulp-util'),
  jade = require('gulp-jade'),
  usemin = require('gulp-usemin'),
  useref = require('gulp-useref'),
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
  cache = require('gulp-cache'),
  changed = require('gulp-changed'),
  watch = require('gulp-watch'),
  wiredep = require('wiredep'),
  filter = require('gulp-filter')
  // livereload = require('gulp-livereload'),
  // lr = require('tiny-lr'),
  // server = lr(),
  IS_RELEASE_BUILD = !! argv.release,
  LAUNCH = !! argv.launch,
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

gulp.task('phonegap', function () {
  gulp.run('grunt-build-phonegap');
});

gulp.task('html-useref', ['styles', 'scripts'], function () {
  var jsFilter = filter(src.js + '**/*.js');
  var scssFilter = filter([src.sass + '*.scss', '!' + src.sass + '_*.scss']);

  var html = gulp.src(src.html + '**/*.jade')
    .pipe(watch())
    .pipe(plumber())
    .pipe(jade({
      data: pkg,
      pretty: true
    }));

  if (IS_RELEASE_BUILD) {
    html = html.pipe(useref.assets())
    .pipe(jsFilter)
    .pipe(ngmin())
    .pipe(rev())
    .pipe(uglify())
    .pipe(jsFilter.restore())
    .pipe(scssFilter)
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(scssFilter.restore())
    .pipe(useref.restore())
    .pipe(useref())
    .pipe(minifyHtml({
      empty: true
    }));
  }

  html.pipe(gulp.dest(dest.root))
    .pipe(connect.reload());
});

// Html
gulp.task('html', ['styles', 'scripts'], function () {
  var html = gulp.src(src.html + '**/*.jade')
    .pipe(watch())
    .pipe(plumber())
    .pipe(jade({
      data: pkg,
      pretty: true
    }));

  if (IS_RELEASE_BUILD) {
    html = html.pipe(usemin({
      vendorCss: [minifyCss(), 'concat', rev()],
      appCss: [minifyCss(), 'concat', rev()],
      vendorJs: [ngmin(), uglify(), rev()],
      appJs: [ /*ngmin(), */ uglify(), rev()],
      html: [minifyHtml({
        empty: true
      })]
    }));
  }

  html
    .pipe(gulp.dest(dest.root))
    .pipe(connect.reload());
});

// Styles
gulp.task('styles', function () {
  gulp.src([src.sass + '*.scss', '!' + src.sass + '_*.scss'])
    .pipe(watch())
    .pipe(plumber())
    .pipe(sass({
      style: 'expanded',
      loadPath: 'app/bower_components'
    }))
    .pipe(autoprefixer('last 1 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(dest.css))
    .pipe(connect.reload());
});

// Scripts
gulp.task('scripts', function () {
  var appFilter = filter('app.js');

  gulp.src(src.js + '/**/*.js', {
    base: src.js
  })
    .pipe(watch())
    .pipe(plumber())
  // .pipe(jscs())
  .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
  // .pipe(plumber())
  // .pipe(appFilter)
  // .pipe(browserify({
  //   insertGlobals: true,
  //   debug: !IS_RELEASE_BUILD
  // }))
  // .pipe(appFilter.restore())
  .pipe(gulp.dest(dest.js))
    .pipe(connect.reload())
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
});

// Clean
gulp.task('clean', function () {
  return gulp.src(dest.root, {
    read: false
  })
    .pipe(clean());
});

// Copy
gulp.task('copy', function () {
  var filesToCopy = [
    src.root + 'fonts/**',
    src.root + '.htaccess',
    src.root + 'favicon.ico',
    src.root + 'robots.txt'
  ];

  if (!IS_RELEASE_BUILD) {
    filesToCopy.push(src.root + 'bower_components/**');
  }

  gulp.src(filesToCopy, {
    base: src.root
  })
    .pipe(gulp.dest(dest.root));
});

gulp.task('connect', connect.server({
  root: [dest.root],
  port: 9000,
  livereload: true,
  open: LAUNCH
}));

gulp.task('serve', ['build', 'connect']);

// Default task
gulp.task('default', ['build']);

gulp.task('bower', function () {
  wiredep({
    directory: src.root + 'bower_components',
    bowerJson: require('./bower.json'),
    src: src.root + 'index.jade',
    ignorePath: 'app/',
    exclude: [
      /app\\bower_components\\sass-bootstrap\\dist\\css\\bootstrap\.css/, //we include this in our own bootstrap.css
      /app\\bower_components\\font-awesome\\css\\font-awesome\.css/ //we include this in our own font-awesome.css
    ]
  });
});

gulp.task('build', ['clean'], function () {
  gulp.start('images', 'bower', 'copy', 'html-useref');
});