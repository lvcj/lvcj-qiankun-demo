const webpack = require("webpack")
const WebpackChunkHash = require("webpack-chunk-hash") //感觉这个插件有问题
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const AssetsPlugin = require("assets-webpack-plugin")
const config = require("./webpack.common.config")
const htmlWebpackPlugin = require("html-webpack-plugin"); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
console.log("process.env.NODE_ENV ===>>>>",process.env.NODE_ENV)
module.exports = {
    // 开发者模式
    mode: "production", 
    entry: config.entry,
    output: config.output,
    resolve: config.resolve,
    module: config.modules(MiniCssExtractPlugin),
    devtool: "source-map",
    resolveLoader: config.resolveLoader,
    optimization: {
        runtimeChunk: {
          name: "manifest",
        },
        namedChunks: true,
        splitChunks: {
          chunks: "all",
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: "~",
          name: true,
          cacheGroups: {
            vendor: {
              chunks: "initial",
              test: "vendor",
              name: "vendor",
              enforce: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
        minimizer: [
          // 压缩js文件
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            terserOptions: {
              ecma: undefined,
              warnings: false,
              output:{comments: false},
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'], // 移除console
              },
            },
            extractComments: true,    //将注释剥离到单独的文件中
          }),
          // 压缩css文件
          new OptimizeCSSAssetsPlugin({}),
        ],
    },
    plugins:[
        new htmlWebpackPlugin({
            title: "abc",
            filename: "index.html",//生成的html存放路径，相对于 path
            template: `${config.PUBLIC}/index.html`,//html模板路径
            minify: {//压缩HTML文件
              collapseWhitespace: true, //删除空白符与换行符 
              emoveComments: true,//去掉注释
              minifyCSS: true, // 压缩css
            },
        }),
        new AssetsPlugin({//将scss生产json文件对应所有的classname的对应关系
          filename: "assets.json",
          path: config.DIST,
        }),
        //固定模块的hash值，当增加一个js或者css文件时，希望打包的所有vendor相关的文件的hash都不要变化
        new webpack.HashedModuleIdsPlugin(), 
        // lodash按需加载
        new LodashModuleReplacementPlugin(),
        //将js和css分离，并且将文件放入css文件夹下，并且文件名称通过contenthash的方式进行定义
        new MiniCssExtractPlugin({
            filename: "css/[name]-qiankun.[contenthash:8].css",
        }),
        new CleanWebpackPlugin(),
    ],
    
};