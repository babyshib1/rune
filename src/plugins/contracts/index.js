import config from "./config"
import Web3 from "web3"
import Utils from "./utils"

import mp from './abis/mp'
import {getWalletObj, getWalletKey} from "@/hooks/api"

const w3 = new Web3()
config?.rpc && w3.setProvider(new Web3.providers.HttpProvider(config.rpc))
const contract = {}
if (config?.contracts) {
  for (let key in config.contracts) {
    contract[key] = new w3.eth.Contract(config.contracts[key]?.abi, config.contracts[key]?.address)
  }
}

function getGas(tx) {
  return new Promise(resolve => {
    w3.eth.estimateGas(tx).then(gas => {
      resolve(parseInt(Number(gas) * 1.5))
    }).catch(reason => {
      resolve(869302)
    })
  })
}

function tryCall(data) {
  return new Promise(resolve => {
    w3.eth.call(data).then(function () {
      resolve({
        status: true, msg: ""
      })
    }).catch(reason => {
      resolve({
        status: false,
        msg: String((reason.data ? reason.data.message : reason.message) || reason.toString()).replace("Error: Returned error:", "")
      })
    })
  })
}

async function sendTransition(address, params) {
  let tryDone = await tryCall(params)
  if (!tryDone.status) {
    return {
      status: false, msg: tryDone.msg, hash: null
    }
  }
  let d = {
    "id": 1, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params": [params], from: address
  }
  try {
    let key = getWalletKey()
    let res = await getWalletObj(key).request(d)
    return {
      status: true, msg: "success", hash: res
    }
  } catch (reason) {
    return {
      status: false,
      msg: String(reason.data ? reason.data.message : reason.message).replace("Error: Returned error:", "") || "error approve",
      hash: null
    }
  }
}

function tradeHash(hash) {
  return new Promise(resolve => {
    w3.eth.getTransactionReceipt(hash).then(resolve).catch(err => {
      resolve(null)
    })
  })
}

function defineReadProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    get() {
      return value
    }
  })
}

async function getChainId() {
  let id = 0
  try {
    let key = getWalletKey()
    id = Number(await getWalletObj(key).request({method: "eth_chainId"}))
  } catch (e) {
    console.log(e)
  }
  return id
}

export default function (app) {
  defineReadProperty(app.config.globalProperties, '$Config', config)
  defineReadProperty(app.config.globalProperties, '$web3', w3)
  defineReadProperty(app.config.globalProperties, '$Contract', contract)
  defineReadProperty(app.config.globalProperties, '$Utils', Utils)

  app.config.globalProperties.$sendTransition = function (to, data, value = 0) {
    let that = this

    async function r(resolve) {
      if (!that.$store.state.wallet.address) {
        resolve({
          status: false, msg: 'User not connected to Wallet'
        })
        return false
      }
      let address = that.$store.state.wallet.address || ""
      let params = {
        from: address, to: to, data: data
      }
      if (Number(value) > 0) {
        params.value = value
      }
      let gas = await getGas(params)
      params.gas = '0x' + Number(gas).toString(16)
      let chainID = await getChainId()
      if (chainID !== config.chainId) {
        resolve({
          status: false, msg: config.netErrorTxt || "Please switch to the main network", hash: null
        })
        return false
      }
      sendTransition(address, params).then(resolve)
    }

    return new Promise(r)
  }
  app.config.globalProperties.$statusByHash = function (hash) {
    async function r(resolve) {
      let res = await tradeHash(hash)
      if (res) {
        resolve(Number(res.status))
        return false
      }
      let time = null, done = false, index = 0, max = 60
      time = setInterval(async function () {
        if (index >= max) {
          resolve(0)
          clearInterval(time)
        } else {
          if (!done) {
            done = true
            index++
            let result = await tradeHash(hash)
            if (result) {
              resolve(Number(result.status))
              clearInterval(time)
              return false
            }
            done = false
          }
        }
      }, 2000)
    }

    return new Promise(r)
  }
  app.config.globalProperties.$getMpContract = function (addr) {
    return new w3.eth.Contract(mp, addr)
  }
  app.config.globalProperties.$isAddressZero = function (addr) {
    return addr === '0x0000000000000000000000000000000000000000'
  }
  app.config.globalProperties.$batchRequest = function (arr = []) {
    return new Promise(resolve => {
      if (!(arr?.length ?? 0)) {
        resolve([])
        return false
      }
      let batch = new w3.eth.BatchRequest(), done = 0, data = []
      arr.forEach((item, index) => {
        batch.add(item.call.request((err, res) => {
          data[index] = res
          done++
          if (done >= arr.length) {
            resolve(data)
          }
        }))

      })
      batch.execute()
    })
  }
}
