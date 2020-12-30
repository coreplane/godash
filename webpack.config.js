module.exports = {
    mode: 'production',
    entry: [
        './src/index'
    ],
    output: {
        globalObject: 'this',
        library: 'godash',
        libraryTarget: 'umd',
        filename: 'godash.js'
    },
    externals: {
        'lodash': 'lodash',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    }
};
