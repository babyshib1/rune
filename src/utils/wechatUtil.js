import store from '@/store'
import { wechatShareService } from '@/api/share'

export default {
  /* 初始化wxjsdk各种接口 */
  init(apiList = [], url) {
    console.log(store.getters, 'wxjsdk各种接口')
    // 需要使用的api列表
    return new Promise((resolve, reject) => {
      console.log({
        campaignId: 0,
        shareType: 0,
        shareUrl: store.getters.initLink
      })
      wechatShareService.share({
        campaignId: 0,
        shareType: 0,
        shareUrl: store.getters.initLink
      }).then(res => {
        if (res.code === 0) {
          console.log(res.data, '接口调用成功')
          wx.config({
            debug: false,
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: apiList
          })
          wx.ready(() => {
            console.log('wx-ready')
            resolve(wx)
          })
          wx.error(function (err) {
            console.log('wx-err', err)
            reject(err)
          })
        } else {
          console.log(res, 'reject')
          reject(res)
        }
      })
    })
  }
}
