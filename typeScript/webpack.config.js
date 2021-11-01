const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    environment: {
      arrowFunction: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            //指定加载器
            loader: "babel-loader",
            options: {
              // 设置预定义的环境
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: "88",
                      ie: "11",
                    },
                    // 指定coreJs的版本
                    corejs: "3",
                    // 使用coreJs的方式usage，表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      // 生成html文件，并自动引入相关文件
      title: "这是自定义的title",
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};
