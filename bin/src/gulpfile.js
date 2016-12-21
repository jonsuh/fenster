var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var autoprefixer = require('autoprefixer');
var concat       = require('gulp-concat');
var csscomb      = require('postcss-csscomb');
var cssnano      = require('cssnano');
var eslint       = require('gulp-eslint');
var imagemin     = require('gulp-imagemin');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var postcss      = require('gulp-postcss');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

gulp.task('css', function() {
  var sassOptions = {
    includePaths: [
      // 'node_modules/',
    ]
  };

  var postCSSOptions = require('./config.postcss.json');
  var postCSSProcessors = [
    autoprefixer(postCSSOptions.autoprefixer),
  ];

  return gulp.src('assets/_sass/**/*.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(postcss(postCSSProcessors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('dist:css', function() {
  var postCSSOptions = require('./config.postcss.dist.json');
  var postCSSProcessors = [
    csscomb(postCSSOptions['postcss-csscomb']),
    cssnano()
  ];

  return gulp.src('assets/css/**/*.css')
    .pipe(postcss(postCSSProcessors))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('eslint', function() {
  return gulp.src('assets/_js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js', ['eslint'], function() {
  return gulp.src([
      'assets/_js/app.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('dist:js', function() {
  return gulp.src([
      'assets/js/**/*.js',
    ])
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('imagemin', function() {
  return gulp.src([
      'assets/images/*'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('watch', function() {
  var browserSyncConfig = require('./bs-config.js');

  browserSync.init(browserSyncConfig);

  gulp.watch('assets/_sass/**/*.scss', ['css']);
  gulp.watch('assets/_js/**/*.js', ['js']);
});

gulp.task('build', ['css', 'js']);

gulp.task('dist', function() {
  gulp.start('dist:css');
  gulp.start('dist:js');
  gulp.start('imagemin');
});

gulp.task('default', ['build', 'watch']);
