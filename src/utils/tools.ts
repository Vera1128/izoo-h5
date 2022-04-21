/*
 * @Description:
 * @Author: yangyang.xu
 * @Date: 2022-04-20 22:22:02
 * @LastEditTime: 2022-04-20 22:26:04
 */
// 时间格式转化
export function timeStampToDate(stamp, dateFormat = 'YYYY-MM-DD hh:mm:ss') {
  try {
    const date = new Date(stamp * 1)
    const Y = date.getFullYear() as any
    let M = (date.getMonth() + 1) as any
    M = M < 10 ? `0${M}` : M
    let D = date.getDate() as any
    D = D < 10 ? `0${D}` : D
    let h = date.getHours() as any
    h = h < 10 ? `0${h}` : h
    let m = date.getMinutes() as any
    m = m < 10 ? `0${m}` : m
    let s = date.getSeconds() as any
    s = s < 10 ? `0${s}` : s
    return dateFormat
      .replace('YYYY', Y)
      .replace('MM', M)
      .replace('DD', D)
      .replace('hh', h)
      .replace('mm', m)
      .replace('ss', s)
  } catch (error) {
    return stamp
  }
}
