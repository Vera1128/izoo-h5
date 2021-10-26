const { merge } = require('webpack-merge')
const commonWebpack = require('./webpack/webpack.common')
const DevWebpack = require('./webpack/webpack.dev')

module.exports = merge(commonWebpack, DevWebpack)
