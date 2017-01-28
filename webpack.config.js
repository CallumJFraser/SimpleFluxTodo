module.exports = {
    context: __dirname,
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/build',
        filename: "index.bundle.js"
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015','react'],
                plugins: ['rewire']
            }
        }]
    }
};
