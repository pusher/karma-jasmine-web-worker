(function(thisGlobal){
    var jasmineRequire = thisGlobal.jasmineRequire;

    var jasmine = jasmineRequire.core(jasmineRequire),
        global = jasmine.getGlobal();

    global.jasmine = jasmine;

    var env = jasmine.getEnv();
    var jasmineInterface = jasmineRequire.interface(jasmine, env);
    extend(global, jasmineInterface);

    env.addReporter(jasmineInterface.jsApiReporter);

    /**
     * Helper function for readability above.
     */
    function extend(destination, source) {
        for (var property in source) destination[property] = source[property];
        return destination;
    }
})(this);