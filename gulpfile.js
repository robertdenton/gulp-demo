var gulp = require('gulp'), 
htmlclean = require('gulp-htmlclean'),
uglify = require('gulp-uglify'),
mustache = require('gulp-mustache'),
jshint = require('gulp-jshint');

var folders = {
	src: 'src/',
	build: 'build/'
};

gulp.task('partials', function(){
	return gulp.src(folders.src + 'html/**/*')
	.pipe(mustache({
		title: 'This is the new title'
	}))
	.pipe(gulp.dest(folders.build));
});

gulp.task('html', ['partials'], function(){
	return gulp.src(folders.src + 'html/**/*')
	.pipe(htmlclean())
	.pipe(gulp.dest(folders.build));
});

gulp.task('jslint', function(){
	return gulp.src(folders.src + 'js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('uglify', ['jslint'], function(){
	return gulp.src(folders.src + 'js/**/*')
	.pipe(uglify())
	.pipe(gulp.dest(folders.build + 'js/'));
});

gulp.task('dev', ['jslint']);

gulp.task('default', ['html','uglify']);
