var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});

var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.scss$/,
                use: cssConfig,
            },
            // {
            //     test: /\.(png|jpg)$/,
            //     use: 'file-loader'
            // }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        hot: true,
        port: 2424
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project Webpack',
            filename: 'index.html',
            excludeChunks: ['contact'],
            template: './src/index.pug'
        }),
        new HtmlWebpackPlugin({
            title: 'Project Webpack',
            filename: 'contact.html',
            chunks: ['contact'],
            template: './src/contact.pug'
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
