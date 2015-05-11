var gulp 		= require('gulp'),
	stylus 		= require('gulp-stylus'),
	nib 		= require('nib'),
	uglify		= require('gulp-uglify'),
	html2js		= require('gulp-ng-html2js'),
	minifyHtml	= require('gulp-minify-html'),
	concat		= require('gulp-concat'),
	browserify	= require('browserify'),
	source 		= require('vinyl-source-stream'),
	del			= require('del'),
	runSequence = require('run-sequence');

gulp.task('clean', ['cleanOutput'], function() {
	return del([
		'./dist',
		'./templates/*.js']);
});

gulp.task('cleanOutput', function() {
	return del(['./output']);
});

gulp.task('stylus', function() {
	return gulp.src('./stylus/**/*.styl')
		.pipe(stylus({
			use: [
				nib()
			]
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('stylus-compress', function() {
	return gulp.src('./stylus/**/*.styl')
		.pipe(stylus({ compress: true }))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('html2js', function() {
	return gulp.src('./templates/*.tpl.html')
		.pipe(minifyHtml({
			empty: 	true,
			spare: 	true,
			quotes: true
		}))
		.pipe(html2js({
			moduleName: 	'n17-wait',
			prefix: 		'/templates/'
		}))
		.pipe(concat('templates.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./templates'));
});

gulp.task('browserify', function() {
	return browserify('./js/app.js', { debug: true })
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./output'));
});

gulp.task('package', function() {
	return gulp.src(['./output/*.js', './templates/*.js'])
		.pipe(concat('n17-wait.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'))
});

gulp.task('production', function(cb) {
	runSequence('clean', 'stylus-compress', 'html2js', 'browserify', 'package', 'cleanOutput', cb);
});