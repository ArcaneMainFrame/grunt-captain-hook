'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
        main: {
            expand: true,
            cwd: 'test/fixtures',
            src: '*',
            dest: 'test/tmp/'
        }
    },
    clean: ['test/tmp'],
    captain_hook: {
        basic: {
            template: 'test/tmp/basic.html',
            injections: {
                js: ['js/site.js'],
                css: ['css/site.css']
            }
        },
        basicMinified: {
            template: 'test/tmp/basicMinified.html',
            injections: {
                js: ['js/site.min.js'],
                css: ['css/site.min.css']
            }
        },
        existingOrder: {
            template: 'test/tmp/existingOrder.html',
            injections: {
                js: ['js/site1.js', 'js/site2.js', 'js/site3.js', 'js/site4.js', 'js/site5.js'],
                css: ['css/site1.css', 'css/site2.css', 'css/site3.css']
            }
        },
        scssFile: {
            template: 'test/tmp/scssFile.scss',
            injections: {
                scss: ['_partial1.scss', '_partial2.scss', '_partial3.scss']
            }
        },
        messedUp: {
            template: 'test/tmp/messedUp.html',
            injections: {
                jsx: ['test1.jsx', 'test2.jsx']
            }
        },
        multiple: {
            template: 'test/tmp/multiple.scss',
            injections: {
                scss1: ['file1.scss', 'file2.scss'],
                scss2: ['file3.scss', 'file4.scss']
            }
        },
        multiInjection: [
            {
                template: 'test/tmp/multiInjectionScss.scss',
                injections: {
                    scss1: ['file1.scss', 'file2.scss'],
                    scss2: ['file3.scss', 'file4.scss']
                }
            },
            {
                template: 'test/tmp/multiInjectionHtml.html',
                injections: {
                    js: ['js/site1.js', 'js/site2.js', 'js/site3.js', 'js/site4.js', 'js/site5.js'],
                    css: ['css/site1.css', 'css/site2.css', 'css/site3.css']
                }
            }
        ],
        customInjection: [
            {
                template: 'test/tmp/customInjectionJs.js',
                injections: {
                    js: ['file1.js', 'file2.js']
                },
                commentStyle: "// <%= marker %>:<%= type %>"
            },
            {
                template: 'test/tmp/customInjectionLess.less',
                injections: {
                    less1: ['file1.less', 'file2.less'],
                    less2: ['file3.less', 'file4.less']
                }
            }
        ],
        glob: {
            template: 'test/tmp/glob.html',
            injections: {
                js: ['js/**/*.js'],
                css: ['css/**/*.css']
            },
            options: {
                cwd: 'test/fixtures'
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadTasks('tasks');

}
