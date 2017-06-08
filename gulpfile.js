'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var rimraf = require('rimraf');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var filter = require('gulp-filter');
var notify = require('gulp-notify');
var rename = require("gulp-rename");
var rigger = require('gulp-rigger');
var sass = require('gulp-sass');
var sftp = require('gulp-sftp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var mainBowerFiles = require('main-bower-files');

var path = {
  scss:['./dist/scss/*.scss'],
  js:['./dist/js/*.js'],
  html:['.dist/form.html']
};

gulp.task('clean', function(done) {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
    done();
});

gulp.task('cleanBW', function(done) {
    return gulp.src('./libs', {read: false})
        .pipe(clean());
    done();
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
                    '../lib/font-awesome/fonts/fontawesome-webfont.*'])
            .pipe(gulp.dest('./dist/fonts/'));
});

//сборка html
gulp.task('html', function (done) {
    gulp.src('./*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./dist/'))
  done();
});

//сборка css
gulp.task('scss', function (done) {
 return gulp.src('./scss/*.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('./dist/css'));
   done();
});

//сборка js
gulp.task('js', function (done) {
    gulp.src('./js/*.js')
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
  done();
});

//сборка проекта
gulp.task('build', gulp.parallel('html','scss','fonts','js',function(done){
    done();
}));

gulp.task('build:watch',function(){
    gulp.watch(path.html,gulp.series('html'));
    gulp.watch(path.scss,gulp.series('scss'));
    gulp.watch(path.js,gulp.series('js'));
});
