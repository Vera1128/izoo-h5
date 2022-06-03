const qs = require('querystring')

// scss类选择器匹配规则
const classNameReg = /([\.|\#]([A-Za-z0-9_-])+\s*)+{?$/g
// let reg = /(?<=\s?\.)(.*)(?=\")/g;
// ?=) 后序断言 
// /(?<= 前序断言

module.exports = function (source) {
  const resourceQuery = qs.parse(this.resource.split('?')[1])
  const scopeId = resourceQuery.scopeId
  const classnames = resourceQuery.classnames && resourceQuery.classnames.split('%')
  if (scopeId && classnames) {
    classnames.map((cName) => {
      source = source.replace(cName, `${cName}-${scopeId}`)
    })
    // return source.replace(classNameReg, (matchItem) => {
    //   const theClassName = matchItem.match(/\.([^{]+)(\s*)\{/)[1].trim()
    //     console.log('theClassName: ', theClassName, matchItem)
    //   // 兼容css的后代选择器模式，比如 .a .b{}
    //   const classValues = theClassName.split(/(\s+)/)
    //   const ultiClassName = classValues.map((item, index) => {
    //     const checkValue = index === 0 ? `.${item}` : item
    //     const newName = classnames.indexOf(checkValue) >= 0 ? `${checkValue}-${scopeId}` : checkValue
    //     return newName
    //   }).join(' ')
    //   return `${ultiClassName} {`
    // })
  }
  console.log('--------')
  console.log(source)
  return source
}
