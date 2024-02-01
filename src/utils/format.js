//  处理时间
/* eslint-disable */
export const formatDate = (str, fmt = "yyyy-MM-dd hh:mm:ss") => {
  str = isNaN(str) ? str.replace(/-/g, "/") : str;
  const obj = new Date(str);
  const o = {
    "M+": obj.getMonth() + 1, // 月份
    "d+": obj.getDate(), // 日
    "h+": obj.getHours(), // 小时
    "m+": obj.getMinutes(), // 分
    "s+": obj.getSeconds(), // 秒
    "q+": Math.floor((obj.getMonth() + 3) / 3), // 季度
    S: obj.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (obj.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

//  处理电话号码
export const formatPhone = value => {
  if (value.length === "") {
    return "";
  }
  let sp = value.split("");
  let v = sp.map((item, index) => {
    if (index >= 3 && index < 7) {
      return "*";
    }
    return item;
  });
  return v.join("");
};
//  处理姓名
export const formatName = value => {
  if (value.length === "") {
    return "";
  }
  let sp = value.split("");
  let v = sp.map((item, index) => {
    if (index >= 1) {
      return "*";
    }
    return item;
  });
  return v.join("");
};
//  处理金额
export const  amountFormat = value=> {
  try {
    if (!value) return ''
    value = value.toString()
    if (value && value.includes(',')) return value
    let intPart = Number(value) - Number(value) % 1 // 获取整数部分（这里是windy93的方法）
    let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断

    let floatPart = '.00' // 预定义小数部分
    let value2Array = value.toString().split('.')

    // =2表示数据有小数位
    if (value2Array.length === 2) {
      floatPart = value2Array[1].toString() // 拿到小数部分
      if (floatPart.length === 1) { // 补0,实际上用不着
        return intPartFormat + '.' + floatPart + '0'
      } else {
        return intPartFormat + '.' + floatPart
      }
    } else {
      return intPartFormat
    }
  } catch (e) {
    console.log(e)
  }
}
