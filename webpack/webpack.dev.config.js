const config = require("./webpack.common.config")
const htmlWebpackPlugin = require("html-webpack-plugin"); 
console.log("process.env.NODE_ENV ===>>>>",process.env.NODE_ENV)
module.exports = {
    // 开发者模式
    mode: "development", 
    entry:config.entry,
    output:config.output,
    resolve: config.resolve,
    module:config.modules(),
    devtool: "cheap-module-source-map",
    resolveLoader: config.resolveLoader,
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
    ],
    devServer: {
        host: "0.0.0.0",
        port: 8089,
        contentBase: config.DIST,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        overlay: false,
        publicPath: "/",
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: {
            // "/hsy/**": {
            //   changeOrigin: true,
            //   // target: "https://inte-cloud.chanjet.com",
            //   // target: "http://127.0.0.1:7000",
            //   // target: "http://10.1.146.76:7000",
            //   // target: "https://test-cloud.chanjet.com",
            //   target: "http://10.1.144.62:7000",
            //   // target: "https://inte-cloud.chanjet.com",
            //   //target: "http://hsy-dev-saas.yqk8s.chanjet.com.cn",
            //   secure: true,
            // },
        },
    },
};