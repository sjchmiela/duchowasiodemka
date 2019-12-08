const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  if (!config.plugins) {
    config.plugins = [];
  }
  // config.plugins.push(new BundleAnalyzerPlugin())
  return config;
};
