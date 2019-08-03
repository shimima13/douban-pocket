// require("babel-polyfill");
var path = require('path');
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: ['./src/js/index.jsx'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public')
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", '@babel/preset-react']
                }
            }
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {},
                },
            ],
        },
        {
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: 'fonts/[name].[ext]',
            },
        }],
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        // 加入 html 模板任务
        new HtmlWebpackPlugin({
            // 模板文件
            template: 'src/html/index.html',
            // 打包后文件名称，会自动放到 output 指定的 dist 目录
            filename: 'index.html',
            favicon: 'src/img/favicon.ico'
        }),
        new CopyPlugin([
            { from: 'src/fonts', to: 'fonts' },
            { from: 'src/html/redirect.html', to: '' }
        ]),
        // new BundleAnalyzerPlugin(),
    ],
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /./, to: '/redirect.html' }
            ]
        }
    },
    // optimization: {
    //     minimize: false
    // },
    mode: 'development'
}
