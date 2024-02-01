import { systemService } from '@/api/system'
import JSEncrypt from 'jsencrypt'

const {
  VITE_PRIVATE_KEY,
  VITE_PUBLIC_KEY,
  VITE_PLATFORM
} = import.meta.env

function setKey() {
  return new Promise((resolve, reject) => {
    // 新建JSEncrypt对象
    let encryptor = new JSEncrypt()
    // 设置公钥
    encryptor.setPublicKey(VITE_PUBLIC_KEY)
    // 进行RSA公钥加密
    let aesKey = encryptor.encrypt(VITE_PRIVATE_KEY)
    systemService
      .getSign({
        aesKey,
        platform: VITE_PLATFORM
      })
      .then((res) => {
        if (res.data.sign) {
          sessionStorage.setItem('signKey', res.data.sign)
          resolve(res.data.sign)
        } else {
          reject(new Error())
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default setKey
