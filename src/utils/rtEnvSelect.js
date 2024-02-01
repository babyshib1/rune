import UAParser from 'ua-parser-js'

/* app ios UA样式
Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 dsmp_voyah_ios */

/* app 安卓 UA样式
Mozilla/5.0 (Linux; Android 10; MIX 3 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.101 Mobile Safari/537.36 dsmp_voyah_android */

/**
 * @returns {{app_android: boolean, wx: boolean, android: boolean, ios: boolean, app_ios: boolean}}
 */
export function getPhoneEnv() {
  var parser = new UAParser()
  let browser = parser.getBrowser()
  let os = parser.getOS()
  let ua = parser.getUA()
  // 可能多个为true,ios在mac上会是true
  let result = {
    ios: os.name === 'iOS',
    android: os.name === 'Android',
    wx: browser.name === 'WeChat',
    app_android: ua.indexOf('dsmp_voyah_android') > -1,
    app_ios: ua.indexOf('dsmp_voyah_ios') > -1,
    h5: true
  }
  if (result.app_android || result.app_ios || result.wx) {
    result.h5 = false
  }
  // console.log("UAParser", parser.getResult(), result);
  return result
}

let env = getPhoneEnv()

function noop() { }

/**
 * @namespace matchEnvObject
 * @property {function} app_ios   在ios会调用这个
 * @property {function} h5   在h5中调用这个
 * @property {function} app_android  在安卓会调用这个
 * @property {function} app  在app中会调这个  env,安卓bridge或null, ios bridge或null
 * @property {function} wx  在app中会调这个  env,安卓bridge或null, ios bridge或null
 */
/**
 * @param {matchEnvObject} t
 */
export function matchEnv(t) {
  let target = Object.assign(
    {},
    {
      app_ios: noop,
      app_android: noop,
      app: noop,
      wx: noop,
      h5: noop
    },
    t
  )
  try {
    // window.android.方法名(参数 有就传 没有就不传)   安卓
    // window.webkit.messageHandlers.方法名.postMessage({})   ios 空参数也要穿个空对象{}
    if (env.app_android) {
      let bridge = window.android
      target.app_android(env, bridge)
      target.app(env, bridge, null)
    } else if (env.app_ios) {
      let bridge = window.webkit && window.webkit.messageHandlers
      target.app_ios(env, bridge)
      target.app(env, null, bridge)
    } else if (env.wx) {
      target.wx(env)
    } else if (env.h5) {
      target.h5(env)
    }
  } catch (e) {
    console.warn(e)
  }
}

export default env
