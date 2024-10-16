const { GenerateSW } = require('workbox-webpack-plugin');
const { version } = require('./package.json');
const { config, fmp, pcp, mcep } = require("./webpack.config");

config.plugins = [
        mcep,
        pcp,
        new GenerateSW({
            swDest: "sw.js",
            runtimeCaching: [{
                handler: "CacheFirst",
                urlPattern: new RegExp("https\:\/\/images|\.cdn\.dymtomas.com\/*"),
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
        }),
        fmp
    ];

module.exports = config;
