var gulp = require('gulp'), 
connect = require('gulp-connect'),
less = require('gulp-less'),
minifyCSS = require('gulp-csso')
mustache = require('gulp-mustache'),
uglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),
pkg = require('./package.json');

// -------------------------

gulp.task('webserver', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});
 
gulp.task('less', function() {
  return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('html', function(){
  return gulp.src('src/html/index.html')
  .pipe(mustache({
    title: pkg.meta.title,
    description: pkg.meta.description
  }))
  .pipe(gulp.dest('build/'))
  .pipe(connect.reload());
});

gulp.task('js', function(){
  return gulp.src('src/js/*')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js/'));
});

gulp.task('copy', function(){
  return gulp.src('src/assets/*')
  .pipe(gulp.dest('build/assets/'));
});
 
gulp.task('watch', function() {
    gulp.watch('src/less/**/*', ['less']);
    gulp.watch('src/html/**/*', ['html']);
    gulp.watch('src/js/*', ['js']);
    gulp.watch('src/assets/*', ['copy']);
})

// ---------------------

gulp.task('serve', ['less', 'html', 'js', 'copy', 'webserver', 'watch']);
gulp.task('default', ['less','html','js', 'copy']);




 
