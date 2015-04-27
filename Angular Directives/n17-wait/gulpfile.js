var gulp 	= require('gulp'),
	stylus 	= require('gulp-stylus')
	uglify	= require('gulp-uglify');

gulp.task('stylus', function() {
	gulp.src('./stylus/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('stylus-compress', function() {
	gulp.src('./stylus/**/*.styl')
		.pipe(stylus({ compress: true }))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('production', ['stylus-compress']);