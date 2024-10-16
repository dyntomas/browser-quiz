const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        asyncChunks: true
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
    }
};

const fmp = new FileManagerPlugin({
    events: {
        onEnd: {
            delete: [
                path.resolve(__dirname, "public/assets/css/main.css"),
                path.resolve(__dirname, "public/assets/js/main.js")
            ],
            copy: [
                {
                    source: path.resolve(__dirname, "src/static"),
                    destination: path.resolve(__dirname, "public")
                },
                {
                    source: `${path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/webfonts")}/fa-solid-900.*`,
                    destination: path.resolve(__dirname, "public/assets/webfonts")
                }
            ],
            move: [
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
});

const pcp = new PurgeCSSPlugin({
    paths: glob.sync(`${path.resolve(__dirname, 'public')}/*`, { nodir: true }),
});

const mcep = new MiniCssExtractPlugin({
    filename: "[name].css"
});

module.exports = { config, fmp, pcp, mcep };