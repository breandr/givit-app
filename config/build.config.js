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
      img: debugRoot + 'images/',
      css: debugRoot + 'styles/',
      js: debugRoot + 'scripts/',
      fonts: debugRoot + 'fonts/'
    },
    release: {
      root: releaseRoot,
      html: releaseRoot,
      img: releaseRoot + 'images/',
      css: releaseRoot + 'styles/',
      js: releaseRoot + 'scripts/',
      fonts: releaseRoot + 'fonts/'
    }
  },
  banner: '/*!\n' +
    ' * Givit, v<%= pkg.version %>\n' +
    ' * http://givit.com.au/\n' +
    ' *\n' +
    ' * By @breandr\n' +
    ' */\n\n'
};