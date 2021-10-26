const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { IS_DEV } = require('../config/constants')

const getCssLoaders = (importLoaders) => [
  IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: {
        compileType: 'module',
        mode: 'local',
        auto: false,
        exportGlobals: false,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
        localIdentContext: path.resolve(__dirname, 'src'),
        localIdentHashPrefix: "custom-hash",
        namedExport: true,
        exportLocalsConvention: 'camelCase',
        exportOnlyLocals: false,
      },
      sourceMap: true,
      importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        plugins: [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              grid: true,
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          require('postcss-normalize'),
          require('postcss-pxtorem')({
            rootValue: 75, // 根节点fontSize，二倍图为75 一倍图为37.5。按此比例来转化rem
            unitPrecision: 5,
            propList: ['*'],
            exclude: /(node_module)/,
            replace: true,
            minPixelValue: 1,
          }),
        ],
      },
      sourceMap: IS_DEV,
    },
  },
  { loader: 'sass-loader' },
]

module.exports = getCssLoaders
