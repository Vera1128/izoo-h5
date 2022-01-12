const dev = {
  publicPath: '/',
}

// hard code

const test = {
  publicPath: `https://walkidz.oss-cn-beijing.aliyuncs.com/h5/dist/`,
}

const uat = {
  publicPath: `https://walkidz.oss-cn-beijing.aliyuncs.com/h5/dist/`,
}

const prod = {
  publicPath: `https://walkidz.oss-cn-beijing.aliyuncs.com/h5/dist/`,
}

const config = {
  dev,
  test,
  uat,
  prod,
}

module.exports = config[process.env.NODE_ENV]
