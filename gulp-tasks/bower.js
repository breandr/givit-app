var pkg = require('../package.json'),
  buildConfig = require('./config.js'),
  src = buildConfig.paths.src,
  debugDest = buildConfig.paths.debug,
  releaseDest = buildConfig.paths.release,
  gulp = require('gulp'),
  wiredep = require('wiredep');

// 1. Write bower components to index.jade
gulp.task('bower', function () {
  return wiredep({
    directory: src.root + 'bower_components',
    bowerJson: require('../bower.json'),
    src: src.root + 'index.jade',
    ignorePath: 'app/',
    exclude: [
      /app\\bower_components\\sass-bootstrap\\dist\\css\\bootstrap\.css/, //we include this in our own bootstrap.css
      /app\\bower_components\\font-awesome\\css\\font-awesome\.css/ //we include this in our own font-awesome.css
    ]
  });
});