import * as path from 'path';
import * as webpack from 'webpack';
import {spawn} from 'child_process';
import baseConfig from './webpack.base'

const port = baseConfig.port;
const publicPath = baseConfig.publicPath;
const isProd = baseConfig.isProd;

const VueLoaderPlugin = require('vue-loader/lib/plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

export default <webpack.Configuration> {
    entry: './src/renderer.ts',
    output: {
        path: __dirname + "/build",
        publicPath: isProd ? "" : publicPath,
        filename: isProd ? 'renderer.min.js' : 'renderer.js'
    },

    devtool: isProd ? "nosources-source-map" : 'cheap-eval-source-map',
    mode: isProd ? "production" : 'development',
    target: 'electron-renderer',

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {test: /\.ts?$/, loader: "ts-loader", options: {appendTsSuffixTo: [/\.vue$/]}},

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
            {test: /\.vue$/, loader: "vue-loader"},
            {test: /\.css$/, use: [isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader']},
            {test: /\.(ico|gif|png|jpg|jpeg|webp|ttf|woff)$/i, loader: 'url-loader', options: {limit: 1}}
        ]
    },

    node: {
        __dirname: false,
        __filename: false
    },
    plugins: function () {
        let plugins = [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': `process.env.NODE_ENV`,
                'process.env.PUBLIC_PATH': JSON.stringify(publicPath)
            }),
            new HtmlWebpackPlugin({
                templateContent: "<div id='app'></div>"
            })
        ];
        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({
                filename: 'style.min.css'
            }));
        } else {
            plugins.push(new webpack.HotModuleReplacementPlugin({
                multiStep: true
            }));
        }
        return plugins;
    }(),
    devServer: {
        port,
        publicPath,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        writeToDisk: false,
        headers: {'Access-Control-Allow-Origin': '*'},
        contentBase: path.join(__dirname, 'build'),
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        historyApiFallback: true,
        before() {
            if (process.env.START_HOT) {
                console.log('Starting Main Process...');
                spawn('npm', ['run', 'start-main-dev'], {
                    shell: true,
                    env: process.env,
                    stdio: 'inherit'
                })
                    .on('close', code => process.exit(code))
                    .on('error', spawnError => console.error(spawnError));
            }
        }
    }
};
