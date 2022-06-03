// 开发环境代理配置
const proxySettings = {
  '/api': {
    target: '测试地址',
    secure: false,
    changeOrigin: true,
  },
}

module.exports = proxySettings
