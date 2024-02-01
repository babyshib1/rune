import { dictionaryService } from 'api/dictionaryService'
import DICTIONARY from '@/store/dicData'// 引入缓存的数据字典json

const SET_DICTIONARY = 'setDictionary'

const state = () => ({
  ...DICTIONARY
})

const mutations = {
  [SET_DICTIONARY](state, { key, value }) {
    console.log(state)
    state[key] = value
  }
}

const actions = {
  getDictionaryData({ state, commit }, { name, apiName = 'getDictionary', code }) {
    return new Promise((resolve, reject) => {
      let dict = state // 数据字典JSON
      let con = (Array.isArray(dict[name]) && dict[name].length > 0) || (dict[name] && (Object.keys(dict[name]).length > 0))
      if (con) { // 当缓存中存在时从缓存中拿数据
        resolve(dict[name])
        return false
      }

      dictionaryService[apiName](code || { 'version': code || 0 })
        .then(res => {
          if (res.code === 0) {
            commit('setDictionary', {
              key: name,
              value: res.data || []
            })
            resolve(res.data)// 第一个参数告诉调用处，数据字典请求成功
          } else {
            reject(new Error())
          }
        }).catch(err => {
          reject(err)
        })
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
