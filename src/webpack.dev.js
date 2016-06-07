var fs = require('fs');
var webpack = require('webpack');
var path = require('path');
var happypack = require('happypack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

function getLoaderExclude(path) {
    var isNpmModule = !!path.match(/node_modules/);
    return isNpmModule;
}

module.exports = {
    cache: true,
    entry: {
        demo: './demo/index'
    },
    output: {
        path: path.join(process.cwd(), './dist'),
        filename: "[name].js",
        sourceMapFilename: "[name].js.map"
    },
    module: {
        loaders: [
            {

                test: /\.js(x)*$/,
                // npm modules 都不需要经过babel解析
                exclude: getLoaderExclude,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015-ie', 'stage-1'].map(function(item) {
                        return require.resolve('babel-preset-' + item);
                    }),
                    plugins: [
                        'add-module-exports'
                    ].map(function(item) {
                        return require.resolve('babel-plugin-' + item);
                    }),
                    cacheDirectory: true
                },
                happy: {id: 'js'}
            }
        ]
    },
    resolveLoader: {
        root: [
            path.join(__dirname, '../node_modules')
        ]
    },
    externals: {
        react: 'var React', // 相当于把全局的React作为模块的返回 module.exports = React;
        'react-dom': 'var ReactDOM'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.SourceMapDevToolPlugin({
            columns: false
        }),
        // new happypack({
        //     id: 'js'
        // }),
        // new ProgressBarPlugin()
    ]
};