var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: { //配置入口文件，有几个写几个
        app: './src/app.js',
    },
    output: {
        path: 'dist', //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '', //模板、样式、脚本、图片等资源对应的server上的路径
        filename: '[name].[chunkhash:8].js',            //每个页面对应的主js的生成配置
        chunkFilename: '[id].chunk.js'   //chunk生成的配置
    },
    module: {
        loaders: [
            {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html?attrs=img:src img:data-src"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                loader: 'url?name=images/[name].[ext]&limit=8192'
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
        new ExtractTextPlugin('css/[name].[chunkhash:8].css'),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './dist/index.html'),
            template: './src/index.html',
            inject:'body',
            // hash: true
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