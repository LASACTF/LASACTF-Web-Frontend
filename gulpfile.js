var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var mustache = require("gulp-mustache");
var uglify = require('gulp-uglify');

// Gulp Sass Task
gulp.task('sass', function () {
 gulp.src('src/sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist/css'));
});

// Gulp Mustache Task
gulp.task('mustache', function() {
    gulp.src("templates/*.mustache")
        .pipe(mustache({},{},{}))
        .pipe(gulp.dest("dist/"));
});
gulp.task('compress', function() {
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function () {
    gulp.src('assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('default', ['sass', 'mustache','compress']);

gulp.task('watch', ['sass', 'mustache','compress'], function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./templates/**/*.mustache', ['mustache']);
});
