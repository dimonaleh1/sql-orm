const path = require("path");

module.exports = {
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js"]
  },
  target: "node",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, ""),
    libraryTarget: "commonjs"
  }
};
