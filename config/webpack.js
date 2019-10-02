const path = require("path");
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config();
module.exports = {
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "models.js",
        library: "models",
        libraryTarget: 'umd',
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    resolve: {	
      modules: [
	    process.env.NODE_PATH, 
	    "node_modules"
      ],
    },	
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                  plugins: [
                    "@babel/plugin-syntax-bigint"
                  ]
                }
            }
        }, 
        ]
    },
    plugins: [
	new Dotenv(),
        new  CleanWebpackPlugin(),
    ]
}
