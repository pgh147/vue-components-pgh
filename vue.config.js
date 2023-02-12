const {
  defineConfig
} = require("@vue/cli-service")
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const StylelintPlugin = require('stylelint-webpack-plugin')
const isProduction = process.env.VUE_APP_ENV === 'production'
// const CompressionPlugin = require("compression-webpack-plugin"); // npm i compression-webpack-plugin@7.0.0 开启gzip
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 去掉注释
// const Timestamp = new Date().getTime();
module.exports = defineConfig({
  transpileDependencies: ['vant'],
  filenameHashing: true,
  // 部署应用包时配置的
  publicPath: "./",
  // 打包后的目录
  outputDir: 'dist',
  // 放置生成的静态资源
  assetsDir: './',
  // 指定生成的 index.html 的输出路径
  // indexPath:'/',
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: true,
  productionSourceMap: false, //  设置生产环境的 source map 开启与关闭
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }

  },
  configureWebpack: {
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      // filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `[name].[hash].${process.env.VUE_APP_Version}.js`
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    optimization: isProduction ? {
      // 分割代码块
      splitChunks: {
        cacheGroups: {
          // 公用模块抽离
          common: {
            chunks: 'initial',
            minSize: 0, // 大于0个字节
            minChunks: 2 // 抽离公共代码时，这个代码块最小被引用的次数
          },
          // 第三方库抽离
          vendor: {
            priority: 1, // 权重
            test: /node_modules/,
            chunks: 'initial',
            minSize: 0, // 大于0个字节
            minChunks: 2 // 在分割之前，这个代码块最小应该被引用的次数
          }
        }
      }
    } : { // 分割代码块
      splitChunks: {
        cacheGroups: {
          // 公用模块抽离
          common: {
            chunks: 'initial',
            minSize: 0, // 大于0个字节
            minChunks: 2 // 抽离公共代码时，这个代码块最小被引用的次数
          },
          // 第三方库抽离
          vendor: {
            priority: 1, // 权重
            test: /node_modules/,
            chunks: 'initial',
            minSize: 0, // 大于0个字节
            minChunks: 2 // 在分割之前，这个代码块最小应该被引用的次数
          }
        }
      }
    },
    plugins: isProduction ? [
      new StylelintPlugin({
        files: ['**/src/*.{html,vue,css,sass,scss}'],
        fix: false,
        cache: true,
        failOnError: false
      }),
      // new CompressionPlugin({
      //   algorithm: 'gzip',
      //   test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
      //   threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
      //   deleteOriginalAssets: false // 是否删除原文件
      // })
      // , new UglifyJsPlugin({
      //   uglifyOptions: {
      //     // 生产环境自动删除console
      //     compress: {
      //       // warnings: false, //若打包错误，则注释这行
      //       drop_debugger: true,
      //       drop_console: true,
      //       pure_funcs: ['console.log']
      //     }
      //   },
      //   sourceMap: false,
      //   parallel: true
      // })
    ] : [
      // new StylelintPlugin({
      //   files: ['**/src/*.{html,vue,css,sass,scss}'],
      //   fix: false,
      //   cache: true,
      //   failOnError: false
      // })
    ]
  },
  devServer: {
    // host: '192.168.137.1',
    port: 8080,
    open: false,
    // hotOnly: false,
    proxy: {
      '/apilogin': {
        target: 'https://mhr.dlle.net.cn/', // 生产
        secure: false,
        changeOrigin: true, //需要虚拟主机站点
        ws: true, // 代理的WebSockets
        pathRewrite: {
          '^/apilogin': '/'
        }
      },

    },
  }

});