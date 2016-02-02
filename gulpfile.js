var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var cssnano      = require('gulp-cssnano');
var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;
var runSequence  = require('run-sequence');
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

gulp.task('sass', function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };

  var filterOptions = '**/*.css';

  var reloadOptions = {
    stream: true,
  };

  var sassOptions = {
    includePaths: [
      // 'node_modules/bourbon/app/assets/stylesheets',
    ]
  };

  return gulp.src('assets/_sass/**/*.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/css'))
    .pipe(filter(filterOptions))
    .pipe(reload(reloadOptions));
});

gulp.task('cssnano', function() {
  return gulp.src('assets/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('eslint', function() {
  var eslintOptions = {
    extends: 'eslint:recommended',
    envs: [
      'browser'
    ]
  };

  return gulp.src('assets/_js/**/*.js')
    .pipe(eslint(eslintOptions))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('concat', ['eslint'], function() {
  return gulp.src([
      'assets/_js/file1.js',
      'assets/_js/file2.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('uglify', function() {
  return gulp.src([
    'assets/_js/**/*.js',
  ])
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
  gulp.watch('assets/_sass/**/*.scss', ['sass']);
  gulp.watch('assets/_js/**/*.js', ['concat']);
});

gulp.task('browsersync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    // proxy: 'example.com',
    open: false,
    online: false,
    notify: false,
  });
});

gulp.task('build', ['sass', 'concat']);

gulp.task('dist', ['build'], function() {
  gulp.start('cssnano');
  gulp.start('uglify');
});

gulp.task('default', ['build', 'browsersync', 'watch']);
