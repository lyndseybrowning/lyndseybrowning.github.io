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
var gutil = require('gulp-util');
var cp = require('child_process');

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var drafts = false;
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
    var buildTasks = ['build'];

    if(drafts) {
      buildTasks.push('--drafts');
      gutil.log('Running in DRAFTS mode');
    }

    browserSync.notify(messages.jekyllBuild);
    return cp.spawn(jekyll, buildTasks, {stdio: 'inherit'})
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

// styles
gulp.task('style', ['jekyll-build'], function() {
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
gulp.task('lint', ['jekyll-build'], function() {
  return gulp
    .src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
});

// script
gulp.task('script', ['jekyll-build'], function() {
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
   gulp.watch(['**/*.html', '!node_modules/**/*.html', '!_site/**/*.html'], ['jekyll-rebuild']);
});

// default
gulp.task('default', ['browser-sync', 'watch']);
