const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './dist/public-api.js',
    mode: 'production',
    output: {
        filename: 'input-selection-model.min.js',
        path: path.resolve(__dirname, 'dist/browser'),
        library: 'InputSelectionModel',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        auxiliaryComment: 'A class for handling HTML input selection range tasks.',
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    devServer: {
        compress: true,
        port: 9000,
    },
};