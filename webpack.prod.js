const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");;
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

const { config, fmpFirst, fmpOpts } = require("./webpack.config");

config.plugins = [
        new BundleAnalyzerPlugin(),
new FileManagerPlugin({
            events: {
                onEnd: {
                    move: [
{
                            source: path.resolve(__dirname, "public/main.js"),
                            destination: path.resolve(__dirname, "public/assets/js/main.js")
                        },
{
                            source: path.resolve(__dirname, "public/main.css"),
                            destination: path.resolve(__dirname, "public/assets/css/main.css")
                        }
]}}}),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${path.resolve(__dirname, 'public')}/*`, { nodir: true }),
        }),
        fmpFirst
    ];
    config.optimization = {
        usedExports: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
}

module.exports = config;
