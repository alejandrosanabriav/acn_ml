'use strict';
var webpack = require('webpack');

module.exports = {
	watch: true,
	entry: {
		app: './client/index.js',
		admin: './client/admin/index.js',
	},
	output: {
		path: './public/js',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				loaders: ['css', 'sass']
			}
		]},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('app')
	]
};
