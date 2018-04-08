const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

export default {
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.resolve(__dirname, 'src/index'),
    ],
    devtool: 'inline-source-map',
    target: 'web',
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                loader: 'file-loader',
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /(\.css)$/,
                loaders: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
