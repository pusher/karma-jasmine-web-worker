var path = require('path')

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initJasmine = function(files) {
  // Add before other files
  files.unshift(createPattern(__dirname + '/adapter.js'));
  files.unshift(createPattern(__dirname + '/jasmine.worker.js'));

  var jasminePath = path.dirname(require.resolve('jasmine-core'))
  files.unshift(createPattern(jasminePath + '/jasmine-core/jasmine.js'))

  // Add after all files
  files.push(createPattern(__dirname + '/jasmine.karma.worker.js'));
};

initJasmine.$inject = ['config.files'];

module.exports = {
  'framework:jasmine-web-worker': ['factory', initJasmine]
};
