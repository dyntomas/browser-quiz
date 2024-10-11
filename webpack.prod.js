const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

const { config, fmp, mcep, pcp } = require("./webpack.config");

config.plugins = [
    new BundleAnalyzerPlugin(),
    pcp,
    fmp,
    mcep
];
config.optimization = {
    usedExports: true,
    minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin()
    ]
}

module.exports = config;
