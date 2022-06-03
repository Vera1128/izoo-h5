# 爱走星球 H5

## clone

包含子 git 目录，要增加--recurse-submodules 参数
git clone --recurse-submodules https://github.com/Vera1128/izoo-h5.git

## 启动/打包

1. 安装依赖 yarn | npm install
2. 启动项目 yarn start | npm start
3. [开发环境](http://dev.test.ximalaya.com/gatekeeper/xmkp-h5-template/index) 根据 constants 的配置
4. 打包 yarn build | npm run build

## 必读

#### commit 提交约定

提交 commit 的时候必须要说明提交的类型和具体涉及
<code>git commit -m 'feat: 描述'</code>

- build : 改变了 build 工具 如 webpack
- ci : 持续集成新增
- chore : 构建过程或辅助工具的变动
- feat : 新功能
- docs : 文档改变
- fix : 修复 bug
- perf : 性能优化
- refactor : 某个已有功能重构
- revert : 撤销上一次的 commit
- style : 代码格式改变
- test : 增加测试
- anno: 增加注释

## 目录结构

```模版目录
├─ node_modules                         依赖包
├─ public                               静态资源文件
├─ scripts                              构建文件（后期移动到脚手架内处理）
│  ├─ config                              webpack配置信息
│  │  ├─ index.js                         通用配置
│  │  ├─ webpack.common.js
│  │  ├─ webpack.dev.js
│  │  └─ webpack.prod.js
│  ├─ constants.js                        配置信息
│  └─ setProxy.js                         代理配置
├─ src                                  项目源码
│  ├─ apis                                公共接口封装
│  ├─ assets                              资源文件
│  ├─ components                          抽象的通用组件
│  ├─ config                              config配置
│  ├─ hooks                               通用react-hooks
│  ├─ modules                             通用模块
│  ├─ pages                               路由页面
│  ├─ router                              路由管理模块
│  ├─ utils                               通用工具模块
│  ├─ app.tsx                             项目入口组件
│  ├─ index.tsx                           项目入口文件
│  ├─ routeGuards.ts                      路由守卫
│  └─ walkidz-shared                      tsrpc 协议文档
├─ .babelrc                             babel 配置
├─ .eslintrc.js                         eslint 配置
├─ .gitignore                           忽略提交到git目录文件
├─ .prettierrc                          代码美化
├─ jest.config.ts                       jest 配置文件
├─ .prettierrc                          代码美化
├─ package.json                         依赖包及配置信息文件
├─ tsconfig.json                        typescript 配置
└─ README.md                            描述文件

```

---

### 路径别名

```js
'src/*' = './src/*'
'apis/*' = './src/apis/*'
'assets/*' = './src/assets/*'
'components/*' = './src/components/*'
'config/*' = './src/config/*'
'hooks/*' = './src/hooks/*'
'modules/*' = './src/modules/*'
'pages/*' = './src/pages/*'
'router/*' = './src/router/*'
'utils/*' = './src/utils/*'
```
