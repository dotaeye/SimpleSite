var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var CHUNK_REGEX = /^([A-Za-z0-9_\-]+)\..*/;
var env = require('./env');
var webpackDevConfig = require('./webpack.dev.config');
var babelrc = fs.readFileSync('./.babelrc');
var babelLoaderQuery = {};
try {
    babelLoaderQuery = JSON.parse(babelrc);
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}


module.exports = function (grunt) {

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        // project variables
        project: {
            build: path.join(__dirname, '/src/public/build'),
            public: 'src/public',
        },

        // clean build
        clean: [path.join(__dirname, '/src/public/build/js')],

        less: {
            dev: {
                files: {
                    './src/public/styles/main.css': './src/public/styles/main.less'
                }
            },
            prod: {
                files: {
                    './src/public/styles/main.css': './src/public/styles/main.less'
                },
                options: {
                    compress: true
                }
            }
        },

        webpack: {
            prod: {
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                entry: './src/client.js',
                output: {
                    path: '<%= project.build %>/js',
                    filename: '[name].[chunkhash].min.js',
                    chunkFilename: '[name].[chunkhash].min.js'
                },
                module: {
                    loaders: [
                        {
                            test: /\.jsx?$/,
                            exclude: /node_modules/,
                            loaders: ['react-hot', 'babel?' + JSON.stringify(babelLoaderQuery),]
                        }, {
                            test: /\.json$/,
                            exclude: /node_modules/,
                            loaders: ['json-loader']
                        }
                    ]
                },
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('production')
                        }
                    }),

                    // These are performance optimizations for your bundles
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.optimize.CommonsChunkPlugin('common.[hash].min.js', 2),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        },
                        output: {
                            comments: false
                        }
                    }),
                    // generates webpack assets config to use hashed assets in production mode
                    function webpackStatsPlugin() {
                        this.plugin('done', function (stats) {
                            var data = stats.toJson();
                            var assets = data.assetsByChunkName;
                            var output = {
                                assets: {},
                                cdnPath: this.options.output.publicPath
                            };

                            Object.keys(assets).forEach(function eachAsset(key) {
                                var value = assets[key];
                                // if `*.[chunkhash].min.js` regex matched, then use file name for key
                                var matches = key.match(CHUNK_REGEX);
                                if (matches) {
                                    key = matches[1];
                                }
                                output.assets[key] = '/build/js/' + value;
                            });
                            //add essentials
                            fs.writeFileSync(
                                path.join(__dirname, '/src/public/build', 'assets.json'),
                                JSON.stringify(output, null, 4)
                            );
                        });
                    }
                ],
                // removes verbosity from builds
                progress: false
            }
        },
        'webpack-dev-server': {
            options: {
                hot: true,
                historyApiFallback: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
                port: env.hot_server_port,
            webpack: webpackDevConfig,
                publicPath: webpackDevConfig.output.publicPath,
                contentBase: 'http://' + env.hot_server_host + ':' + env.hot_server_port
            },
            start: {
                keepAlive: true
            }
        }
    });

    //development environment task
    grunt.registerTask('default', ['clean', 'less:dev', 'webpack-dev-server']);

    //production environment task
    grunt.registerTask('prod', ['clean', 'less:prod', 'webpack:prod']);

};