module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    force: 'grunt-force-task'
  });

  grunt.initConfig({
    sass: {
      options: {
        // includePaths: [
        //   'node_modules/bourbon/app/assets/stylesheets',
        // ],
        sourceMap: true,
      },
      build: {
        files: [{
          expand: true,
          cwd   : 'assets/_sass/',
          src   : ['**/*.scss'],
          dest  : 'assets/css/',
          ext   : '.css',
        }],
      },
    },

    autoprefixer: {
      options: grunt.file.readJSON('./config.postcss.json').autoprefixer,
      build: {
        files: [{
          expand: true,
          cwd   : 'assets/css/',
          src   : ['**/*.css'],
          dest  : 'assets/css/',
          ext   : '.css',
        }],
      },
    },

    csscomb: {
      options: {
        config: '/.csscomb.dist.json'
      },
      dist: {
        files: [{
          expand: true,
          cwd   : 'assets/css/',
          src   : ['**/*.css'],
          dest  : 'assets/css/',
          ext   : '.css',
        }],
      }
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

    eslint: {
      target: ['assets/_js/**/*.js']
    },

    concat: {
      options: {
        sourceMap: true
      },
      build: {
        files: {
          'assets/js/script.js': [
            'assets/_js/file1.js',
            'assets/_js/file2.js',
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
          cwd   : 'assets/_js/',
          src   : [
            '**/*.js',
          ],
          dest  : 'assets/js/',
          ext   : '.js',
        }],
      },
    },

    watch: {
      js: {
        files: ['assets/_js/**/*.js'],
        tasks: ['build:js'],
      },
      sass: {
        files: ['assets/_sass/**/*.scss'],
        tasks: ['build:css'],
      },
    },

    browserSync: {
      watch: {
        options: require('./bs-config.js'),
      },
    },
  });

  grunt.registerTask('build:css', ['sass:build', 'autoprefixer:build']);
  grunt.registerTask('build:js', ['force:eslint', 'concat:build']);
  grunt.registerTask('build', ['build:css', 'build:js']);

  grunt.registerTask('dist:css', ['csscomb:dist', 'cssmin:dist']);
  grunt.registerTask('dist:js', ['uglify:dist']);
  grunt.registerTask('dist', ['build', 'dist:css', 'dist:js']);

  grunt.registerTask('default', ['build', 'browserSync', 'watch']);
};
