const config = require('../config');
const { JoinCwd, isPro } = require('./utils');
const WebpackPluginsConfig = require('./webpack.plugins.config');
const WebpackModuleConfig = require('./webpack.module.config');
const speedMeasurePlugin = require('speed-measure-webpack-plugin');

/** 开发环境下 smp 于 热更不兼容 */
const smp = config.smp && isPro() ? new speedMeasurePlugin().wrap : (c) => c;
module.exports = smp({
  mode: process.env.NODE_ENV,
  entry: {
    app: JoinCwd(config.entry)
  },
  output: {
    path: JoinCwd(config.output),
    filename: isPro() ? 'assets/js/[name].[hash:8].js' : 'assets/js/[name].js'
  },
  externals: [],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: config.alias
  },
  plugins: WebpackPluginsConfig.plugins,
  module: WebpackModuleConfig.module
});
