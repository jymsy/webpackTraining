var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: { //配置入口文件，有几个写几个
        lc: './js/src/modules/learning_center/index.js',
        ls: './js/src/modules/learning_system/index.js',
    },
    output: {
        path: 'js/dist', //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/static/js/dist/', //模板、样式、脚本、图片等资源对应的server上的路径
        filename: '[name].js',            //每个页面对应的主js的生成配置
        chunkFilename: '[id].chunk.js'   //chunk生成的配置
    },
    module: {
        loaders: [
            {
                test: /\.tpl$/,
                loader: 'underscore-template-loader',
                query: {
                    engine: 'lodash',
                    attributes: []
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                loader: 'url?name=images/[name].[ext]&limit=8192'
                // loader: "file-loader?name=[name].[ext]&publicPath=assets/foo/&outputPath=app/images/"
            }
        ]
    },
    eslint: {
        failOnWarning: true,
        failOnError: true,
        configFile: './.eslintrc'
    },
    externals: {
        jquery: 'jQuery',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['lc','ls','tc','review', 'purchased', 'p_detail','oraltest'], //提取哪些模块共有的部分
            minChunks: 4 // 提取至少n个模块共有的部分
        }),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../application/modules/learning_system/views/main.php'),
            template: 'views/main.php',
            chunks: ['header', 'common', 'ls'],
            inject:'body',
            hash: true
        }),
        // new uglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     }
        // })
    ]
};