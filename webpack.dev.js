const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const { version } = require('./package.json');

const { config, fmpFirst, fmpOpts } = require("./webpack.config");

config.plugins = [
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
        new GenerateSW({
            swDest: "sw.js",
            runtimeCaching: [{
                handler: "CacheFirst",
                urlPattern: new RegExp("https://*.cdn.dyntomas.com/*"),
                options: {
                    cacheName: "cdn-cache"
                }
            }, {
                handler: "CacheFirst",
                urlPattern: new RegExp("/*"),
                options: {
                    cacheName: `app-${version}`
                }
            }],
            exclude: ["main.js", "main.css"],
            skipWaiting: true
        }),
        fmpFirst
    ];

module.exports = config;
