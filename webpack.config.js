const path = require('path');

module.exports = {
    entry: './dist/index.js',
    mode: 'production',
    output: {
        filename: 'input-selection-model.min.js',
        path: path.resolve(__dirname, 'dist/browser'),
        library: 'InputSelectionModel',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        auxiliaryComment: 'A class for handling HTML input selection range tasks.',
    },
    devServer: {
        compress: true,
        port: 9000,
    },
};