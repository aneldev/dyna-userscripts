const fs = require("fs");
const path = require("path");
// Remove nodeExternals - causes require() in browser bundles
// const nodeExternals = require("webpack-node-externals");
const buffer = require.resolve("buffer");

const isSingleModule =
  fs.existsSync('./src/index.ts') ||
  fs.existsSync('./src/index.tsx');

const package_ = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const loaders = require('./webpack.loaders.js');
const plugins = require('./webpack.plugins.js');

/**
 * Exclude src/? folders when not in single mode
 * @type {string[]}
 */
const EXCLUDE_SRC_FOLDERS = [
  "@types",
  // Other folders that won't by built by Webpack might be listed here
]

const getModuleNames =
  root =>
    fs.readdirSync(root, {withFileTypes: true})
      .filter(dirent => dirent.isDirectory())
      .filter(dirent => !EXCLUDE_SRC_FOLDERS.includes(dirent.name))
      .map(dirent => dirent.name);

const moduleNames = getModuleNames('./src');

process.traceDeprecation = true;

module.exports = {
  mode: "development",
  target: "web",
  entry:
    isSingleModule
      ? [path.resolve(__dirname, 'src/index.tsx')]
      : moduleNames.reduce((acc, entry) => {
        acc[entry] = `./src/${entry}`;
        return acc;
      }, {}),
  // Remove externals: nodeExternals() - THIS CAUSES require() IN BROWSER
  // Replace with web-safe externals or empty object
  externals: {},
  optimization: {
    usedExports: true,
  },
  devtool: "source-map",
  output:
    isSingleModule
      ? {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'index.js',
          // FIXED: Use simple string + legacy UMD format
          library: package_.name,
          libraryTarget: 'umd',
          umdNamedDefine: true,
          globalObject: 'window',
        clean: true,
      }
      : {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name]/index.js',
          // FIXED: Use simple string + legacy UMD format
          library: package_.name,
          libraryTarget: 'umd',
          umdNamedDefine: true,
          globalObject: 'window',
        clean: true,
      },
  resolve: {
    alias: {},
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
    fallback: {
      // Remove Node.js modules, use browser alternatives or undefined
      "fs": false,
      "path": false,
      "buffer": false,  // Remove - conflicts in browser
      "stream": false,
      "crypto": false,
      "util": false,
      // Add if needed:
      // "buffer": require.resolve("buffer/"),
    }
  },
  module: {
    rules: loaders.module.rules,
  },
  plugins: plugins.plugins,
};
