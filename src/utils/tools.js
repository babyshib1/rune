/**
 * @description 获取url传参
 * @param {*} name 键值对key
 */
export const getQueryString = (name) => {
  const speStrArr = ['undefined', 'null']
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const a = window.location.hash.split('?').length ? window.location.hash.split('?')[1] : ''
  if (!a) return
  const r = a.match(reg)
  if (r !== null) {
    if (speStrArr.includes(decodeURIComponent(r[2]))) {
      return ''
    } else {
      return decodeURIComponent(r[2])
    }
  }
  return ''
}

/**
 * @description 手机号中间部分替换成星号
 * @param {*} phone
 */
export const formatPhone = (phone) => {
  return phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
}

/**
 * @description 姓名中间部分替换成星号
 * @param {*} username
 */
export const formatName = (username) => {
  let arr = Array.from(username)
  let l = arr.length
  let max = [0, 0, 1, 1][l] || l - 2
  let result = []
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    if (i === 0) {
      result.push(item)
    } else if (max > 0) {
      max--
      result.push('*')
    } else {
      result.push(item)
    }
  }
  return result.join('')
}

/**
 * @description 对象转字符串&拼接
 * @param {*} username
 */
export function objToQuery(initialObj) {
  const reducer =
    (obj, parentPrefix = null) =>
      (prev, key) => {
        const val = obj[key]
        // eslint-disable-next-line no-param-reassign
        key = encodeURIComponent(key)
        const prefix = parentPrefix ? `${parentPrefix}[${key}]` : key

        if (val === null || typeof val === 'function') {
          prev.push(`${prefix}=`)
          return prev
        }

        if (['number', 'boolean', 'string'].includes(typeof val)) {
          prev.push(`${prefix}=${encodeURIComponent(val)}`)
          return prev
        }

        prev.push(Object.keys(val).reduce(reducer(val, prefix), []).join('&'))
        return prev
      }

  return Object.keys(initialObj).reduce(reducer(initialObj), []).join('&')
}

/**
 * @description url字符串拼接转成对象
 * @param {*} username
 */
export function urlToObj(url) {
  if (!url) {
    return
  }
  let queryStr = url.split('?')[1] || url
  let queryArr = queryStr ? queryStr.split('&') : []

  let args = {}
  queryArr.forEach((el) => {
    let key = decodeURIComponent(el.split('=')[0])
    let val = decodeURIComponent(el.split('=')[1])
    if (!(key in args)) {
      args[key] = val
    }
  })

  return args
}

/**
 * @description 处理车型配置数据
 * @param {Object} vInfo 车型详情
 */
export function formatGroupData(vInfo) {
  let groupVoList = ''
  vInfo.groupVoList.forEach((item, index) => {
    groupVoList += (item.configList && item.configList[0].featureName) + ' | '
    if (index > 1 && item.configList && item.configList.length > 1) {
      groupVoList += '...'
    }
  })
  return groupVoList.trim().slice(0, -1)
}

/**
 * 去掉double类型小数点后面多余的0
 * @param {*} old 要处理的字符串或double
 * @returns newStr 没有多余零的小数或字符串
 * 例： cutZero(123.000) -> 123
 */
export function cutZero(old) {
  // 拷贝一份 返回去掉零的新串
  let newstr = old
  // 循环变量 小数部分长度
  var leng = old.length - old.indexOf('.') - 1
  // 判断是否有效数
  if (old.indexOf('.') > -1) {
    // 循环小数部分
    for (let i = leng; i > 0; i--) {
      // 如果newstr末尾有0
      if (newstr.lastIndexOf('0') > -1 && newstr.substr(newstr.length - 1, 1) === 0) {
        var k = newstr.lastIndexOf('0')
        // 如果小数点后只有一个0 去掉小数点
        if (newstr.charAt(k - 1) === '.') {
          return newstr.substring(0, k - 1)
        } else {
          // 否则 去掉一个0
          newstr = newstr.substring(0, k)
        }
      } else {
        // 如果末尾没有0
        return newstr
      }
    }
  }
  return old
}

var floatCalc = function (x, y) {
  let a = `${x}`
  let b = `${y}`
  var aNum = a.indexOf('.')
  var bNum = b.indexOf('.')
  var aSum
  var bSum
  var resultNum
  var inta
  var intb

  aSum = aNum < 0 ? 0 : a.split('.')[1].length
  bSum = bNum < 0 ? 0 : b.split('.')[1].length
  resultNum = aSum > bSum ? aSum : bSum

  inta =
    aNum < 0
      ? Number(a + (Math.pow(10, resultNum) + '').replace('1', ''))
      : (function () {
        a = a.replace('.', '')
        a = resultNum === aSum ? a : a + (Math.pow(10, resultNum - aSum) + '').replace('1', '')
        return Number(a)
      })()

  intb =
    bNum < 0
      ? Number(b + (Math.pow(10, resultNum) + '').replace('1', ''))
      : (function () {
        b = b.replace('.', '')
        b = resultNum === bSum ? b : b + (Math.pow(10, resultNum - bSum) + '').replace('1', '')
        return Number(b)
      })()

  return {
    a: inta,
    b: intb,
    num: resultNum
  }
}
// 加法
Number.prototype.add = function (n) {
  var o = floatCalc(this, n)
  return (o.a + o.b) / Math.pow(10, o.num)
}
// 减法
Number.prototype.minus = function (n) {
  var o = floatCalc(this, n)
  return (o.a - o.b) / Math.pow(10, o.num)
}
// 乘法
Number.prototype.subtract = function (n) {
  var o = floatCalc(this, n)
  return (o.a * o.b) / Math.pow(10, o.num * 2)
}
// 除法
Number.prototype.divide = function (n) {
  var o = floatCalc(this, n)
  return o.a / o.b
}

/**
 * 根据关键字数组去重
 * @param {*} arr 原数组
 * @param {*} key 关键字
 * @returns
 */
export function unique(arr, key) {
  let hash = {}
  return arr.reduce((ss, item) => {
    hash[item[key]] ? '' : (hash[item[key]] = true && ss.push(item))
    return ss
  }, [])
}
