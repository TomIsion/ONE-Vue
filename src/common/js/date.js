const reg = /YYY?Y?|MM|DD?|hh?|mm?|ss?|./g

const judgeDate = d => !((Object.prototype.toString.call(d) === '[object Date]') && isNaN(d.getTime()))

function dateFormat(date = new Date(), strReg = 'YYYY/MM/DD', objPlus = {}) {
  let innerDate = date

  // 所传递的是 字符串类型
  // 兼容 IE / 低版本Firefox 以及 iOS 下的 Safari
  // 获取需要处理的 Date 对象
  if (typeof date === 'string') {
    judgeDate(innerDate = new Date(date.replace(/-/g, '/'))) || (innerDate = new Date(date))
  }

  // 根据字符串提取所需要格式化的部分
  const arrFormat = strReg.match(reg)

  // 匹配各个部分的处理函数
  const objGetSepInfo = {
    D: () => innerDate.getDate(),
    DD: () => innerDate.getDate() < 10 ? `0${innerDate.getDate()}` : innerDate.getDate(),
    M: () => innerDate.getMonth() + 1,
    MM: () => innerDate.getMonth() + 1 < 10 ? `0${innerDate.getMonth() + 1}` : innerDate.getMonth() + 1,
    YYYY: () => innerDate.getFullYear(),
    h: () => innerDate.getHours(),
    hh: () => innerDate.getHours() < 10 ? `0${innerDate.getHours()}` : innerDate.getHours(),
    m: () => innerDate.getMinutes(),
    mm: () => innerDate.getMinutes() < 10 ? `0${innerDate.getMinutes()}` : innerDate.getMinutes(),
    s: () => innerDate.getSeconds(),
    ss: () => innerDate.getSeconds() < 10 ? `0${innerDate.getSeconds()}` : innerDate.getSeconds(),
  }

  // 遍历数组返回拼接值
  return arrFormat.reduce((pre, cur) => `${pre}${
    objGetSepInfo[cur] ? objGetSepInfo[cur]() : cur
  }`, '')
}

export {
  dateFormat,
}
