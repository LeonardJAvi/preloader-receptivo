var gulp = require('gulp');
var sass = require('gulp-sass');
var haml = require('gulp-ruby-haml');
var browserSync = require('browser-sync').create();
var gulpIgnore = require('gulp-ignore');

/* ---- Project - Config paths ----*/

//directory root  src & dist
var dir_src = 'src';
var dir_dist = 'docs';


//set of paths - sources
var src_paths = {
  haml: [`${dir_src}/*.haml`, `${dir_src}/partials/*.haml`],
  css: `${dir_src}/css/**/*`,
  js: `${dir_src}/js/**/*`,
  sass: `${dir_src}/scss/**/*.scss`,
  fonts: `${dir_src}/fonts/**/*`,
  images: `${dir_src}/img/**/*`,
  scripts: `${dir_src}/scripts/**/*`
}

//set of paths - distribution
var dist_paths = {
  css: `${dir_dist}/assets/css`,
  js: `${dir_dist}/assets/js`,
  img: `${dir_dist}/assets/img`,
  fonts: `${dir_dist}/assets/fonts`
}

//excludes the partials generated by haml
var partial_condition = '_*.html';

/* ---- Project - Task ----*/

gulp.task('browser', function () {
  browserSync.init({
    server: {
      baseDir: dir_dist
    }
  })
});

gulp.task('haml', function () {
  return gulp.src(src_paths.haml)
    .pipe(haml({
      doubleQuote: true
    }))
    .pipe(gulpIgnore.exclude(partial_condition))
    .pipe(gulp.dest(dir_dist))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('css', function () {
  return gulp.src(src_paths.css)
    .pipe(gulp.dest(dist_paths.css))
});

gulp.task('js', function () {
  return gulp.src(src_paths.js)
    .pipe(gulp.dest(dist_paths.js))
});

gulp.task('sass', function () {
  return gulp.src(src_paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dist_paths.css));
});

gulp.task('fonts', function () {
  return gulp.src(src_paths.fonts)
    .pipe(gulp.dest(dist_paths.fonts))
});

gulp.task('images', function () {
  return gulp.src(src_paths.images)
    .pipe(gulp.dest(dist_paths.img))
});

gulp.task('scripts', function () {
  return gulp.src(src_paths.scripts)
    .pipe(gulp.dest(dist_paths.js))
});

gulp.task('watch', ['haml', 'css', 'js', 'sass', 'fonts', 'images', 'scripts'], function () {
  gulp.watch(src_paths.haml, ['haml']).on('change', browserSync.reload);
  gulp.watch(src_paths.sass, ['sass']).on('change', browserSync.reload);
  gulp.watch(src_paths.scripts, ['scripts']).on('change', browserSync.reload);
  gulp.watch(src_paths.images, ['images']).on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'browser']);