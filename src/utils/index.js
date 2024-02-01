import { matchEnv } from 'utils/rtEnvSelect'
import { getQueryString } from '@/utils/tools'
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function validatePhoneNum(phone) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(phone)
}

/**
 * @description 登录 不同环境处理
 * @param {*} env 环境变量
 */
export const toLogin = () => {
  matchEnv({
    wx: () => {
      wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          // 点击跳转小程序页面
          wx.miniProgram.navigateTo({
            url: '/pages/h5Login/h5Login?activityCode=' + getQueryString('activityCode') + '&toUrl=/pages/activityDetail/activityDetail'
          })
        } else {
          console.log('wx浏览器-登录失效')
          openLink()
        }
      })
    },
    h5: () => {
      console.log('浏览器-登录失效')
      openLink()
    },
    app_ios: (env, bridge) => {
      bridge.login.postMessage(true)
    },
    app_android: (env, bridge) => {
      bridge.login()
    }
  })
}

/**
 * @function {打开app}
 */
export const openLink = () => {
  let params = 'https://appfile.dsmp.voyah.com.cn/apple-app-site-association/open?page=DFActivitiesDetailHViewController&activityCode='
  let activityCode = getQueryString('activityCode')
  console.log('跳转地址：', `${import.meta.VITE_APP_SHARE_API}?pageLink=${params}${activityCode}`)
  window.location.href = `${import.meta.VITE_APP_SHARE_API}?pageLink=${params}${activityCode}`
}
