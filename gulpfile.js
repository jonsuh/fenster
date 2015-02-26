var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    cssmin       = require('gulp-minify-css'),
    filter       = require('gulp-filter'),
    reload       = browserSync.reload,
    runSequence  = require('run-sequence'),
    sass         = require('gulp-sass'),
    size         = require('gulp-size'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify');

gulp.task('sass', function() {
  return gulp.src('assets/sass/**/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass({
      // includePaths: [
      //   'bower_components/bourbon/app/assets/stylesheets',
      // ]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'))
    .pipe(filter('**/*.css'))
    .pipe(reload({stream: true}));
});

gulp.task('cssmin', function() {
  return gulp.src('assets/css/**/*.css')
    .pipe(cssmin())
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('concat', function() {
  return gulp.src('assets/js/src/**/*.js')
    // .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('uglify', function() {
  return gulp.src([
    'assets/js/**/*.js',
    '!assets/js/src/**/*.js'
  ])
    .pipe(uglify())
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
  gulp.watch('assets/sass/**/*.scss', ['sass']);
  gulp.watch('assets/js/src/**/*.js', ['concat']);
});

gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('build', ['sass', 'concat']);

gulp.task('dist', function() {
  runSequence('build', 'cssmin', 'uglify');
});

gulp.task('default', ['build', 'browsersync', 'watch']);