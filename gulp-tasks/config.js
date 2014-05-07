var srcRoot = 'app/',
  debugRoot = 'builds/debug/',
  releaseRoot = 'builds/release/',
  phonegapDebugRoot = 'builds/phonegap-debug/',
  phonegapReleaseRoot = 'builds/phonegap-release/';

module.exports = {
  paths: {
    src: {
      root: srcRoot,
      jade: srcRoot,
      views: srcRoot + 'views/',
      img: srcRoot + 'img/',
      sass: srcRoot + 'sass/',
      bowerComponents: srcRoot + 'bower_components/',
      js: srcRoot + 'js/',
      fonts: srcRoot + 'fonts/'
    },
    debug: {
      root: debugRoot,
      html: debugRoot,
      views: debugRoot + 'views/',
      img: debugRoot + 'img/',
      css: debugRoot + 'css/',
      bowerComponents: debugRoot + 'bower_components/',
      js: debugRoot + 'js/',
      fonts: debugRoot + 'fonts/'
    },
    release: {
      root: releaseRoot,
      html: releaseRoot,
      views: releaseRoot + 'views/',
      img: releaseRoot + 'img/',
      css: releaseRoot + 'css/',
      js: releaseRoot + 'js/',
      fonts: releaseRoot + 'fonts/'
    },
    'phonegap-debug': {
      root: phonegapDebugRoot,
      html: phonegapDebugRoot,
      views: phonegapDebugRoot + 'views/',
      img: phonegapDebugRoot + 'img/',
      css: phonegapDebugRoot + 'css/',
      bowerComponents: phonegapDebugRoot + 'bower_components/',
      js: phonegapDebugRoot + 'js/',
      fonts: phonegapDebugRoot + 'fonts/'
    },
    'phonegap-release': {
      root: phonegapReleaseRoot,
      html: phonegapReleaseRoot,
      views: phonegapReleaseRoot + 'views/',
      img: phonegapReleaseRoot + 'img/',
      css: phonegapReleaseRoot + 'css/',
      js: phonegapReleaseRoot + 'js/',
      fonts: phonegapReleaseRoot + 'fonts/'
    }
  },
  banner: '/*!\n' +
    ' * Givit, v<%= pkg.version %>\n' +
    ' * http://givit.com.au/\n' +
    ' *\n' +
    ' * By @breandr\n' +
    ' */\n\n'
};