const dev = {
  publicPath: '/',
}

const test = {
  publicPath: `./`,
}

const uat = {
  publicPath: `./`,
}

const prod = {
  publicPath: `./`,
}

const config = {
  dev,
  test,
  uat,
  prod,
}

module.exports = config[process.env.NODE_ENV]
