'use strict';
const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		app: path.resolve('./client/index.js'),
		admin: path.resolve('./client/admin/index.js'),
	},
	output: {
		path: path.resolve('./public/js'),
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
		]}
};
