const dev = process.env.NODE_ENV !== 'production';
const path = require('path');
const merge = require('webpack-merge');

const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
  resolve: {
    alias: {
      components: path.resolve('src', 'components'),
      images: path.resolve('src', 'images'),
      pages: path.resolve('src', 'pages'),
      styles: path.resolve('src', 'styles'),
      util: path.resolve('src', 'util'),
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '> 0.25%, not dead',
                  modules: false,
                },
              ],
              '@babel/preset-react',
            ],

            plugins: ['@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      'typeof window': JSON.stringify('object'),
    }),
    new MiniCssExtractPlugin(),
  ],
};

if (dev) {
  config = merge(config, {
    mode: 'development',

    entry: {
      main: ['webpack/hot/signal', './src/app.js'],
    },

    output: {
      publicPath: 'http://localhost:3000/',
    },

    devtool: 'source-map',
    devServer: {
      hot: true,
      contentBase: './dist',
      headers: { 'Access-Control-Allow-Origin': '*' },
      historyApiFallback: true,
      publicPath: 'http://localhost:3000/',
      port: 3000,
      quiet: true,
      watchContentBase: true,
    },

    plugins: [
      new HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
    ],
  });
} else {
  config = merge(config, {
    mode: 'production',

    entry: {
      main: './src/app.js',
    },

    output: {
      publicPath: '/assets/',
    },
  });
}

module.exports = config;
