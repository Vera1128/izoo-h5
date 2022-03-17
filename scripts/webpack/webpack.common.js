const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = require('../config')
const getCssLoaders = require('./cssloaders')

const { PROJECT_PATH, IS_DEV, APP_NAME, SENTRY_DSN, BASE_PATHNAME } = require('../config/constants')

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(PROJECT_PATH, './dist'),
    publicPath: config.publicPath,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      src: path.resolve(PROJECT_PATH, './src'),
      apis: path.resolve(PROJECT_PATH, './src/apis'),
      assets: path.resolve(PROJECT_PATH, './src/assets'),
      constants: path.resolve(PROJECT_PATH, './src/constants'),
      components: path.resolve(PROJECT_PATH, './src/components'),
      config: path.resolve(PROJECT_PATH, './config'),
      hooks: path.resolve(PROJECT_PATH, './src/hooks'),
      modules: path.resolve(PROJECT_PATH, './src/modules'),
      pages: path.resolve(PROJECT_PATH, './src/pages'),
      router: path.resolve(PROJECT_PATH, './src/router'),
      utils: path.resolve(PROJECT_PATH, './src/utils'),
    },
  },
  optimization: {
    minimize: !IS_DEV,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      publicPath: config.publicPath,
      cache: false,
      // 压缩html文件
      hash: true,
      // 压缩 => production 模式使用
      minify: {
        // 删除双引号
        removeAttributeQuotes: true,
        // 折叠 html 为一行
        collapseWhitespace: true,
      },
    }),
    new ESLintPlugin(),
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(PROJECT_PATH, './public/'),
          from: '**/*',
          to: path.resolve(PROJECT_PATH, './dist'),
          toType: 'dir',
          filter: async (resourcePath) => {
            return !resourcePath.includes('html')
          },
        },
      ],
    }),
    new WebpackBar({
      name: IS_DEV ? '疯狂编译中...' : '疯狂构建中...',
      color: '#fa8c16',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
    // 需要转化为json字符串
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify(process.env.NODE_ENV),
      APP_NAME: JSON.stringify(APP_NAME),
      APP_BASENAME: JSON.stringify(BASE_PATHNAME),
      SENTRY_DSN: JSON.stringify(SENTRY_DSN),
    }),
    // 分析包大小
    // new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js|ts|tsx|jsx$/,
        //排除node_modules 目录下的文件
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: getCssLoaders(1),
      },
      {
        test: /\.less/,
        use: getCssLoaders(2),
      },
      {
        test: /\.scss/,
        use: getCssLoaders(3),
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              output: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory=true',
          },
          'eslint-loader',
        ],
      },
    ],
  },
}
