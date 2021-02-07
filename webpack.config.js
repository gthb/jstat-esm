const path = require("path");
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist/"),
        filename: "jstat.min.js",
        library: "jStat",
        libraryTarget: "umd",
        globalObject: 'this',
        libraryExport: "default",
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: 'jstat.min.js.map'
        }),
    ],
    optimization: {
        usedExports: false,
    }
};
