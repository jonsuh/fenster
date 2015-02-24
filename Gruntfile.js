module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({
    sass: {
      options: {
        // includePaths: [
        //   'bower_components/bourbon/dist',
        // ],
        // sourceMap: true,
      },
      build: {
        files: [{
          expand: true,
          cwd   : 'assets/sass/',
          src   : ['*.scss'],
          dest  : 'assets/css/',
          ext   : '.css',
        }],
      },
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9'],
      },
      build: {
        files: [{
          expand: true,
          cwd   : 'assets/css/',
          src   : ['*.css'],
          dest  : 'assets/css/',
          ext   : '.css',
        }],
      },
    },

    cssmin: {
      options: {
        report: 'min',
      },
      dist: {
        files: [{
          expand: true,
          cwd   : 'assets/css/',
          src   : ['**/*.css'],
          dest  : 'assets/css/',
          ext   : '.css',
        }],
      },
    },

    concat: {
      options: {
        // sourceMap: true
      },
      build: {
        files: {
          'assets/js/script.js': [
            'assets/js/src/app.js',
          ],
        },
      },
    },

    uglify: {
      options: {
        report: 'min',
      },
      dist: {
        files: [{
          expand: true,
          cwd   : 'assets/js/',
          src   : [
            '**/*.js',
            '!src/**/*.js',
          ],
          dest  : 'assets/js/',
          ext   : '.js',
        }],
      },
    },

    watch: {
      js: {
        files: ['assets/js/src/**/*.js'],
        tasks: ['build-js'],
      },
      sass: {
        // options: {
        //   livereload: true,
        // },
        files: ['assets/sass/**/*.scss'],
        tasks: ['build-css'],
      },
    },

    browserSync: {
      watch: {
        options: {
          watchTask: true,
          server: {
            baseDir: './',
          },
        },
        bsFiles: {
          src: [
            'assets/css/*.css',
          ],
        },
      },
    },
  });

  grunt.registerTask('build-css', ['sass:build', 'autoprefixer:build']);
  grunt.registerTask('build-js', ['concat:build']);
  grunt.registerTask('build', ['build-css', 'build-js']);

  grunt.registerTask('dist-css', ['cssmin:dist']);
  grunt.registerTask('dist-js', ['uglify:dist']);
  grunt.registerTask('dist', ['build', 'dist-css', 'dist-js']);

  grunt.registerTask('default', ['build', 'browserSync', 'watch']);
};