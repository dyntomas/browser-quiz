const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");;
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");


const { version } = require('./package.json');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
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
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${path.resolve(__dirname, 'public')}/*`, { nodir: true }),
        }),
        /* new GenerateSW({
            swDest: "sw.js",
            runtimeCaching: [{
                handler: "NetworkFirst",
                urlPattern: new RegExp("https\:\/\/demo|\.cdn\.dymtomas.com\/*"),
                options: {
                    cacheName: "cdn-cache"
                }
            }, {
                handler: "NetworkFirst",
                urlPattern: new RegExp("/*"),
                options: {
                    cacheName: `app-${version}`
                }
            }],
            exclude: ["main.js", "main.css"],
            skipWaiting: true
        }), */
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: path.resolve(__dirname, "src/static"),
                            destination: path.resolve(__dirname, "public")
                        },
                        {
                            source: `${path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/webfonts")}/fa-solid-900.*`,
                            destination: path.resolve(__dirname, "public/assets/webfonts")
                        },
                        {
                            source: path.resolve(__dirname, "public/main.css"),
                            destination: path.resolve(__dirname, "public/assets/css/main.css")
                        },
                        {
                            source: path.resolve(__dirname, "public/main.js"),
                            destination: path.resolve(__dirname, "public/assets/js/main.js")
                        }
                    ]
                }
            }
        }),
new FileManagerPlugin({
            events: {
                 onStart: {
                    delete: [
                        path.resolve(__dirname, "public/assets/js/main.js"),
                        path.resolve(__dirname, "public/assets/css/main.css")
                    ]
                },
                onEnd: {
                    delete: [
                        path.resolve(__dirname, "public/main.js"),
                        path.resolve(__dirname, "public/main.css")
                    ]
                }
            }
        })
    ],
    optimization: {
        usedExports: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
};

module.exports = config;
