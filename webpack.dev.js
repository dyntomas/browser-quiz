const { GenerateSW } = require('workbox-webpack-plugin');

const { version } = require('./package.json');

const { config, fmp, mcep, pcp } = require("./webpack.config");

config.plugins = [
    mcep,
    pcp,
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
    fmp
];

module.exports = config;
