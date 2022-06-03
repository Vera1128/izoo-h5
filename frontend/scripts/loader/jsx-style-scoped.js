const md5 = require('md5')
// react jsx/tsx classname模块化
// la = local area 局部区域
const styleReg = /\.(c|le|sc|sa)ss/g
// 普通className写法替换
const classNameReg = /className=\"([a-zA-Z0-9\-\_]+(\s+[a-zA-Z0-9\-\_]+){0,})\"/g
// className = {}写法替换
const objctNameReg = /className=\{.+\}/g

const computedHash = {}

const computeHash = (resourcePath) => {
  if (computedHash[resourcePath]) {
    return computedHash[resourcePath]
  }
  const hash = md5(resourcePath).substr(0, 8)
  computedHash[resourcePath] = hash
  return hash
}

// 常规classname替换
function normalClassReplace(classnames, hash, match) {
  let value = match.match(/([a-zA-Z0-9\-\_]+)/g)
  value.shift()
  // 转化成带.的选择器
  classnames = classnames.concat(value.map(item => `.${item}`))
  const newName = `className="${value.map(item => `${item.trim()}-${hash}`).join(' ')}"`
  console.log('classnames: ', classnames)
  return newName
}

// className = {}写法兼容
function objectClassReplace(classnames, hash, match) {
  console.log('objectClassReplace: ', match)
  return match
} 

// style替换
function styleRegReplace(classnames, hash, match) {
  // const replaceName = `${match}?scopeId=${hash}&classnames=${classnames.join('($$)')}`
  const replaceName = `${match}?scopeId=${1111}&classnames=${classnames.join('($$)')}`
  return replaceName
}

module.exports = function (source) {
  const hash = computeHash(this.resourcePath)
  let classnames = []
  return source
    .replace(classNameReg, (match) => {
      let value = match.match(/([a-zA-Z0-9\-\_]+)/g)
      value.shift()
      // 转化成带.的选择器
      classnames = classnames.concat(value.map(item => `.${item}`))
      const newName = `className="${value.map(item => `${item.trim()}-${hash}`).join(' ')}"`
      return newName
    })
    .replace(styleReg, (match) => {
      const replaceName = `${match}?scopeId=${hash}&classnames=${classnames.join('%')}`
      return replaceName
    })
}
