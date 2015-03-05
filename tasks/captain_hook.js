/*
 * grunt-captain-hook
 *
 * This is the task for the old API; this should be avoided, if possible
 *
 */

'use strict';

var CaptainHook = require('lib-captain-hook');
var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask('captain_hook', 'link css and javascipt in html file', function() {

    var processSet = function(data) {
        var options = this.options({
          cwd: '.',
          nonull: true,
          templateType: path.extname(data.template).substr(1)
        });


        var template = data.template;
        var chInstance = new CaptainHook(grunt.file.read(template), options.templateType);

        for(var key in data.injections) {
            var groupTmp = data.injections[key];
            var group = [];
            groupTmp.forEach(function(item) {
                group = group.concat(grunt.file.expand({ cwd: options.cwd, nonull: options.nonull }, item));
            });

            grunt.file.write(template, chInstance.inject(key, group));
        }
    }.bind(this);

    if(this.data instanceof Array) {
        this.data.forEach(processSet);
    } else {
        processSet(this.data);
    }


  });



};
