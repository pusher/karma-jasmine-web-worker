(function(window) {

var SCRIPT = "self.onmessage = function(e) {\n  var message = e.data;\n  if (message.event === \"start\") {\n    var files = message.data.files;\n    files.forEach(function(file){\n      importScripts(file);\n    });\n    init();\n  }\n}\n\nvar formatFailedStep = function(step) {\n\n  var stack = step.trace.stack;\n  var message = step.message;\n  if (stack) {\n    // remove the trailing dot\n    var firstLine = stack.substring(0, stack.indexOf('\\n') - 1);\n    if (message && message.indexOf(firstLine) === -1) {\n      stack = message + '\\n' + stack;\n    }\n\n    // remove jasmine stack entries\n    return stack.replace(/\\n.+jasmine\\.js\\?\\w*\\:.+(?=(\\n|$))/g, '');\n  }\n\n  return message;\n};\n\nvar indexOf = function(collection, item) {\n  if (collection.indexOf) {\n    return collection.indexOf(item);\n  }\n\n  for (var i = 0, ii = collection.length; i < ii; i++) {\n    if (collection[i] === item) {\n      return i;\n    }\n  }\n\n  return -1;\n};\n\nfunction WorkerReporter() {\n\n  var getAllSpecNames = function(topLevelSuites) {\n    var specNames = {};\n\n    var processSuite = function(suite, pointer) {\n      var childSuite;\n      var childPointer;\n\n      for (var i = 0; i < suite.suites_.length; i++) {\n        childSuite = suite.suites_[i];\n        childPointer = pointer[childSuite.description] = {};\n        processSuite(childSuite, childPointer);\n      }\n\n      pointer._ = [];\n      for (var j = 0; j < suite.specs_.length; j++) {\n        pointer._.push(suite.specs_[j].description);\n      }\n    };\n\n    var suite;\n    var pointer;\n    for (var k = 0; k < topLevelSuites.length; k++) {\n      suite = topLevelSuites[k];\n      pointer = specNames[suite.description] = {};\n      processSuite(suite, pointer);\n    }\n\n    return specNames;\n  };\n\n\n  this.reportRunnerStarting = function(runner) {\n    var specNames = getAllSpecNames(runner.topLevelSuites());\n    var data = {\n      total: runner.specs().length,\n      specs: specNames\n    };\n    self.postMessage({event: \"reportRunnerStarting\", data: data});\n  }\n\n  this.reportRunnerResults = function(runner) {\n    self.postMessage({event: \"reportRunnerResults\"});\n  }\n\n  this.reportSuiteResults = function(suite) {\n    // memory clean up\n    suite.after_ = null;\n    suite.before_ = null;\n    suite.queue = null;\n  }\n\n  this.reportSpecStarting = function(spec) {\n    spec.results_.time = new Date().getTime();\n  };\n\n  this.reportSpecResults = function(spec) {\n    var result = {\n      id: spec.id,\n      description: spec.description,\n      suite: [],\n      success: spec.results_.failedCount === 0,\n      skipped: spec.results_.skipped,\n      time: spec.results_.skipped ? 0 : new Date().getTime() - spec.results_.time,\n      log: []\n    };\n\n    var suitePointer = spec.suite;\n    while (suitePointer) {\n      result.suite.unshift(suitePointer.description);\n      suitePointer = suitePointer.parentSuite;\n    }\n\n    if (!result.success) {\n      var steps = spec.results_.items_;\n      for (var i = 0; i < steps.length; i++) {\n        if (!steps[i].passed_) {\n          result.log.push(formatFailedStep(steps[i]));\n        }\n      }\n    }\n\n    self.postMessage({event: \"reportSpecResults\", data: result});\n\n    // memory clean up\n    spec.results_ = null;\n    spec.spies_ = null;\n    spec.queue = null;\n  }\n\n  this.log = function() {};\n}\n\nfunction init() {\n  var jasmineEnv = jasmine.getEnv();\n  jasmineEnv.addReporter(new WorkerReporter());\n  jasmineEnv.execute();\n}\n"

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
        files: files
      }
    });
  };
};


window.__karma__.start = createStartFn(window.__karma__);

})(window);
