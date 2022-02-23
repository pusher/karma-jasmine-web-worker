var path = require('path')

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initJasmine = function(files) {
  files.unshift(createPattern(__dirname + '/adapter.js'));

  var jasminePath = path.dirname(require.resolve('jasmine-core'))
  files.unshift(createPattern(jasminePath + '/jasmine-core/jasmine.js'))
};

initJasmine.$inject = ['config.files'];

module.exports = {
  'framework:jasmine-web-worker': ['factory', initJasmine]
};
