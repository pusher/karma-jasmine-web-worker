self.onmessage = function(e) {
  var message = e.data;
  if (message.event === "start") {
    var files = message.data.files;
    files.forEach(function(file){
      importScripts(file);
    });
    init();
  }
}

function init(){
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.execute();
}