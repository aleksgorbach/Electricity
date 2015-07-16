module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: ["Content/apps/complex/**/*.ts"],
                out: "Content/apps/complex/js/complex.js"
            }
        },
        minified: {
            files: {
                src: [
                    'Content/apps/complex/js/complex.js'
                ],
                dest: 'Content/apps/complex/js/min/'
            },
            options: {
                allinone: true,
                dest_filename: 'complex.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-minified');

    grunt.registerTask('default', ['ts', 'minified']);
}