'use strict';

var webpack 			= require('webpack'),
	ngAnnotatePlugin 	= require('ng-annotate-webpack-plugin');

module.exports = {
	entry: './src/js/app.js',
	output: {
		filename: "n17-wait.js",
		library: "n17wait",
		libraryTarget: "umd"
	},
	plugins: [
		new ngAnnotatePlugin({
			add: true
		})
	]
};