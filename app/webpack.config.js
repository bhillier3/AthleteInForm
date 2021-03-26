const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.[fullhash].js'
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './public/index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'dist')
  }
};

if (currentTask == 'build') {
  config.mode = 'production';
  config.module.rules[1].use[0] = MiniCssExtractPlugin.loader;
  config.plugins.push(
    new MiniCssExtractPlugin({ filename: 'main.[fullhash].scss' }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin()
  );
};

module.exports = config;