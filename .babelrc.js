const path = require("path")

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        targets: {
          browsers: ["defaults", "not ie <= 8"],
        },
        corejs: 3,
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/plugin-proposal-function-bind",
    "@babel/plugin-syntax-dynamic-import",
    ["import", { libraryName: "@ant-design/react-native", style: "css" }, "rn"],
    ["import", { libraryName: "antd-mobile", style: "css" }, "antd-mobile"],
    [
      "react-css-modules",
      {
        exclude: "node_modules",
        filetypes: {
          ".scss": {
            syntax: "postcss-scss",
            plugins: ["postcss-nested"],
          },
        },
        generateScopedName: "[local]___[hash:base64:5]",
        webpackHotModuleReloading: true,
      },
    ],
  ],
//   env: {
//     development: {
//       plugins: ["react-hot-loader/babel"],
//     },
//     test: {
//       plugins: ["react-hot-loader/babel"],
//     },
//   },
}
