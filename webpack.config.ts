import path from 'path';
import { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const devServer: DevServerConfiguration = {};
let config: Configuration = { devServer };

config = {
    
    mode: 'development',
    entry: {
        cpl3: './src/cpl3.ts'
    },
    devtool: 'inline-source-map',
    devServer: {
        liveReload: true
    },
    // mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template/cpl3.html',
            hash: false,
            chunks: ['cpl3'],
            // excludeChunks: ['index'],
            // filename: 'cpl3.html' // don't use filname value for running dev server
        }),
        // new CleanWebpackPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        // publicPath: '/dist'
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
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(glb|gltf)$/i,
                type: 'asset/resource',
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