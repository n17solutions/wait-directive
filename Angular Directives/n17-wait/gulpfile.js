//var stylus = require('gulp-stylus');
var gulp 	= require('gulp'),
	stylus 	= require('gulp-stylus');

gulp.task('stylus', function() {
	gulp.src('./stylus/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./dist/'));
});