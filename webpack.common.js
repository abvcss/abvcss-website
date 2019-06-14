const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: [
        './abvcss/style.sass',
        './src/index.js'
    ],
        
    plugins: [        
        new HtmlWebpackPlugin({
            title: 'abvCSS - CSS-methgodology & framework',            
            template: 'index-template.html',
            filename: '../index-intermediate.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            hash: false            
        }),
        new ScriptExtHtmlWebpackPlugin({
            preload: /\.js$/,
            defaultAttribute: 'async'
        }),
        new WebpackPwaManifest({
            name: 'abvCSS Methodology and Framework',
            short_name: 'abvCSS Methodology and Framework',
            description: 'abvCSS is a CSS-methodology and framework for creating modern, dynamic and supported web interfaces',
            background_color: '#ffffff',
            crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
            inject: false,
            fingerprints: false,
            icons: [
              {
                src: path.resolve('img/abvCSS-icon.png'),
                sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
              }
            ]
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};