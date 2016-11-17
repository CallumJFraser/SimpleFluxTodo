module.exports = {
    context: __dirname + '/src',
    entry: './index',
    output: {
        path: __dirname + '/build',
        filename: "index.bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','react']
            }
        }]
    }
};
