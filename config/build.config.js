var srcRoot = './app/',
  debugRoot = './app/',
  releaseRoot = './dist/';

module.exports = {
  paths: {
    src: {
      root: srcRoot,
      html: srcRoot,
      img: srcRoot + 'images/',
      sass: srcRoot + 'sass/',
      css: srcRoot + 'styles/',
      js: srcRoot + 'scripts/',
      fonts: srcRoot + 'fonts/'
    },
    debug: {
      root: debugRoot,
      html: debugRoot,
      img: debugRoot + 'img/',
      css: debugRoot + 'css/',
      js: debugRoot + 'js/',
      fonts: debugRoot + 'font/'
    },
    release: {
      root: releaseRoot,
      html: releaseRoot,
      img: releaseRoot + 'img/',
      css: releaseRoot + 'css/',
      js: releaseRoot + 'js/',
      fonts: releaseRoot + 'font/'
    }
  },
  banner: '/*!\n' +
    ' * Givit, v<%= pkg.version %>\n' +
    ' * http://givit.com.au/\n' +
    ' *\n' +
    ' * By @breandr\n' +
    ' */\n\n'
};