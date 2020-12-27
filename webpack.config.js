const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist/"),
        filename: "jstat.min.js",
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
        usedExports: false,
    }
};
