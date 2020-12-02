const px2rem = require("postcss-plugin-px2rem")
const px2remOptions = {
  rootValue: 75,
  unitPrecision: 5,
  propBlackList: [],
  exclude: [/node_modules/],
  replace: true,
  mediaQuery: false,
  minPixelValue: 1.1,
}

module.exports = {
  plugins: [
    require("precss"),
    require("autoprefixer"),
    require("postcss-modules")({
      scopeBehaviour: "local",
      generateScopedName: "[local]___[hash:base64:5]",
    }),
    px2rem(px2remOptions),
  ],
}
