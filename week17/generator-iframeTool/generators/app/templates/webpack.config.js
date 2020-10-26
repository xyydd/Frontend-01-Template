const webpack = require('webpack'); //to access built-in plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            { test: /\.js$/, use: 'babel-loader', options: { preset: ['@babel/preset-env'] } }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/*.html', to: '[name].[ext]' }
            ]
        }),
        new VueLoaderPlugin()
    ]
};