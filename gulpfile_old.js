var gulp = require('gulp');
var sass = require('gulp-sass');
var haml = require('gulp-ruby-haml');
var browserSync = require('browser-sync').create();

var directory = 'dist'; //Change name directory root. 
//var directory = 'docs';

gulp.task('browser', function () {
  browserSync.init({
    server: {
      baseDir: directory
    }
  })
});

var source_paths = {
    haml: ['src/*.haml', 'src/partials/*.haml'],  //for development
    //haml:  'src/*.haml',     //for production
     css:  'src/css/**/*',  
      js:  'src/js/**/*', 
    sass:  'src/scss/**/*.scss',  // for customs styles
   fonts:  'src/fonts/**/*',
  images:  'src/img/**/*',
 scripts:  'src/scripts/**/*', 
}

gulp.task('haml', function(){
  return gulp.src(source_paths.haml)
    .pipe(haml({doubleQuote: true})) 
    .pipe(gulp.dest(directory))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('css', function() {
  return gulp.src(source_paths.css)
  .pipe(gulp.dest(directory + '/assets/css'))
});

gulp.task('js', function() {
  return gulp.src(source_paths.js)
  .pipe(gulp.dest(directory + '/assets/js'))
});

gulp.task('sass', function () {
  return gulp.src(source_paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(directory + '/assets/css'));
});

gulp.task('fonts', function() {
  return gulp.src(source_paths.fonts)
  .pipe(gulp.dest(directory + '/assets/fonts'))
});

gulp.task('images', function() {
  return gulp.src(source_paths.images)
  .pipe(gulp.dest(directory + '/assets/img'))
});

gulp.task('scripts', function() {
  return gulp.src(source_paths.scripts)
  .pipe(gulp.dest(directory + '/assets/js'))
});

gulp.task('watch', ['haml','css','js','sass','fonts','images','scripts'], function() {
    gulp.watch(source_paths.haml, ['haml']).on('change', browserSync.reload);
    gulp.watch(source_paths.sass, ['sass']).on('change', browserSync.reload);
    gulp.watch(source_paths.scripts, ['scripts']).on('change', browserSync.reload);
    gulp.watch(source_paths.images, ['images']).on('change', browserSync.reload);
});

gulp.task('default', ['watch','browser']);