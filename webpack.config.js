var webpack = require('webpack');
var appEnvironment = process.env.APP_ENVIRONMENT;
var EntryModuleList = require("./packmodulelist.js");
var path = require('path');
var Minimize = require('minimize');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');



var config = {

    entry: new EntryModuleList().modules,

    output: {
        filename: "./www/js/[name].bundle.js"
    },
    devServer: {
        // This is required for older versions of webpack-dev-server
        // if you use absolute 'to' paths. The path should be an
        // absolute path to your build destination.
        outputPath: path.join(__dirname, '.tmpbuild'),
        //  hot: true,
        //  inline: true
    },
    resolve: {
        extensions: ['', '.js', ".ts", '.html', '.css', '.scss'],
        alias: { 'base': path.join(__dirname, 'scss/'), 'imgs': path.join(__dirname, 'www/imgs/') }
    },

    module: {
        loaders: [
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=50000' },
            { test: /.ts(x?)$/, loader: 'ts-loader?configFileName=tsconfig.json' },
            { test: /.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader") }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./www/css/[name].css"),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/**/*.html',
            to: __dirname + "/www/",
            toType: 'dir',
            transform: function(content, path) {
                if (!isProduction()) {
                    return content;
                }

                var options = {
                    empty: true, // KEEP empty attributes
                    cdata: true, // KEEP CDATA from scripts
                    comments: false, // KEEP comments
                    // dom: { 
                    //     lowerCaseAttributeNames: false, // do not call .toLowerCase for each attribute name (Angular2 use camelCase attributes)
                    // }
                };


                var minimize = new Minimize(options);
                var rst = minimize.parse(content);
                return rst;
            },
            context: './src',
            copyUnmodified: false,
        }]),
        new CopyWebpackPlugin([{
            from: __dirname + "/src/imgs/",
            to: __dirname + "/www/imgs/"
        }])


    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions', 'android>=4.1', "ios>=7"]
        })
    ],


};

function isProduction() {
    return 'production' === appEnvironment;
}
if (isProduction()) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        }
    }));
}

module.exports = config;