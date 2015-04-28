var gulp 	= require('gulp'),
	stylus 	= require('gulp-stylus')
	uglify	= require('gulp-uglify')
	html2js	= require('gulp-ng-html2js');

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

gulp.task('html2js', function() {
	gulp.src('./templates/*.tpl.html')
		.pipe(html2js({
			moduleName: 'n17-wait',
			prefix: '/templates/'
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('production', ['stylus-compress']);