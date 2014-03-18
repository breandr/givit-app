///
var pkg = require("./package.json")
  , rimraf = require("rimraf")
  , gulp = require("gulp")
  , gutil = require("gulp-util")
  , filter = require("gulp-filter")
  , plumber = require("gulp-plumber")
  , concat = require("gulp-concat")
 
gulp.task("clean", function() {
  rimraf.sync("./dist/")
})
 
///
// HTML (Jade)
///
var jade = require("gulp-jade")
  , htmlFiles = ["./src/html/**/*.jade"]
gulp.task("html", function() {
  gulp.src(htmlFiles)
    .pipe(plumber())
    .pipe(jade({
        data: pkg
      , pretty: true
    }))
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload(livereloadServer))
})
 
///
// Static server
///
var connect = require("connect")
  , livereloadServer = require("tiny-lr")()
  , livereload = require("gulp-livereload")
  , serverAddress = "http://" + pkg.gulp.server.host + ":" + pkg.gulp.server.port + "/"
gulp.task("server", function() {
  connect()
    .use(require("connect-livereload")({
      port: pkg.gulp.livereloadServer.port
    }))
    .use(connect.static("./dist"))
    .listen(pkg.gulp.server.port)
  gutil.log("Connect server running at " + serverAddress)
})
gulp.task("server.open", function() {
  // src is needed, but not used, cause of gulp way.
  gulp.src("./package.json")
    .pipe(require("gulp-open")("", {url: serverAddress}))
})
 
///
// Lint JS
///
var jshint = require("gulp-jshint")
  , jscs = require("gulp-jscs")
  , jsonFiles = [
      "*.json"
    , ".jshintrc"
    , ".csslintrc"
    ]
  , jsFiles = [
      "*.js"
    , "./src/js/**/*.js"
    ]
gulp.task("lint-scripts", function() {
  gulp.src(jsFiles.concat(jsonFiles))
    .pipe(plumber())
    // dont jscs json files
    // .pipe(filter(["!*.json", "!*rc"]))
    // .pipe(jscs())
    // .pipe(filter.end())
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("jshint-stylish"))
 
  gulp.src(jsFiles)
    .pipe(plumber())
    .pipe(jscs())
})
 
///
// JS
///
var browserify = require("gulp-browserify")
  , browserifyTransform = [
      "jadeify"
    , "debowerify"
    , "decomponentify"
    // this transform is not working write now
    // something is breaking the process (a semicolon somewhere...)
    //, "deamdify"
    , "deglobalify"
    , "es6ify"
  ]
if (gulp.env.production) {
  browserifyTransform.push("uglifyify")
}
gulp.task("scripts", [
    "lint-scripts"
  ]
  , function() {
  // just grab files that are at the root
  // others files are considered as module
  gulp.src(["./src/js/index.js"])
    .pipe(plumber())
    .pipe(browserify({
        transform: browserifyTransform
      //, insertGlobals : true
      , debug: gulp.env.production !== undefined
    }))
    .pipe(concat("index.js"))
    .pipe(gulp.dest("./dist/js/"))
    .pipe(livereload(livereloadServer))
})
 
///
// CSS
///
var rework = require("gulp-rework")
  , reworkPlugins = {
      imprt: require("rework-import")
    , parent: require("rework-parent")
    , breakpoints: require("rework-breakpoints")
    , vars: require("rework-vars")
    , calc: require("rework-calc")
    , clearfix: require("rework-clearfix")
  }
  , autoprefixer = require("gulp-autoprefixer")
  , csso = require("gulp-csso")
gulp.task("styles", function() {
  gulp.src("./src/css/*.css")
    .pipe(plumber())
    .pipe(
      rework(
        // enhancements
          reworkPlugins.imprt("./src/css")
        , rework.colors()
        , rework.references()
        // https://github.com/jxson/rework-import/issues/2
        // , reworkPlugins.imprt([
        //       "./src/css"
        //     , "bower_components"
        //     , "node_modules"
        //   ])
        , reworkPlugins.parent
        , reworkPlugins.breakpoints
        , reworkPlugins.vars()
        , reworkPlugins.calc
        , reworkPlugins.clearfix
        , rework.ease()
        , rework.extend()
        , {
          sourcemap: true
        }
      )
    )
    .pipe(autoprefixer())
    .pipe(gulp.env.production ? csso() : gutil.noop())
    .pipe(gulp.dest("./dist/css/"))
    .pipe(livereload(livereloadServer))
 
  //gulp.run("lint-styles")
})
 
///
// Lint CSS
///
var csslint = require("gulp-csslint")
gulp.task("lint-styles", function() {
  gulp.src("./dist/css/**/*.css")
    .pipe(plumber())
    .pipe(csslint(".csslintrc"))
    .pipe(csslint.reporter())
})
 
///
// Static files
///
 
var symlink = require("gulp-symlink");
gulp.task("static", function() {
  gulp.src("./src/static/*")
    .pipe(symlink("dist/"))
});
 
///
// Tasks
///
gulp.task("install", ["clean"], function() {
  gulp.run("scripts")
  gulp.run("styles")
  gulp.run("html")
  gulp.run("static")
})
 
gulp.task("dev", [
    "install"
  , "server"
  ]
  , function() {
    livereloadServer.listen(pkg.gulp.livereloadServer.port, function(err) {
      if (err) { return gutil.log(err) }
 
      gulp.watch(["*.js", "./src/js/**/*"], function(event) {
        gulp.run("scripts")
      })
 
      gulp.watch("./src/css/**/*", function(event) {
        gulp.run("styles")
      })
 
      gulp.watch("./src/html/**/*", function(event) {
        gulp.run("html")
      })
    })
 
    gulp.run("server.open")
  })
 
gulp.task("default", function() {
  // remove that task when `gulp --tasks` works
  if (gulp.env.tasks) {
    gutil.log(Object.keys(gulp.tasks))
    return
  }
 
  gulp.run("dev")
})