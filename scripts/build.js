const { merge } = require('webpack-merge')
const commonWebpack = require('./webpack/webpack.common')
const ProdWebpack = require('./webpack/webpack.prod')

module.exports = merge(commonWebpack, ProdWebpack)
