/**
 * Created by yangmutong on 2016/10/15.
 */
var webpack = require('webpack');
var path = require('path');
var libraryName = 'lib';
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = webpack.env.WEBPACK_ENV;
var plugins = [], outputFile;

if(env === 'build'){
    plugins.push(new UglifyJsPlugin({
        minimize: true
    }));
    outputFile = libraryName + '.min.js';
}else{
    outputFile = libraryName + '.js';
}


var config = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js|\.es|\.ts)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },{
                test: /(\.jsx|\.js|\.es|\.ts)$/,
                loader: "eslint-loader",
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    resolve: {
        root: path.resolve('.src'),
        extensions: ['', '.js']
    },
    plugins: plugins
};

module.exports = config;