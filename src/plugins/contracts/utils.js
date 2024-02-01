import gold from "@/assets/projects/gold.png"
import blue from "@/assets/projects/blue.png"

const first = "0x524efb4f670727f0806894c69f364b67c5a451a80758add8ef9b9488e1808379"
const idToSrc = {
  [first]: gold,
  "0xfaeced0a9f5b1599c396ab16a729af191ca276da0b938dcd802eb4f97be5e796": blue,
  gold: gold,
  blue: blue
}

export default {
  formatAddress(str = '', start = 4, end = 4, split = "*", splitNum = 3) {
    return str ? (str.slice(0, start) + split.padEnd(splitNum, split) + str.slice(-end)) : ""
  },
  formatNum(v, num = 8) {
    let reg = new RegExp("(\\d*\\.\\d{" + num + "}).*", "g")
    let s = String(v).replace(/[^\d.]/, "").replace(/\.+/g, ".").replace(reg, "$1")
    return s.split(".").splice(0, 2).join(".")
  },
  formatTemp(temp = '', format = 'y/m/d h:i:s') {
    if (!temp) {
      return ""
    }
    let D = new Date(temp * 1000)
    let data = {
      y: D.getFullYear(),
      m: D.getMonth() + 1,
      d: D.getDate(),
      h: D.getHours(),
      i: D.getMinutes(),
      s: D.getSeconds()
    }
    return format.replace(/[ymdhis]/g, (key) => {
      return (typeof data[key] !== 'undefined') ? String(data[key]).padStart(2, '0') : ''
    })
  },
  numPercent(num1, num2) {
    return Math.min(Number(Number(num1 * 100 / num2 || 0).toFixed(2)), 100) + '%'
  },
  splitNum(num, split = ",") {
    let nStrArr = String(num || "0").split(".")
    let arr = []
    let str = nStrArr[0].split('').reverse()
    for (let i = 0; i < str.length; i += 3) {
      let chunk = str.slice(i, i + 3).reverse().join('')
      arr.push(chunk)
    }
    nStrArr[0] = arr.reverse().join(split)
    return nStrArr.join(".")
  },
  rpZero(str) {
    let arr = String(str || "0").split(".")
    if (arr.length < 2) {
      return arr[0] || "0"
    }
    let data = arr[0]
    let s = String(arr[1] || "0").replace(/0+$/, "")
    if (s) {
      data += "." + s
    }
    return data
  },
  sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
  },
  getSrcById(id) {
    return idToSrc[String(id || "").toLowerCase()]
  },
  getIsOne(id) {
    return first === id
  },
  getFromUser(data = {}) {
    let user = ""
    switch ((data?.op ?? "").toLowerCase()) {
      case 'mint':
      case 'deploy':
        user = data.from_user || ""
        break
      case 'buy':
        user = data.buyer || ""
        break
      case 'sell':
      case 'cancel':
      case 'transfer':
        user = data.seller || ""
        break
    }
    return user
  },
  getToUser(data = {}) {
    let user = ""
    switch ((data?.op ?? "").toLowerCase()) {
      case 'mint':
      case 'deploy':
        user = data.to_user || ""
        break
      case 'buy':
        user = data.seller || ""
        break
      case 'sell':
      case 'cancel':
      case 'transfer':
        user = data.buyer || ""
        break
    }
    return user
  },
  async internal(cb, time = 0) {
    if (typeof cb === "function") {
      for (; ;) {
        if ((await cb()) === true) {
          break
        }
        await this.sleep(time)
      }
    }
  },
  orderDiv(total, lim) {
    return Math.max(Number(total || 0) - Number(lim || 0), 0)
  }
}
