
// var formatFailedStep = function(step) {

//     var stack = step.trace.stack;
//     var message = step.message;
//     if (stack) {
//       // remove the trailing dot
//       var firstLine = stack.substring(0, stack.indexOf('\n') - 1);
//       if (message && message.indexOf(firstLine) === -1) {
//         stack = message + '\n' + stack;
//       }
  
//       // remove jasmine stack entries
//       return stack.replace(/\n.+jasmine\.js\?\w*\:.+(?=(\n|$))/g, '');
//     }
  
//     return message;
//   };
  
//   var indexOf = function(collection, item) {
//     if (collection.indexOf) {
//       return collection.indexOf(item);
//     }
  
//     for (var i = 0, ii = collection.length; i < ii; i++) {
//       if (collection[i] === item) {
//         return i;
//       }
//     }
  
//     return -1;
//   };
  
//   function WorkerReporterOld() {
  
//     var getAllSpecNames = function(topLevelSuites) {
//       var specNames = {};
  
//       var processSuite = function(suite, pointer) {
//         var childSuite;
//         var childPointer;
  
//         for (var i = 0; i < suite.suites_.length; i++) {
//           childSuite = suite.suites_[i];
//           childPointer = pointer[childSuite.description] = {};
//           processSuite(childSuite, childPointer);
//         }
  
//         pointer._ = [];
//         for (var j = 0; j < suite.specs_.length; j++) {
//           pointer._.push(suite.specs_[j].description);
//         }
//       };
  
//       var suite;
//       var pointer;
//       for (var k = 0; k < topLevelSuites.length; k++) {
//         suite = topLevelSuites[k];
//         pointer = specNames[suite.description] = {};
//         processSuite(suite, pointer);
//       }
  
//       return specNames;
//     };
  
  
//     this.jasmineStarted = function(runner) {
//       var specNames = getAllSpecNames(runner.topLevelSuites());
//       var data = {
//         total: runner.specs().length,
//         specs: specNames
//       };
//       self.postMessage({event: "reportRunnerStarting", data: data});
//     }
  
//     this.jasmineDone = function(runner) {
//       self.postMessage({event: "reportRunnerResults"});
//     }
  
//     this.suiteDone = function(suite) {
//       // memory clean up
//       suite.after_ = null;
//       suite.before_ = null;
//       suite.queue = null;
//     }
  
//     this.specStarted = function(spec) {
//       spec.results_.time = new Date().getTime();
//     };
  
//     this.specDone = function(spec) {
//       var result = {
//         id: spec.id,
//         description: spec.description,
//         suite: [],
//         success: spec.results_.failedCount === 0,
//         skipped: spec.results_.skipped,
//         time: spec.results_.skipped ? 0 : new Date().getTime() - spec.results_.time,
//         log: []
//       };
  
//       var suitePointer = spec.suite;
//       while (suitePointer) {
//         result.suite.unshift(suitePointer.description);
//         suitePointer = suitePointer.parentSuite;
//       }
  
//       if (!result.success) {
//         var steps = spec.results_.items_;
//         for (var i = 0; i < steps.length; i++) {
//           if (!steps[i].passed_) {
//             result.log.push(formatFailedStep(steps[i]));
//           }
//         }
//       }
  
//       self.postMessage({event: "reportSpecResults", data: result});
  
//       // memory clean up
//       spec.results_ = null;
//       spec.spies_ = null;
//       spec.queue = null;
//     }
  
//     this.log = function() {};
//   }
  
//   const WorkerReporter = {
//     jasmineStarted: function(suiteInfo) {
//       self.postMessage({event: "jasmineStarted", data: suiteInfo});
//     },
  
//     suiteStarted: function(result) {
//       self.postMessage({event: "suiteStarted", data: result});
//       // Object{event: 'suiteStarted', data: Object{id: 'suite1', description: 'Mytest', fullName: 'Mytest', failedExpectations: [], deprecationWarnings: [], duration: null, properties: null}}
  
//     },
  
//     specStarted: function(result) {
//       self.postMessage({event: "specStarted", data: result});
//     },
  
//     specDone: function(result) {
//       self.postMessage({event: "specDone", data: JSON.stringify(result)});
//       // Object{event: 'specDone', data: Object{id: 'spec0', description: 'should work', fullName: 'Mytest jasmine should work', failedExpectations: [...], passedExpectations: [], deprecationWarnings: [], pendingReason: '', duration: 1, properties: null, status: 'failed'}}
//       // Object{event: 'specDone', data: Object{id: 'spec1', description: 'should work', fullName: 'Mytest new Pusher should work', failedExpectations: [], passedExpectations: [...], deprecationWarnings: [], pendingReason: '', duration: 6, properties: null, status: 'passed'}}
  
//       karmaResult = {
//         description: result.fullName,
//         suite:  [],
//         success: result.status === 'passed',
//         log:  result.failedExpectations.concat(result.passedExpectations),
//         time: result.duration
//       }
//       self.postMessage({event: "reportSpecResults", data: karmaResult});
//     },
  
//     suiteDone: function(result) {
//       self.postMessage({event: "suiteDone", data: result});
//     },
  
//     jasmineDone: function(result) {
//       self.postMessage({event: "jasmineDone", data: result});
//       self.postMessage({event: "reportRunnerResults"});
//     }
//   }
  

(function(){
    self.postMessage({event: "mine", data: "start jasmine.karma.worker.js"});

    var jasmineEnv = jasmine.getEnv();
    self.postMessage({event: "mine", data: "jasmineEnv " + jasmineEnv});


    const WorkerReporter = {
    jasmineStarted: function(suiteInfo) {
        self.postMessage({event: "jasmineStarted", data: suiteInfo});
    },
    
    suiteStarted: function(result) {
        self.postMessage({event: "suiteStarted", data: result});
        // Object{event: 'suiteStarted', data: Object{id: 'suite1', description: 'Mytest', fullName: 'Mytest', failedExpectations: [], deprecationWarnings: [], duration: null, properties: null}}
    
    },
    
    specStarted: function(result) {
        self.postMessage({event: "specStarted", data: result});
    },
    
    specDone: function(result) {
        self.postMessage({event: "specDone", data: JSON.stringify(result)});
        // Object{event: 'specDone', data: Object{id: 'spec0', description: 'should work', fullName: 'Mytest jasmine should work', failedExpectations: [...], passedExpectations: [], deprecationWarnings: [], pendingReason: '', duration: 1, properties: null, status: 'failed'}}
        // Object{event: 'specDone', data: Object{id: 'spec1', description: 'should work', fullName: 'Mytest new Pusher should work', failedExpectations: [], passedExpectations: [...], deprecationWarnings: [], pendingReason: '', duration: 6, properties: null, status: 'passed'}}
    
        karmaResult = {
        description: result.fullName,
        suite:  [],
        success: result.status === 'passed',
        log:  result.failedExpectations.concat(result.passedExpectations),
        time: result.duration
        }
        self.postMessage({event: "reportSpecResults", data: karmaResult});
    },
    
    suiteDone: function(result) {
        self.postMessage({event: "suiteDone", data: result});
    },
    
    jasmineDone: function(result) {
        self.postMessage({event: "jasmineDone", data: result});
        self.postMessage({event: "reportRunnerResults"});
    }
    }

    self.postMessage({event: "mine", data: "WorkerReporter " + WorkerReporter});

    jasmineEnv.addReporter(WorkerReporter);

    self.postMessage({event: "mine", data: "end jasmine.karma.worker.js"});
    
})();

