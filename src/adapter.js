function handleMessage(tc, e) {
  var message = e.data;

  switch (message.event) {
    case "reportSpecResults":
      tc.result(message.data);
      break;
    case "reportRunnerStarting":
      tc.info(message.data);
      break;
    case "reportRunnerResults":
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
      event: "start",
      data: {
        files: files
      }
    });
  };
};
