var srcRoot = './app',
debugRoot = './debug',
releaseRoot = './dist';

module.exports = {
    paths: {
        src: {
            root: srcRoot,
            html: srcRoot,
            img: srcRoot + 'images/',
            sass: srcRoot + 'sass/',
            js: srcRoot + 'scripts'
        },
        debug: {
            root: debugRoot,
            html: debugRoot,
            img: debugRoot + 'images/',
            css: debugRoot + 'css/',
            js: debugRoot + 'scripts'
        },
        release: {
            root: releaseRoot,
            html: releaseRoot,
            img: releaseRoot + 'images/',
            css: releaseRoot + 'css/',
            js: releaseRoot + 'scripts'
        }
    }
  banner:
    '/*!\n' +
    ' * Givit, v<%= pkg.version %>\n' +
    ' * http://givit.com.au/\n' +
    ' *\n' +
    ' * By @breandr\n' +
    ' */\n\n'
};