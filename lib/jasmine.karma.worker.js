(function(){
    const WorkerReporter = {
        jasmineStarted: function(suiteInfo) {
            self.postMessage({event: "jasmineStarted", data: suiteInfo});
        },
        
        suiteStarted: function(result) {
            self.postMessage({event: "suiteStarted", data: result});
        
        },
        
        specStarted: function(result) {
            self.postMessage({event: "specStarted", data: result});
        },
    
        specDone: function(result) {
            self.postMessage({event: "specDone", data: JSON.stringify(result)});

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
            
    }

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.addReporter(WorkerReporter);
    // We should try to get the config from karma
    jasmineEnv.configure({random: false});

    const execute = async function () {
        await jasmineEnv.execute();
        self.postMessage({event: "reportRunnerResults"});
    }

    execute();
})();


