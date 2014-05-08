var paths = require('./config.js').paths,
  gulp = require('gulp'),
  wiredep = require('wiredep');

// 1. Write bower components to index.jade
gulp.task('bower', function () {
  return wiredep({
    directory: paths.src.root + 'bower_components',
    bowerJson: require('../bower.json'),
    src: paths.src.root + 'index.jade',
    ignorePath: 'app/',
    exclude: [
      /app\\bower_components\\sass-bootstrap\\dist\\css\\bootstrap\.css/, //we include this in our own bootstrap.css
      /app\\bower_components\\font-awesome\\css\\font-awesome\.css/ //we include this in our own font-awesome.css
    ]
  });
});