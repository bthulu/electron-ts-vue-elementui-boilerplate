import * as webpack from "webpack";
import * as path from 'path';
import { dependencies } from './package.json';

const dll = path.join(__dirname, 'dll');
export default <webpack.Configuration> {
    entry: {
        renderer: Object.keys(dependencies || {})
    },
    output: {
        path: dll,
        filename: '[name].dll.js',
        library: 'renderer',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(dll, '[name].dll.json'),
            name: '[name]' // 这里的name, 最好与output.library一致, 否则需要在DllReferencePlugin中配置name
        }),
    ]
}