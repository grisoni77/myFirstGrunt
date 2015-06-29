module.exports = function(grunt) {

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        useminPrepare: {
            html: 'app/*.html',
            options:{
                dest: 'dist'
            }
        },
        usemin: {
            html: 'dist/*.html'
        },
        copy: {
            app: {
                expand: true,
                cwd: 'app/',
                src: ['*.html'],
                dest: 'dist/'
            }
        },

        concat: {
            js: {
                options: {
                    separator: ";\n"
                }
            },
            css: {
                options: {
                    separator: "\n"
                }
            },
            dist: {} // provided by useminPrepare
        },

        // Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                // filerev:release hashes(md5) all assets (images, js and css )
                // in dist directory
                files: [{
                    src: [
                        //'dist/app/images/*.{png,gif,jpg,svg}',
                        'dist/js/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },

        // Empties folders to start fresh
        clean: {
            server: '.tmp'
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    //grunt.loadNpmTasks('grunt-usemin');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-filerev');
    // Load all files starting with `grunt-`
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    //grunt.registerTask('default', ['concat', 'uglify']);

    // simple build task
    grunt.registerTask('build', [
        'copy:app',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'clean',
        'filerev',
        'usemin'
    ]);

};