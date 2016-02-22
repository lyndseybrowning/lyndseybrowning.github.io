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
var cp = require('child_process');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var local = 'local.lyndseyb.net';
var reload = browserSync.reload;
var paths = {
  scss: 'css/scss/**/*.scss',
  js: 'js/main.js'
};
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// build Jekyll site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// browser sync
gulp.task('browser-sync', ['jekyll-build'],  function() {
  browserSync.init({
      server: {
          baseDir: '_site/'
      }
  });
});

//gulp.task('bs-reload', reload);

// styles
gulp.task('style', function() {
  return gulp
    .src(paths.scss)
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
    .src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
});

// script
gulp.task('script', function() {
  return gulp
    .src(paths.js)
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream())
});

// watch
gulp.task('watch', function() {
   gulp.watch(paths.scss, ['style']);
   gulp.watch(paths.js, ['lint', 'script']);
   //gulp.watch('*.html').on('change', reload);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

// default
gulp.task('default', ['browser-sync', 'watch']);
