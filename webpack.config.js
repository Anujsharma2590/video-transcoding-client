const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
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
      publicPath: "/",
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
            "css-loader",   // Resolves @import and url()
            "postcss-loader", // Processes CSS with PostCSS
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: "asset/resource", // Ensure images are treated as assets
          generator: {
            filename: "images/[hash][ext][query]", // Define where images are placed
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Transcoding App",
        template: path.join(__dirname, "public", "index.html"),
        filename: "index.html", // Explicitly define the filename
      }),
      new Dotenv(),
      // Copy files from public folder to build folder
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public"),
            to: path.resolve(__dirname, "build"), // Copy everything from public/ to build/
            globOptions: {
              ignore: ["**/index.html"], // Ignore index.html to avoid duplication
            },
          },
        ],
      }),
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
