const webpack = require('webpack')
const { SERVER_HOST, SERVER_PORT, BASE_PATHNAME } = require('../config/constants')
const proxy = require('../config/proxy')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  target: 'web', // web环境
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    stats: 'normal', // 终端仅打印 error
    clientLogLevel: 'silent', // 日志等级
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    openPage: BASE_PATHNAME.substring(1), // 打开的默认路由
    hot: true, // 热更新
    proxy: proxy,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
}