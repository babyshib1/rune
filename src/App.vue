<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive v-if="route.meta.keepAlive">
      <Component :is="Component" />
    </keep-alive>
    <Component v-else :is="Component" />
    <!--    <transition :name="transitionName">-->
    <!--      -->
    <!--    </transition>-->
    <page-footer />
  </router-view>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import defaultSetting from './settings'
import { ElLoading } from 'element-plus'

import { getWalletObj, getWalletKey } from "@/hooks/api"

const that = getCurrentInstance().proxy
const store = useStore()
const transitionName = computed(() => {
  return defaultSetting.needPageTrans ? store.state.direction.type : ''
})
let localAdr = window.localStorage.getItem('adr') || "",
  walletKey = getWalletKey()
if (!getWalletObj(walletKey)) {
  localAdr = ""
}
store.commit('wallet/setAddress', {
  address: localAdr,
  key: walletKey
})
let status = false, loading, reqs = false
setInterval(() => {
  if (store.state.wallet.address) {
    if (reqs) {
      return false
    }
    reqs = true
    if (!status) {
      status = true
      loading = ElLoading.service({
        text: "Waiting unlock wallet",
        lock: true,
        background: 'rgba(0,0,0,0.5)'
      })
    }
    let key = getWalletKey()
    getWalletObj(key).request({ method: "eth_requestAccounts" }).then(accounts => {
      store.commit('wallet/setAddress', {
        address: accounts?.[0],
        key: key
      })
      loading && loading.close()
      reqs = false
    }).catch(reason => {
      reqs = false
      loading && loading.close()
    })
  }
}, 1000)
const address = computed(() => store.state.wallet.address)
that.$Utils.internal(async function () {
  let price = 0
  try {
    price = await that.$Contract.BNBU.methods.latestAnswer().call()
  } catch (e) {

  }
  store.commit("wallet/setBnbToUsdt", price)
}, 60000)
</script>
<style lang="scss">
body {
  background: #171A1F;
}

.mw {
  max-width: 1240px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 25px;
  padding-right: 25px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background: url("@/assets/images/Background.png") center/1200px auto no-repeat;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  //-webkit-box-shadow: inset 0 0 6px #fff;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #ffc107;
  //-webkit-box-shadow: inset 0 0 6px #999;
}

//::-webkit-scrollbar-thumb:window-inactive {
//  background: #999;
//}
.el-slider__bar {
  background: #ffc107 !important
}

.el-slider__button {
  border-color: #ffc107 !important;
}
</style>
