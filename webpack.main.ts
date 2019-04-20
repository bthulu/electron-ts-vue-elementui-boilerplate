import * as webpack from 'webpack';
import baseConfig from "./webpack.base";

const isProd = baseConfig.isProd;

export default <webpack.Configuration> {
    entry:  './src/main.ts',
    output: {
        filename: isProd ? "main.min.js" : "main.js",
        path: __dirname + "/build"
    },

    devtool: isProd ? "nosources-source-map" : "cheap-eval-source-map",
    mode: isProd ? 'production' : 'development',
    target: 'electron-main', // 特別重要, 弄错了编译不了 configuration.target should be one of these: "web" | "webworker" | "node" | "async-node" | "node-webkit" | "electron-main" | "electron-renderer"

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    
    node: {
        __dirname: false,
        __filename: false
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `process.env.NODE_ENV`,
            'process.env.PUBLIC_PATH': JSON.stringify(baseConfig.publicPath)
          })
    ]
}