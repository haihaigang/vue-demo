const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {

    devtool: 'inline-source-map',

    entry: fs.readdirSync(__dirname + '/src').reduce((entries, dir) => {
        const fullDir = path.join(__dirname + '/src', dir)
        const entry = path.join(fullDir, 'app.js')
        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entries[dir] = ['webpack-hot-middleware/client', entry]
        }

        return entries
    }, {}),

    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/__build__/'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.s(a|c)ss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: "file-loader"
        }, {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            loader: 'file-loader?limit=50000'
        }]
    },

    resolve: {
        alias: {
            //vuex: path.resolve(__dirname, '../src/index.esm.js')
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'shared',
            filename: 'shared.js'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin("styles.css")
    ]

}
