import { getCookieVal } from '@/utils/auth'

const CDP_LINKFLOW = {
  initCDPIdentify(params) {
    if (getCookieVal('userId')) {
      window?.linkflow?.identify({
        externalId: getCookieVal('userId') || 0,
        name: getCookieVal('userName') || '',
        mobilePhone: getCookieVal('userPhone') || '',
        ...params
      },
        () => {
          console.log('identify成功')
        },
        () => {
          console.log('identify失败')
        }
      )
    }
  },
  cdpSendEvent(funcName, params) {
    let data = {}
    data[funcName] = {
      user_id: getCookieVal('userId') || 0,
      user_mobile: getCookieVal('userPhone') || '',
      user_nickname: getCookieVal('userName') || '',
      source: 'appletsh5',
      ...params
    }
    console.log(data)
    window?.linkflow?.sendEvent(data,
      () => {
        console.log('埋点成功')
      },
      () => {
        console.log('埋点失败')
      }
    )
  }
}
export default CDP_LINKFLOW
