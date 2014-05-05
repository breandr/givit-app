var srcRoot = 'app/',
  debugRoot = 'builds/debug/',
  releaseRoot = 'builds/release/',
  phonegapDebugRoot = 'builds/phonegap-debug/',
  phonegapReleaseRoot = 'builds/phonegap-release/';

module.exports = {
  paths: {
    src: {
      root: srcRoot,
      html: srcRoot,
      img: srcRoot + 'img/',
      sass: srcRoot + 'sass/',
      css: srcRoot + 'css/',
      js: srcRoot + 'js/',
      fonts: srcRoot + 'fonts/'
    },
    debug: {
      root: debugRoot,
      html: debugRoot,
      img: debugRoot + 'img/',
      css: debugRoot + 'css/',
      js: debugRoot + 'js/',
      fonts: debugRoot + 'fonts/'
    },
    release: {
      root: releaseRoot,
      html: releaseRoot,
      img: releaseRoot + 'img/',
      css: releaseRoot + 'css/',
      js: releaseRoot + 'js/',
      fonts: releaseRoot + 'fonts/'
    },
    phonegapDebug: {
      root: phonegapDebugRoot,
      html: phonegapDebugRoot,
      img: phonegapDebugRoot + 'img/',
      css: phonegapDebugRoot + 'css/',
      js: phonegapDebugRoot + 'js/',
      fonts: phonegapDebugRoot + 'fonts/'
    },
    phonegapReleaseRoot: {
      root: phonegapReleaseRoot,
      html: phonegapReleaseRoot,
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