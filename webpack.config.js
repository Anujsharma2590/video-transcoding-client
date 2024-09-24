// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  const isEnvDevelopment = env === "development";
  return {
    entry: {
      bundle: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash:8].js",
    },
    mode: isEnvDevelopment ? "development" : "production",

    target: "web",
    devServer: {
      port: "5000",
      static: {
        directory: path.join(__dirname, "public"),
      },
      open: true,
      hot: true,
      liveReload: true,
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: [
            "style-loader", // Injects styles into DOM
            "css-loader", // Resolves @import and url()
            "postcss-loader", // Processes CSS with PostCSS
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Transcoding App",
        template: path.join(__dirname, "public", "index.html"),
      }),
      new Dotenv(),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: "vendor",
            chunks: "all",
          },
        },
      },
    },
  };
};
