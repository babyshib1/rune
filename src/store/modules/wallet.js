import {ElMessage} from "element-plus"

const maxLen = 20

function getTicks() {
  let ticks = {}
  try {
    ticks = JSON.parse(window.localStorage.getItem('ticks') || "") || {}
  } catch (e) {
    ticks = {}
  }
  return ticks
}

const state = () => ({
  address: '', walletKey: '', isWhitelist: false, ticks: getTicks(), bnbToUsdt: "24619901700"
})


const getters = {
  address: state => state.address,
  walletKey: state => state.walletKey,
  ticks: state => state.ticks,
  bnbToUsdt: state => state.bnbToUsdt
}

const mutations = {
  setBnbToUsdt(state, price) {
    if (price) {
      state.bnbToUsdt = price
    }
  },
  setAddress(state, {address, key}) {
    state.address = address || ""
    state.walletKey = key || "ethereum"
    window.localStorage.setItem('adr', address)
    window.localStorage.setItem('wallet', key)
  }, changeTicks(state, val) {
    let vals = JSON.parse(JSON.stringify(state.ticks))
    if (vals[val]) {
      delete vals[val]
    } else {
      vals[val] = 1
    }
    if (Object.keys(vals).length > maxLen) {
      ElMessage.warning("The maximum collection of shopping cart is " + maxLen + " inscriptions")
      return false
    }
    state.ticks = vals
    window.localStorage.setItem('ticks', JSON.stringify(vals))
  }, clearTicks(state) {
    state.ticks = {}
    window.localStorage.setItem('ticks', JSON.stringify({}))
  }, checkTicks(state, data = {}) {
    state.ticks = data
    window.localStorage.setItem('ticks', JSON.stringify(data))
  }, clearTickId(state, id) {
    if (!id) {
      return false
    }
    if (state.ticks[id]) {
      delete state.ticks[id]
    }
    window.localStorage.setItem('ticks', JSON.stringify(state.ticks))
  }
}

export default {
  namespaced: true, state, mutations, getters
}
