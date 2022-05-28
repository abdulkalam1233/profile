const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const APP_DIR = path.join(__dirname, "src");
const BUILD_DIR = path.join(__dirname, "dist");

module.exports = {
  entry: {
    app: path.join(APP_DIR, "index.tsx"),
  },
  output: {
    filename: "[name].[hash].js",
    path: BUILD_DIR,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "public/index.html"),
      favicon: "public/favicon.ico",
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(sass|scss|less|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "sass-loader",
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(pdf|png|svg|jpg|gif|jpeg)$/,
        exclude: /node_modules/,
        use: ["file-loader"],
      },
    ],
  },
  devServer: {
    port: 3002,
    compress: true,
    historyApiFallback: true,
  },
};
