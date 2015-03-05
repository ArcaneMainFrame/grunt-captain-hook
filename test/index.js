/*jshint node:true */
/*global beforeEach, afterEach, describe, it, spyOn, xdescribe, xit */
'use strict';

var fs = require('fs'),
    path = require('path'),
    expect = require("chai").expect,
    exec = require('child_process').exec;

function loadFiles(dir) {
    var filenames = fs.readdirSync(dir),
        returnObj = {};

    filenames.forEach(function (file) {
        var filename = path.basename(file, path.extname(file));
        returnObj[filename] = fs.readFileSync(path.join(dir, file), {encoding: 'utf8'});
    });

    return returnObj;
}

function loadTmpFile(file) {
    return fs.readFileSync(__dirname + "/tmp/" + file, {encoding: 'utf8'});
}

function runGruntCommand(cmd, cb) {
    exec(__dirname + '/../node_modules/.bin/grunt ' + cmd, cb);
}

function runCap(target, cb) {
    runGruntCommand('captain_hook:' + target, cb);
}

var expected = loadFiles(__dirname + '/expected');

describe("grunt-captain-hook()", function() {

    before(function(done) {
        runGruntCommand('copy', done);
    });

    // after(function(done) {
    //     exec('../node_modules/.bin/grunt clean', done)
    // });

    it('should inject references into html files', function (done) {
        runCap('basic', function () {
            expect(loadTmpFile('basic.html')).to.equal(expected.basic);
            done();
        });
    });

    it('should support injection of minified file references', function (done) {
        runCap('basicMinified', function () {
            expect(loadTmpFile('basicMinified.html')).to.equal(expected.basicMinified);
            done();
        });
    });

    it('should retain existing order of injected references', function(done) {
        runCap('existingOrder', function () {
            expect(loadTmpFile('existingOrder.html')).to.equal(expected.existingOrder);
            done();
        });
    });

    it('should support injection into scss files by default', function(done) {
        runCap('scssFile', function () {
            expect(loadTmpFile('scssFile.scss')).to.equal(expected.scssFile);
            done();
        });
    });

    it('should not modify files when comment tags are not found', function(done) {
        runCap('messedUp', function () {
            expect(loadTmpFile('messedUp.html')).to.equal(expected.messedUp);
            done();
        });
    });

    it('should allow for multiple content blocks with the same file extension', function(done) {
        runCap('multiple', function () {
            expect(loadTmpFile('multiple.scss')).to.equal(expected.multiple);
            done();
        });
    });

    it('should allow multiple injection sets within a single target', function (done) {
        runCap('multiInjection', function () {
            expect(loadTmpFile('multiInjectionScss.scss')).to.equal(expected.multiInjectionScss);
            expect(loadTmpFile('multiInjectionHtml.html')).to.equal(expected.multiInjectionHtml);
            done();
        });
    });

    it('should support globbing', function (done) {
        runCap('glob', function () {
            expect(loadTmpFile('glob.html')).to.equal(expected.glob);
            done();
        });
    });

    /* Coming soon */
    // it('should support custom templates', function (done) {
    //     runCap('customInjection', function () {
    //         expect(loadTmpFile('customInjectionLess.less')).to.equal(expected.customInjectionLess);
    //         expect(loadTmpFile('customInjectionJs.js')).to.equal(expected.customInjectionJs);
    //         done();
    //     });
    // });
});
