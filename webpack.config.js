const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
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
}

const fmpFirst = new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: path.resolve(__dirname, "src/static"),
                            destination: path.resolve(__dirname, "public")
                        },
                        {
                            source: `${path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/fonts")}/fa-solid-900.*`,
                            destination: path.resolve(__dirname, "public/assets/webfonts")
                        }
                    ]
                }
}
        });

const fmpOpts = {}

module.exports = { config, fmpFirst, fmpOpts }