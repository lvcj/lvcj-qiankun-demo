const path = require("path");

const DIST = path.resolve( __dirname, "../", "dist");
const PUBLIC = path.resolve( __dirname, "../", "public");
const SRC = path.resolve( __dirname, "../", "src");
const SVG = path.resolve( __dirname, "../", "src/assert/svg");
function modules(cssPlugin){
    return {
        rules:[
            {
                test:/\.[jt]sx?$/,
                use:require.resolve("babel-loader"),
                exclude:/node_modules/,
            },
            {
                test:/\.css$/,
                use:[
                    process.env.NODE_ENV == "development"? "style-loader":cssPlugin.loader,
                    {
                        loader:"css-loader",
                        options: {
                            importLoaders: 1, //0代表无loader默认，1代表postcss-loader；2代表postcss-loader和sass-loader
                        },
                    }
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    process.env.NODE_ENV == "development"? "style-loader":cssPlugin.loader,
                    {
                        loader:"css-loader",
                        options: {
                            importLoaders: 1, //0代表无loader默认，1代表postcss-loader；2代表postcss-loader和sass-loader
                        },
                    },
                    "postcss-loader"
                ]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: "static/media/[name].[hash:8].[ext]",
                        },
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: require.resolve("svg-sprite-loader"),
                include: [SVG],
                options: {
                symbolId: "icon-[name]",
                },
            },
            {
                test: /\.woff2?\??.*$/,
                use: {
                loader: "url-loader",
                options: {
                    name: "[name].[ext]",
                    limit: 5000,
                    mimetype: "application/font-woff",
                },
                },
            },
            {
                test: /\.(ttf|eot|svg)\??.*$/,
                exclude: [SVG],
                use: {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                },
                },
            },
        ]
    }
}

const entry = "./src/index.js";
const output = {
    path: path.join(__dirname, "../", 'dist'),
    filename: process.env.NODE_ENV == "development"? "js/build-qiankun.js":"js/[name]-qiankun.[chunkhash:8].js",
    chunkFilename: process.env.NODE_ENV == "development"? "js/[name]-qiankun.chunk.js":"js/[name]-qiankun.[chunkhash:6].js"
}

const resolve = {
    alias: {// 重命名
      "~": SRC,
    },
    modules: [SRC, "node_modules"],// 去哪个模块下寻找第三方模块
    extensions: [// 解析扩展
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".mjs",
    ],
}
const resolveLoader = {
    modules: ["node_modules"],
}

module.exports = {
    modules,
    DIST,
    PUBLIC,
    SRC,
    SVG,
    entry,
    output,
    resolve,
    resolveLoader
}