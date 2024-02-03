import {computed, ref, watch} from "vue"
import axios from "axios"
import md5 from "md5"
import {useRoute, useRouter} from "vue-router"
import {useStore} from "vuex"

export const ajax = axios.create({
  baseURL: "https://api.bscs.market", responseType: 'json'
})
ajax.interceptors.request.use(function (config) {
  let adr = String(window.localStorage.getItem("adr") || "").toLowerCase()
  let time = new Date().getTime()
  let sign = md5((adr + time + config.method.toLowerCase()).split("").sort().join(""))
  config["headers"]['token'] = (adr ? (adr.replace(/^0x/, '') + "-") : "") + time + '-' + sign
  return config
})
export const useSignInfoGet = function () {
  return function getData(buyer, order_id, buy_amt) {
    return ajax({
      url: 'signBuy', method: "get", params: {
        buyer, order_id, buy_amt
      }
    }).then(result => result.data)
  }
}
export const useGetCart = function () {
  const store = useStore()
  const arr = computed(() => Object.keys(store.state.wallet.ticks))
  return function getData(list) {
    return new Promise(resolve => {
      let data = list ? list : arr.value
      if (!data.length) {
        return resolve([])
      }
      ajax({
        url: 'getOrders', method: "get", params: {
          order_ids: `["${data.join(`","`)}"]`
        }
      }).then(result => resolve(result.data))
    })
  }
}
export const useConfigGet = function () {
  return ajax({
    url: 'status', method: "get"
  }).then(result => result.data)
}
export const useApiTokens = function (size = 20) {
  const page = ref(1)
  const total = ref(0)
  const keyword = ref("")
  const list = ref([])

  function getData() {
    ajax({
      url: '/getProject', method: "get", params: {
        page: page.value, tick: keyword.value, size: size
      }
    }).then(res => {
      let result = res.data
      if (result.code === 200) {
        list.value = Array.isArray(result.data.list) ? result.data.list : []
        total.value = Number(result.data.total || 0) || 0
      }
    })
  }

  function pageChange(p) {
    page.value = p
    getData()
  }

  function search() {
    page.value = 1
    getData()
  }

  return {
    page, total, search, keyword, list, size, pageChange
  }
}
export const useApiTokenInfo = function (project_id) {
  const list = ref({})

  function getData() {
    ajax({
      url: 'getProjectDetail', method: "get", params: {
        project_id
      }
    }).then(res => {
      let result = res.data
      if (result.code === 200) {
        list.value = result.data || {}
      }
    })
  }

  getData()
  return list
}
export const useApiTokenHolders = function (project_id, size = 20) {
  const page = ref(1)
  const total = ref(0)
  const list = ref([])

  function getData() {
    ajax({
      url: 'getHolders', method: "get", params: {
        page: page.value, size: size, project_id
      }
    }).then(res => {
      let result = res.data
      if (result.code === 200) {
        list.value = Array.isArray(result.data.list) ? result.data.list : []
        total.value = Number(result.data.totalAmount || 0) || 0
      }
    })
  }

  getData()
  watch(page, getData)
  return {
    page, total, list, size
  }
}
export const useApiSearchTick = function () {
  function getData(project_id) {
    return new Promise(resolve => {
      ajax({
        url: 'getProjectDetail', method: "get", params: {
          project_id
        }
      }).then(res => {
        let result = res.data
        resolve(result)
      })
    })
  }

  return getData
}
export const useApiMarketList = function (size = 20) {
  const page = ref(1)
  const total = ref(0)
  const list = ref([])
  const keyword = ref("")

  function getData() {
    ajax({
      url: 'getMarket', method: "get", params: {
        page: page.value, size: size, tick: keyword.value
      }
    }).then(res => {
      let result = res.data
      if (result.code === 200) {
        list.value = (Array.isArray(result.data.list) ? result.data.list : [])
        total.value = Number(result.data.total || 0) || 0
      }
    })
  }

  return {
    page, total, list, size, getData, keyword
  }
}

export const useApiTokenTransfers = function (project_id, size = 20) {
  const page = ref(1)
  const total = ref(0)
  const list = ref([])

  function getData() {
    ajax({
      url: 'getLog', method: "get", params: {
        page: page.value, size: size, project_id
      }
    }).then(res => {
      let result = res.data
      if (result.code === 200) {
        list.value = Array.isArray(result.data.list) ? result.data.list : []
        total.value = Number(result.data.total || 0) || 0
        // page.value = Number(result.data.page || 1) || 1
      }
    })
  }

  getData()
  watch(page, getData)
  return {
    page, total, list, size
  }
}

export const useApiTickList = function () {
  const list = ref([])

  function getData(tick) {
    ajax({
      url: '/getProject', method: "get", params: {
        page: 1, tick: tick, size: 50
      }
    }).then(res => {
      let result = res.data
      if (result.code === 200) {
        list.value = Array.isArray(result?.data?.list) ? result.data.list : []
      }
    })
  }

  return {
    list, getData
  }
}

export const useApiTokenDetail = function (project_id) {
  const list = ref({})

  function getData() {
    ajax({
      url: 'getProjectDetail', method: "get", params: {
        project_id
      }
    }).then(res => {
      let result = res.data
      if (result.code === 200) {
        list.value = result.data || {}
      }
    })
  }

  getData()
  return list
}

export const useApiScriptionInfo = function (hash) {
  return ajax({
    url: 'getTransferLog', method: "get", params: {
      hash
    }
  }).then(res => res.data)
}


export const useApiUserTokens = function (i, size = 15, userAddress = "") {
  const page = ref(1)
  const total = ref(0)
  const type = ref(0)
  const list = ref([])
  const balance = ref(0)
  const id = ref(i || "")
  const status = ['hold', 'onSell']
  const store = useStore()

  function getData() {
    let totalKey = 'totalProjectAmount'
    let balanceKey = 'totalBRCAmount'
    if (type.value) {
      totalKey = 'totalOrderProjectAmount'
      balanceKey = 'totalOrderBRCAmount'
    }
    ajax({
      url: 'getUserBRC', method: "get", params: {
        page: page.value,
        size: size,
        project_id: id.value,
        status: status[type.value],
        userAddress: userAddress || store.state.wallet.address
      }
    }).then(res => {
      let result = res.data
      if (result.code === 200) {
        list.value = (Array.isArray(result.data.list) ? result.data.list : [])
        total.value = Number(result.data[totalKey] || 0) || 0
        balance.value = Number(result.data[balanceKey] || 0) || 0
      }
    })
  }

  watch([page, type, id], () => {
    getData()
  })
  return {
    page, total, list, size, type, getData, balance, id
  }
}


export const useApiDetailOrders = function (project_id, size = 20) {
  const page = ref(1)
  const total = ref(0)
  const sort = ref(1)
  const list = ref([])

  function getData() {
    ajax({
      url: 'getProjectOnSell', method: "get", params: {
        page: page.value, size: size, project_id, direct: sort.value
      }
    }).then(res => {
      let result = res.data
      if (result.code === 200) {
        list.value = Array.isArray(result.data.list) ? result.data.list : []
        total.value = Number(result.data.total || 0) || 0
      }
    })
  }

  watch([sort, page], (o, n) => {
    if (o[0] !== n[0]) {
      if (n[1] !== 1) {
        page.value = 1
      } else {
        getData()
      }
      return false
    }
    getData()
  })
  getData()
  return {
    page, total, list, size, sort, getData
  }
}


export const getWalletObj = function (key = "ethereum") {
  switch (key) {
    case "trustwallet":
      return window.trustwallet
    case "gatewallet":
      return window.gatewallet
    case "tokenpocket":
      return window.tokenpocket?.ethereum || window.tokenpocket || window.ethereum
  }
  return window.ethereum
}

export const getWalletKey = function () {
  return window.localStorage.getItem('wallet') || "ethereum"
}
