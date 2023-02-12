const path = require('path')
const {
    VueLoaderPlugin
} = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const resolve = dir => path.join(__dirname, dir)
module.exports = {
    mode: 'none',
    entry: {
        'pgh-lib': './compliugn/index.js',
        'calendarCus': './compliugn/calendarcus.js',
        'tableCus': './compliugn/tablecus.js'
    },
    output: {
        path: path.join(__dirname, "/lib"),
        publicPath: process.env.NODE_ENV == 'development' ? '/dist/' : '../',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: '[name]',
        libraryExport: 'default'
    },
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    externals: {
        vue: {
            root: "Vue", //通过 script 标签引入，此时全局变量中可以访问的是 Vue
            commonjs: "vue", //可以将vue作为一个 CommonJS 模块访问
            commonjs2: "vue", //和上面的类似，但导出的是 module.exports.default
            amd: "vue" //类似于 commonjs，但使用 AMD 模块系统
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                // use:  ['vue-loader']
                use: [{
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            scss: [
                                'vue-style-loader',
                                MiniCssExtractPlugin.loader,
                                'css-loader?sourceMap',
                                'sass-loader?sourceMap'
                            ],
                            css: [
                                'vue-style-loader',
                                MiniCssExtractPlugin.loader,
                                'css-loader?sourceMap'
                            ]

                        }
                    }
                }],




            },
            {
                test: /\.css$/,
                use: ['css-loader', 'postcss-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        //	new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        //    filename: "[name].css",
        //  chunkFilename: "[id].css",
        //})
    ]
}