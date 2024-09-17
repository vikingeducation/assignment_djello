var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [{
                test: /\.(css)$/,
                use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
                {loader: 'postcss-loader', 
                options: { plugins: [require('autoprefixer')]}
            }]
            },
            {
                test: /\.(jpg|png|svg|woff|ttf)$/,
                use: 'file-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    {loader: 'style-loader'},
                {loader: 'css-loader'},
                {loader: 'sass-loader'}]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: [
                        'transform-object-rest-spread', 
                        ["import", {"libraryName": 'antd', 'stye': 'css'}]]
                    }
                }
            }
        ],
    },
};