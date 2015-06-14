var gulp 		= require('gulp'),
	stylus 		= require('gulp-stylus'),
	minifyHtml 	= require('gulp-minify-html'),
	html2js		= require('gulp-ng-html2js'),
	concat		= require('gulp-concat'),
	uglify		= require('gulp-uglify'),
	webpack 	= require('gulp-webpack-build'),
	minifyCss	= require('gulp-minify-css'),
	rename		= require('gulp-rename'),
	nib 		= require('nib'),
	del 		= require('del'),
	assign 		= require('lodash/object/extend'),
	runSequence	= require('run-sequence'),
	options		= {
		src: {
			stylus: './src/stylus',
			templates: './src/templates'
		},
		dist: {
			root: './dist',
			withoutFrameworks: './dist/no-frameworks',
			withFrameworks: './dist/inc-frameworks'
		},
		webpack: {
			options: {
				watchDelay: 200
			},
			config: {
				useMemoryFs: true,
				progress: true
			},
			format: {
				version: false,
				timings: true
			},
			failAfter: {
				errors: true,
				warnings: true
			},
			files: {
				production: './webpack.config-production.js',
				productionMin: './webpack.config-production.min.js',
				development: './webpack.config-development.js',
				developmentMin: './webpack.config-development.min.js'
			}
		},
		minifyCss: {
			compatibility: 'ie8'
		}
	};

function buildWebpackOptions(mode) {
	switch (mode) {
		case "development":
			assign(options.webpack.options, {
				debug: true,
				devtool: '#source-map'
			});
			break;
	}
}

gulp.task('clean', function() {
	return del(options.dist.root);
});

gulp.task('stylus', function() {
	return gulp.src(options.src.stylus + '/**/*.styl')
		.pipe(stylus({
			use: [
				nib()
			]
		}))
		.pipe(gulp.dest(options.dist.root));
});

gulp.task('minify:css', ['stylus'], function() {
	return gulp.src(options.dist.root + '/*.css')
		.pipe(minifyCss(options.minifyCss))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(options.dist.root));
});

gulp.task('html2js', function() {
	return gulp.src(options.src.templates + '/*.tpl.html')
		.pipe(minifyHtml({
			empty: 	true,
			spare: 	true,
			quotes: true
		}))
		.pipe(html2js({
			moduleName: 'n17-wait',
			prefix: 	'/templates/' 
		}))
		.pipe(concat('templates.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(options.src.templates));
});

gulp.task('build-development', ['html2js'], function() {
	buildWebpackOptions('development');

	return gulp.src(options.webpack.files.development)
		.pipe(webpack.init(options.webpack.config))
		.pipe(webpack.props(options.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format(options.webpack.format))
		.pipe(webpack.failAfter(options.webpack.failAfter))
		.pipe(gulp.dest(options.dist.withFrameworks));
});

gulp.task('build-production', [], function() {
	buildWebpackOptions('production');

	gulp.src(options.webpack.files.productionMin)
		.pipe(webpack.init(options.webpack.config))
		.pipe(webpack.props(options.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format(options.webpack.format))
		.pipe(webpack.failAfter(options.webpack.failAfter))
		.pipe(gulp.dest(options.dist.withoutFrameworks));

	return gulp.src(options.webpack.files.production)
		.pipe(webpack.init(options.webpack.config))
		.pipe(webpack.props(options.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format(options.webpack.format))
		.pipe(webpack.failAfter(options.webpack.failAfter))
		.pipe(gulp.dest(options.dist.withoutFrameworks));
});

gulp.task('build-production-inc-frameworks', [], function() {
	buildWebpackOptions('production');

	gulp.src(options.webpack.files.developmentMin)
		.pipe(webpack.init(options.webpack.config))
		.pipe(webpack.props(options.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format(options.webpack.format))
		.pipe(webpack.failAfter(options.webpack.failAfter))
		.pipe(gulp.dest(options.dist.withFrameworks));

	return gulp.src(options.webpack.files.development)
		.pipe(webpack.init(options.webpack.config))
		.pipe(webpack.props(options.webpack.options))
		.pipe(webpack.run())
		.pipe(webpack.format(options.webpack.format))
		.pipe(webpack.failAfter(options.webpack.failAfter))
		.pipe(gulp.dest(options.dist.withFrameworks));
});

gulp.task('production', function(done) {
	runSequence('clean', 'minify:css', 'build-production', 'build-production-inc-frameworks', done);
});