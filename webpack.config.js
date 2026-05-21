const path = require('path');
const { globSync } = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "production";
const config = {
    mode,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'assets/[name].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    }
                ]
            }
        ]
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: path.resolve(__dirname, "src/static"),
                            destination: path.resolve(__dirname, "public")
                        }
                    ]
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].css"
        }),
        new PurgeCSSPlugin({
            paths: globSync(`${path.resolve(__dirname, 'public')}/*`, { nodir: true }),
            safelist: ["icon-info-circled", "icon-left-big", "icon-angle-right"]
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
                    cacheName: `app-${require("./package.json").version}`
                }
            }],
            skipWaiting: true
        })
    ],
    optimization: {
        usedExports: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
}

module.exports = config;