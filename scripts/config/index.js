const dev = {
  publicPath: '/',
}

const test = {
  publicPath: `https://oss.walkidz.com/h5/v2/`,
}

const uat = {
  publicPath: `https://oss.walkidz.com/h5/v2/`,
}

const prod = {
  publicPath: `https://oss.walkidz.com/h5/v2/`,
}

const config = {
  dev,
  test,
  uat,
  prod,
}

module.exports = config[process.env.NODE_ENV]
