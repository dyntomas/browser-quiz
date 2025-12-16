const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const mode = process.env.NODE_ENV || "production";
const mcep = new MiniCssExtractPlugin({
    filename: "[name].css"
});
const pcp = new PurgeCSSPlugin({
    paths: glob.sync(`${path.resolve(__dirname, 'public')}/*`, { nodir: true }),
});

const config = {
    mode,
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
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: {
                    delete: [
                        path.resolve(__dirname, "public/assets/js"),
                        path.resolve(__dirname, "public/assets/css")
                    ],
                    copy: [
                        {
                            source: path.resolve(__dirname, "src/static"),
                            destination: path.resolve(__dirname, "public")
                        },
                        // {
                        //     source: `${path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/fonts")}/fa-brands-400.*`,
                        //     destination: path.resolve(__dirname, "public/assets/webfonts")
                        // },
                        // {
                        //     source: `${path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/fonts")}/fa-solid-900.*`,
                        //     destination: path.resolve(__dirname, "public/assets/webfonts")
                        // }
                    ],
                    move: [
                        {
                            source: path.resolve(__dirname, "public/main.js"),
                            destination: path.resolve(__dirname, "public/assets/js/main.js")
                        },
                        {
                            source: path.resolve(__dirname, "public/main.css"),
                            destination: path.resolve(__dirname, "public/assets/css/main.css")
                        }
                    ]
                }
            }
        }),
        mcep,
        pcp
    ]
}
    config.plugins.push(new GenerateSW({
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
        exclude: ["main.js", "main.css"],
        skipWaiting: true
    }));

if (mode == "production") {
    config.plugins.push(new PurgeCSSPlugin({
        paths: glob.sync(`${path.resolve(__dirname, 'public')}/*`, { nodir: true }),
    }));

    config.optimization = {
        usedExports: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }

}

module.exports = config;