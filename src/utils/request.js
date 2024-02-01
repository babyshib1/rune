import axios from 'axios'
import { Toast } from 'vant'
import { getToken } from '@/utils/auth'
import cryptoFn from '@/utils/crypto'
import setKey from '@/utils/setKey'
import JSEncrypt from 'jsencrypt'
import { matchEnv } from '@/utils/rtEnvSelect'

const {
  VITE_BASE_API,
  VITE_PRIVATE_KEY,
  VITE_PUBLIC_KEY,
  VITE_PLATFORM
} = import.meta.env

/**
 * @function 请求body生成器
 * @param {*} datas 请求携带的数据
 */
function generateParam(datas) {
  const temp = datas ? JSON.stringify(datas) : ''
  const params = cryptoFn.encrypt(temp + '&' + new Date().getTime(), VITE_PRIVATE_KEY)
  return params
}

/**
 * @function 请求body封装
 * @param {*} params 请求入参
 * @param {*} params.noEncrypt 是否不启用加密
 * @returns
 */
function serviceFn(params) {
  if (!params.noEncrypt) {
    const data = generateParam(params.data)
    params.data = {
      req: data
    }
  }
  return service(params)
}

/**
 * @function 设置请求头
 * @param {*} config
 */
function setHeadersParams(config) {
  let encryptor = new JSEncrypt()
  // 设置公钥
  encryptor.setPublicKey(VITE_PUBLIC_KEY)
  // 进行RSA公钥加密
  let signData = encryptor.encrypt(sessionStorage.getItem('signKey'))
  config.headers['sign_encrypt'] = signData
  config.headers['platform'] = VITE_PLATFORM
}

// 请求拦截器
const requestInterceptors = async (config) => {
  if (config.url !== '/v2/sign/get') {
    if (!sessionStorage.getItem('signKey')) {
      await setKey()
    }
    setHeadersParams(config)
  }
  config.headers['Access-Token'] = getToken()
  return config
}

// 响应拦截器
const responseInterceptors = response => {
  let res = response.data
  if (res.resp) {
    res = cryptoFn.decrypt(res.resp, VITE_PRIVATE_KEY)
    res = JSON.parse(res)
    console.log('接口请求-----', {
      url: response.config.url,
      data: (JSON.parse(response.config.data)).req ? cryptoFn.decrypt((JSON.parse(response.config.data)).req, VITE_PRIVATE_KEY) : response.config.data,
      res: res
    })
  }

  if (res.code === 0 || res.code === 100) {
    return res
  }

  // 登录失效
  if (res.code === -11000 || res.code === 12018 || res.code === 20001) {
    Toast.fail({
      message: '登录失效',
      duration: 1.5 * 1000,
      onClose: () => {
        matchEnv({
          out_app: (env, b) => {
            wx.miniProgram.getEnv(res => {
              if (res.miniprogram) {
                wx.miniProgram.redirectTo({ url: '/pages/h5Login/h5Login' })
                return
              }
              console.log('登录失效')
            })
          },
          app_android: (env, b) => {
            b.login()
          },
          app_ios: (env, b) => {
            b.login.postMessage(true)
          }
        })
      }
    })
  }

  // 签名失效
  if (res.code === -10106) {
    setKey().then((res) => { })
  }

  return Promise.reject(res)
}


const service = axios.create({
  baseURL: VITE_BASE_API
  // withCredentials: true
  // timeout: 5000
})


service.interceptors.request.use(requestInterceptors, err => Promise.reject(err))
service.interceptors.response.use(responseInterceptors, err => Promise.reject(err))


export default serviceFn
