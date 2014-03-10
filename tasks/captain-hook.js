/*
 * grunt-link-html
 * https://github.com/pythonandchips/grunt-link-html
 *
 * Copyright (c) 2013 Colin Gemmell
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('captain_hook', 'link css and javascipt in html file', function () {

    var options = this.options({
      cwd: '.'
    });

    function processCssIncludes() {
      var cssLink;
      if (typeof cssFile === 'string') {
        cssLink = '<link rel="stylesheet" type="text/css" href="' + cssFile + '">';

        return cssLink;
      }
      else {
        var css = cssFile.length;
        var element = null;
        var cssLinks = [];

        for (var i = 0; i < css; i++) {
          element = '<link rel="stylesheet" type="text/css" href="' + cssFile[i] + '">';
          cssLinks.push(element);
        }
        return cssLinks.join('\n');
      }
    }

    function processJsIncludes() {
      var jsLinks;
      if (typeof jsFile === 'string') {
        jsLinks = '<script src="' + jsFile + '"></script>';
        return jsLinks;
      }
      else {
        var js = jsFile.length;
        var element = null;
        jsLinks = [];

        for (var i = 0; i < js; i++) {
          element = '<script src="' + jsFile[i] + '"></script>';
          jsLinks.push(element);
        }
        return jsLinks.join('\n');
      }
    }

    var processIncludes = function (filepath, content, fileType, files) {
      var begin = content.html.match(new RegExp('<!--\\s*begin:' + fileType + '\\s*-->'));
      var skip = false;
      if (begin) {
        var end = content.html.match(new RegExp('<!--\\s*end:' + fileType + '\\s*-->')).index;
        var startReplace = begin.index + begin[0].length;
        content.html = content.html.substring(0, startReplace) + files + content.html.substring(end, content.html.length);
      } else {
        skip = true;
        grunt.log.ok('Skipping ' + fileType + ' for ' + filepath);
      }
      return skip;
    };
    var cssFile = this.data.cssFiles;
    var jsFile = this.data.jsFiles;
    var cssIncludes = processCssIncludes();
    var jsIncludes = processJsIncludes();
    var targetFiles = grunt.file.expand(options, this.data.targetHtml);


    targetFiles.forEach(function (filepath) {
      var content = { html: grunt.file.read(options.cwd + '/' + filepath) };
      var skipCss = processIncludes(filepath, content, 'css', cssIncludes);
      var skipJs = processIncludes(filepath, content, 'js', jsIncludes);
      grunt.log.ok('Writing file ' + filepath);
      grunt.file.write(options.cwd + '/' + filepath, content.html);
    });

  });

};
