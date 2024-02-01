import FingerprintJS from '@fingerprintjs/fingerprintjs'

/**
 * @function 生成浏览器指纹
 */
export const initFingerprint = async () => {
  try {
    const fs = await FingerprintJS.load()
    const res = await fs.get()
    return res
  } catch (err) {
    console.log(err)
  }
}
