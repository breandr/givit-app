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
  exec = require('child_process').exec,
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
  templateCache = require('gulp-angular-templatecache'),
  ngHtml2Js = require('gulp-ng-html2js'),
  imagemin = require('gulp-imagemin'),
  replace = require('gulp-replace'),
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

if (IS_RELEASE_BUILD) {
  gutil.log(
    gutil.colors.red('--release:'),
    'Building release version (minified, debugs stripped)...'
  );
}

gulp.task('phonegap-build', ['clean'], function () {
  gulp.run('grunt-phonegap-build');
});

gulp.task('phonegap-build-android', function () {
  gulp.run('grunt-phonegap-build-android');
});

gulp.task('phonegap-run-android', function () {
  gulp.run('grunt-phonegap-run-android');
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

gulp.task('html', ['styles', 'scripts', 'ng-templace-cache'], function () {
  var indexHtmlFilter = filter('index.html'),
    ngViewsFilter = filter('views/*.html'),
    appJsFilter = filter('js/app.js'),
    vendorJsFilter = filter('js/vendor.js'),
    appCssFilter = filter('css/app.css'),
    vendorCssFilter = filter('css/vendor.css'),
    revvedVendorCss = revvedAppCss = revvedVendorJs = revvedAppJs = 'test';

  return gulp.src(src.jade + 'index.jade')
    .pipe(plumber())
    .pipe(jade({
      data: pkg,
      pretty: true
    }))
    .pipe(gulp.dest(debugDest.root))
    .pipe(useref.assets({
      searchPath: debugDest.root
    }))
    .pipe(vendorJsFilter)
    .pipe(ngmin())
  // .pipe(uglify({
  //   mangle: false
  // }))
  // .pipe(rev()).on('data', function (file) {
  //   revvedVendorJs = file.relative;
  // })
  .pipe(vendorJsFilter.restore())
    .pipe(appJsFilter)
    .pipe(ngmin())
  // .pipe(uglify({
  //   mangle: false
  // }))
  // .pipe(rev()).on('data', function (file) {
  //   revvedAppJs = file.relative;
  // })
  .pipe(appJsFilter.restore())
    .pipe(vendorCssFilter)
    .pipe(minifyCss())
  // .pipe(rev()).on('data', function (file) {
  //   revvedVendorCss = file.relative;
  // })
  .pipe(gulp.dest(releaseDest.root))
    .pipe(vendorCssFilter.restore())
    .pipe(appCssFilter)
    .pipe(minifyCss())
  // .pipe(rev()).on('data', function (file) {
  //   revvedAppCss = file.relative;
  // })
  .pipe(appCssFilter.restore())
    .pipe(rev()).on('data', function (file) {
      console.log(file.base, file.stat, file.revOrigPath, file.path);
      Object.keys(file).forEach(function (path, orig) {
        console.log(path, orig);
      });
    })
    .pipe(rev.manifest()).on('data', function (manifest) {
      // console.log(manifest.base, manifest.stat, manifest.revOrigPath, manifest.path);
      Object.keys(manifest).forEach(function (path, orig) {
        console.log(path, orig);
      });
    })
    .pipe(useref.restore())
    .pipe(useref())
    .pipe(indexHtmlFilter)
    .pipe(replace('css/vendor.css', function () {
      return revvedVendorCss;
    }))
    .pipe(replace('css/app.css', function () {
      return revvedAppCss;
    }))
    .pipe(replace('js/vendor.js', function () {
      return revvedVendorJs;
    }))
    .pipe(replace('js/app.js', function () {
      return revvedAppJs;
    }))
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(indexHtmlFilter.restore())
    .pipe(gulp.dest(releaseDest.root))
    .pipe(rev.manifest())
    .pipe(connect.reload());
});

//AngularJs Template Cache
gulp.task('ng-templace-cache', function () {
  gulp.src(src.jade + 'views/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      data: pkg,
      pretty: true
    }))
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(templateCache({
      module: 'givitApp',
      root: 'views/'
    }))
    .pipe(concat('views.js'))
    .pipe(gulp.dest(debugDest.js));
});

// Styles
gulp.task('styles', function () {
  return gulp.src([src.sass + '*.scss', '!' + src.sass + '_*.scss'])
    .pipe(plumber())
    .pipe(sass({
      style: 'expanded',
      loadPath: 'app/bower_components'
    }))
    .pipe(autoprefixer('last 1 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(debugDest.css))
    .pipe(connect.reload());
});

// Scripts
gulp.task('scripts', function () {
  var appFilter = filter('app.js');

  return gulp.src(src.js + '**/*.js')
    .pipe(plumber())
  // .pipe(jscs())
  .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
  // .pipe(appFilter)
  // .pipe(browserify({
  //   insertGlobals: true,
  //   debug: !IS_RELEASE_BUILD
  // }))
  // .pipe(appFilter.restore())
  .pipe(gulp.dest(debugDest.js))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  watch({
    glob: src.js + '**/*.js'
  }, ['scripts']);

  watch({
    glob: [src.sass + '/**/*.scss']
  }, ['styles']);

  watch({
    glob: [src.jade + '/**/*.jade']
  }, ['html']);
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
    .pipe(gulp.dest(debugDest.img))
    .pipe(gulp.dest(releaseDest.img))
});

// Clean
gulp.task('clean', function () {
  return gulp.src([debugDest.root, releaseDest.root], {
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
    src.root + 'robots.txt',
    src.root + '**/.pgbomit'
  ];

  gulp.src(filesToCopy, {
    base: src.root
  })
    .pipe(gulp.dest(debugDest.root))
    .pipe(gulp.dest(releaseDest.root));

  gulp.src(src.root + 'bower_components/**', {
    base: src.root
  })
    .pipe(gulp.dest(debugDest.root))
});

gulp.task('connect', ['watch'], function () {
  connect.server({
    root: [debugDest.root],
    port: 9000,
    livereload: true,
    open: LAUNCH
  });

  connect.server({
    root: [releaseDest.root],
    port: 9001,
    livereload: false,
    open: LAUNCH
  });
});

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
  gulp.start('images', 'bower', 'copy', 'html');
});