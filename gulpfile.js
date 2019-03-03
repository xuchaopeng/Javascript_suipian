var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  livereload = require('gulp-livereload'),
  cache = require('gulp-cache'),
  htmlmin = require('gulp-htmlmin'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel');

var srcPath = 'TEST/src';
var distPath = 'TEST/assets';

gulp.task('Js', function() {
  gulp
    .src([srcPath + '/**/*.js'])
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(distPath));
});

gulp.task('css', function() {
  gulp
    .src([srcPath + '/**/*.css'])
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(distPath));
});

gulp.task('listen', function() {
  livereload.listen();
  gulp.watch(srcPath + '/**/*.css', ['css']);
  gulp.watch(srcPath + '/**/*.js', ['Js']);
});

gulp.task('dev', ['Js', 'css', 'listen']);
