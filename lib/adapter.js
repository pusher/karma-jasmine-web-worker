(function(window) {

var SCRIPT = "self.onmessage = function(e) {\n  var message = e.data;\n  if (message.event === \"start\") {\n    var files = message.data.files;\n    files.forEach(function(file){\n      importScripts(file);\n    });\n    init();\n  }\n}\n\nfunction init(){\n  var jasmineEnv = jasmine.getEnv();\n  jasmineEnv.execute();\n}"

function handleMessage(tc, e) {
  var message = e.data;

  switch (message.event) {
    case 'reportSpecResults':
      tc.result(message.data);
      break;
    case 'reportRunnerStarting':
      tc.info(message.data);
      break;
    case 'reportRunnerResults':
      tc.complete({
        coverage: window.__coverage__
      });
      break;
    default:
      // statements_def
      break;
  }
}


var createStartFn = function(tc, jasmineEnvPassedIn) {
  return function(config) {

    var files = Object.keys(window.__karma__.files);
    files = files.filter(function(file){
      return !(/lib\/adapter\.js/.test(file));
    }).map(function(file){
      return window.origin + file;
    });

    var blob = new Blob([SCRIPT], {type: 'application/javascript'});
    var worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = function(e) {
      handleMessage(tc, e);
    };

    worker.postMessage({
      event: 'start',
      data: {
        files: files,
      }
    });
  };
};


window.__karma__.start = createStartFn(window.__karma__);

})(window);
