const os = require('os');

module.exports = {
  apps: [{
    name: 'tsrpc-server',      // 服务启动名称
    instances: os.cpus().length,// 服务启动进程数
    script: 'index.js', // 项目启动地址
    watch: 'true',             // 是否开启,文件修改监听重启,修改文件后,自动重启
    max_restarts: '5',         // 服务最多重启数
    exec_mode: 'cluster',      // 集群方式运行
    max_memory_restart: '515M',// 最大服务占用内容,超过便重启
    source_map_support: false,  // 是否开启视图监听
  }],
  /* TODO */
  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
