const path = require("path");
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');
const package_orig_json = require("../package.json");
const package_new_json = JSON.parse(JSON.stringify(package_orig_json));
delete package_new_json.devDependencies;
delete package_new_json.scripts;

const dist_path =  path.join(__dirname, "../dist");

require('dotenv').config();
module.exports = {
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        path: dist_path,
        filename: "index.js",
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
        new CreateFileWebpack({path: dist_path, fileName: "package.json", content: JSON.stringify(package_new_json, null, 2)})
    ]
}
