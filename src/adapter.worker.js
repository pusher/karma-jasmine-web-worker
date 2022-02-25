self.onmessage = function(e) {
  var message = e.data;
  if (message.event === "start") {
    var files = message.data.files;
    files.forEach(function(file){
      importScripts(file);
    });
  }
}
