var path = require('path')

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initJasmine = function(files) {
  var jasminePath = path.dirname(require.resolve('jasmine-core'))
  files.push(createPattern(jasminePath + '/jasmine-core/jasmine.js'))
  
  files.push(createPattern(__dirname + '/jasmine.worker.js'));
  files.push(createPattern(__dirname + '/adapter.js'));
};

initJasmine.$inject = ['config.files'];

module.exports = {
  'framework:jasmine-web-worker': ['factory', initJasmine]
};
