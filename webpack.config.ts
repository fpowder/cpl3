import path from 'path';
import { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const devServer: DevServerConfiguration = {};
let config: Configuration = { devServer };

config = {
    // entry: {
    //     index: {
    //         import: './src/index.js',
    //         dependOn: 'shared',
    //     },
    //     print: './src/print/print.js',
    //     another: {
    //         import: './src/another/another.js',
    //         dependOn: 'shared'
    //     },
    //     shared: 'lodash',
    // },
    entry: {
        // index: './src/index.ts',
        cpl3: './src/cpl3.ts'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        port: 9000,
    },
    // mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template/cpl3.html',
            hash: false,
            // chunks: ['cpl3'],
            // excludeChunks: ['index'],
            filename: 'cpl3.html'
        }),
        // new CleanWebpackPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/dist'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                test: /\.glb/,
                type: 'asset/glb'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: '/node_modules/'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.js', '.ts']
    }
}

export default config;