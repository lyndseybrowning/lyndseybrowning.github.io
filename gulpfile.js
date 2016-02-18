var gulp = require('gulp');

// plugins
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var eslint = require('gulp-eslint');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var local = 'local.lyndseyb.net';
var reload = browserSync.reload;
var paths = {
  scss: 'css/scss/',
  js: 'js/'
};

// browser sync
gulp.task('browser-sync',  function() {
  browserSync.init({
      server: {
          baseDir: './'
      }
  });
});

gulp.task('bs-reload', reload);

// styles
gulp.task('style', function() {
  return gulp
    .src(paths.scss + 'style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(minify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream())
});

// lint
gulp.task('lint', function() {
  return gulp
    .src(paths.js + '*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
});

// script
gulp.task('script', function() {
  return gulp
    .src(paths.js + '*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream())
});

// watch
gulp.task('watch', function() {
   gulp.watch(paths.scss + 'style.scss', ['style']);
   gulp.watch(paths.js + '*.js', ['lint', 'script']);
   gulp.watch('*.html').on('change', reload);
});

// default
gulp.task('default', ['style', 'lint', 'script', 'watch', 'browser-sync']);
