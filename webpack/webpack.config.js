const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: './test.js',
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: 'main.js.map'
        }),
    ],
};
