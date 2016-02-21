var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var mustache = require("gulp-mustache");
var uglify = require('gulp-uglify');
var handlebars = require('gulp-handlebars');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');

function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString());
  this.emit('end');
}
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
    gulp.src("src/*.html")
        .pipe(mustache({},{},{}))
        .pipe(gulp.dest("dist/"));
});
//Gulp handlebars
gulp.task('handlebars', function() {
      gulp.src('src/templates/*.hbs')
        .pipe(handlebars({
          handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
          namespace: 'App.templates',
          noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('dist/js/'));
});
gulp.task('compress', function() {
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function () {
    gulp.src('src/img/**/*').pipe(gulp.dest('dist/img'));
    gulp.src('lib/**/*').pipe(gulp.dest('dist/lib'));
    gulp.src('libc/**/*').pipe(gulp.dest('dist/libc'));
});


gulp.task('build', ['sass', 'mustache','handlebars','compress','copy'] )
gulp.task('default', ['build','watch']);

gulp.task('watch', ['sass', 'mustache', 'handlebars','compress','copy'], function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', ['mustache']);
    gulp.watch('./src/**/*.hbs', ['handlebars']);
    gulp.watch('./src/js/**/*.js', ['compress']);
    gulp.watch('./src/img/**/*', ['copy']);
    gulp.watch('./lib/**/*', ['copy']);
    gulp.watch('./libc/**/*', ['copy']);
});
