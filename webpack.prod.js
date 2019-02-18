const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
    mode: 'production',

    module: {
        rules: [{
            test: /\.(sass|scss)$/,
            use: [                
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader', options: {
                        importLoaders: 1
                    }
                },
                {
                    loader: 'postcss-loader', options: {  
                        ident: 'postcss',                      
                        plugins: [
                            postcssPresetEnv({
                                stage: 3,
                                browsers: '> 1%',                                
                                autoprefixer: { grid: true }
                            }),
                            require('rucksack-css'),
                            require('cssnano'),
                            require('css-mqpacker')
                        ]
                    }
                },               
                'sass-loader'
            ]
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
              }
            ]
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../fonts/'
                }
              }
            ]
        }]
    },

    // Learn https://web.dev/fast/use-imagemin-to-compress-images
    plugins: [
        new CopyWebpackPlugin([{
          from: 'img/**/**',
          to: path.resolve(__dirname, 'dist')
        }]),
        new ImageminPlugin({
          pngquant: ({quality: '95'}),
          plugins: [imageminMozjpeg({quality: '90'})]
        })
    ]
});
