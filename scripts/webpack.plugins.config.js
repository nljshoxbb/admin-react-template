const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const Webpackbar = require('webpackbar');
const ErrorOverlayWebpackPlugin = require('error-overlay-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const moment = require('moment');

const { isPro, JoinCwd } = require('./utils');
const pkg = require('../package.json');

module.exports = {
  plugins: [
    new Webpackbar({ name: 'RenderProcess Service' }),
    new ErrorOverlayWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: JoinCwd('public/index.html'),
      filename: 'index.html',
      title: 'React Servive',
      hash: isPro(),
      minify: {
        removeComments: isPro(),
        collapseWhitespace: isPro(),
        removeRedundantAttributes: isPro(),
        useShortDoctype: isPro(),
        removeEmptyAttributes: isPro(),
        removeStyleLinkTypeAttributes: isPro(),
        keepClosingSlash: isPro(),
        minifyJS: isPro(),
        minifyCSS: isPro(),
        minifyURLs: isPro()
      },
      chunksSortMode: 'auto'
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
      BUILD_NUMBER: JSON.stringify(process.env.BUILD_NUMBER || ''),
      RELEASE_DATE: JSON.stringify(moment().format('YYYY-MM-DD HH:mm:ss'))
    }),
    isPro()
      ? new MiniCssExtractPlugin({
          filename: 'assets/css/[name].[hash:8].css',
          chunkFilename: assetsPath('assets/css/[name].[id].[contenthash].css'),
          ignoreOrder: true
        })
      : null,
    isPro()
      ? new OptimizeCSSAssetsPlugin({
          /** 使用 cssnano 压缩 */
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            /** 删除注释 */
            discardComments: { removeAll: true }
          },
          /** 是否将插件信息打印到控制台 */
          canPrint: false
        })
      : null,
    // isPro() ? null : new webpack.NamedModulesPlugin(),
    isPro() ? null : new webpack.HotModuleReplacementPlugin(),
    isPro() ? null : new ReactRefreshWebpackPlugin({ forceEnable: true })
  ].filter(Boolean)
};
