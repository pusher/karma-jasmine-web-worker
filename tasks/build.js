module.exports = function(grunt) {

  /**
   * Build given file - wrap it with a function call
   * TODO(vojta): compile with uglify-js
   */
  grunt.registerMultiTask('build', 'Wrap given file into a function call.', function() {
    var src = grunt.file.expand(this.data).pop();
    var dest = src.replace('src/', 'lib/');
    var wrapper = src.replace('.js', '.wrapper');
    var script = src.replace('.js', '.worker.js');

    grunt.file.copy(wrapper, dest, {process: function(content) {
      var content = content.replace(/%CONTENT%\r?\n/, grunt.file.read(src));
      return content.replace(/%SCRIPT%/, JSON.stringify(grunt.file.read(script)));
    }});

    grunt.log.ok('Created ' + dest);
  });
};
