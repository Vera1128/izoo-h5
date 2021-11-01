const dev = {
  publicPath: '/',
}

// hard code

const test = {
  publicPath: `http://127.0.0.1:8082/`,
}

const uat = {
  publicPath: `http://127.0.0.1:8082/`,
}

const prod = {
  publicPath: `http://127.0.0.1:8082/`,
}

const config = {
  dev,
  test,
  uat,
  prod,
}

module.exports = config[process.env.NODE_ENV]
