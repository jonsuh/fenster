module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    force: 'grunt-force-task'
  });

  grunt.initConfig({
    sass: {
      options: {
        // includePaths: [
        //   'node_modules/',
        // ],
        sourceMap: true,
      },
      build: {
        files: [{
          expand: true,
          cwd : 'assets/_sass/',
          src : ['**/*.scss'],
          dest: 'assets/css/',
          ext : '.css',
        }],
      },
    },

    postcss: {
      build: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')(grunt.file.readJSON('./config.postcss.json').autoprefixer),
          ],
        },
        files: [{
          expand: true,
          cwd : 'assets/css',
          src : ['**/*.css'],
          dest: 'assets/css',
          ext : '.css',
        }],
      },
      dist: {
        options: {
          map: false,
          processors: [
            require('postcss-csscomb')(grunt.file.readJSON('./config.postcss.dist.json')['postcss-csscomb']),
            require('cssnano')(grunt.file.readJSON('./config.postcss.dist.json').cssnano),
          ]
        },
        files: [{
          expand: true,
          cwd : 'assets/css',
          src : ['**/*.css'],
          dest: 'dist/assets/css',
          ext : '.css',
        }],
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc',
      },
      target: ['assets/_js/**/*.js'],
    },

    concat: {
      options: {
        sourceMap: true,
      },
      build: {
        files: {
          'assets/js/app.js': [
            'assets/_js/app.js',
          ],
        },
      },
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd : 'assets/js',
          src : ['**/*.js',],
          dest: 'dist/assets/js',
          ext : '.js',
        }],
      },
    },

    imagemin: {
      dist: {
        options: {
        },
        files: [{
          expand: true,
          cwd : 'assets/images',
          src : ['**'],
          dest: 'dist/assets/images',
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

  grunt.registerTask('build', ['css', 'js']);
  grunt.registerTask('css', ['sass:build', 'postcss:build']);
  grunt.registerTask('js', ['force:eslint', 'concat:build']);

  grunt.registerTask('dist', ['dist:css', 'dist:js']);
  grunt.registerTask('dist:css', ['postcss:dist']);
  grunt.registerTask('dist:js', ['uglify:dist']);
  grunt.registerTask('dist:images', ['imagemin:dist']);
  grunt.registerTask('dist:all', ['dist', 'dist:images']);

  grunt.registerTask('default', ['build', 'browserSync', 'watch']);
};
