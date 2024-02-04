<template>
  <div class="etchHead">
    <div class="main mw">
      <router-link :to="{ path: '/bscsMarket' }">
        <img src="@/assets/images/logo.png" alt="">
        <p>BS<span>C</span>S</p>
      </router-link>
      <div class="navigation">
        <router-link active-class="active-menu" :to="{ path: '/bscsMarket' }">Home</router-link>
        <router-link active-class="active-menu" :to="{ path: '/Tokens' }">Tokens</router-link>
        <router-link active-class="active-menu" :to="{ path: '/Marketplace' }">Marketplace</router-link>
        <!-- <router-link active-class="active-menu" :to="{ path: '/Runes' }">Runes</router-link> -->

        <!--                <router-link active-class="active-menu"-->
        <!--                             :to="{ path: '/Deploymint' }">Deploy-->
        <!--                </router-link>-->
      </div>
      <div>
        <div class="etchRight" v-show="!address" @click="connectDialog = true">Connect<span>Wallet</span></div>

        <el-dropdown popper-class="login_drop" v-show="address" trigger="click" @command="doneCommand">
          <div class="user_address">
            {{ $Utils.formatAddress(address) }}
            <span class="tag-read" ref="copyEl" :data-clipboard-text="address" @click="Copy"></span>
          </div>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="House" :command="1">All Bscscriptions</el-dropdown-item>
              <el-dropdown-item :icon="DocumentCopy" :command="2">Copy Address</el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton" :command="3">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div>
        <el-badge :hidden="tickLen === 0" :value="tickLen" type="warning">
          <cart-icon @click="showDialog"></cart-icon>
        </el-badge>
      </div>

      <div class="nav-icon" @click="showNavDialog">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f7d558"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 9.5H3M21 4.5H3M21 14.5H3M21 19.5H3" />
        </svg>
      </div>
    </div>


    <el-drawer append-to-body class="card_dialog" v-model="cardDialog" :show-close="false" direction="rtl" size="500">
      <div class="body">
        <div class="header">
          <div class="left">
            <div class="cart_num">Cart({{ tickLen }})</div>
            <div class="cart_clear" v-if="tickLen > 0" @click="clearTicks">Clear All</div>
          </div>
          <el-icon class="icon" @click="cardDialog = false">
            <ElClose />
          </el-icon>
        </div>
        <div v-if="tickLen === 0" class="empty">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="none">
            <path fill="#ffc107"
              d="M58 19.2H22c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4h20.72c-.96-1.92-1.52-4.12-1.52-6.4 0-7.96 6.44-14.4 14.4-14.4 2.32 0 4.48.52 6.4 1.52V23.2c0-2.2-1.8-4-4-4ZM43.4 37.28l-8.92 10.88-1.68-1.64v-.04.04l-1.68 1.64v-3.28l10.4-6.68L30 43.8 27 41v-.36l16.4-3.76v.4ZM54.8 30H25.2c-.68 0-1.2-.52-1.2-1.2 0-.68.52-1.2 1.2-1.2h29.6c.68 0 1.2.52 1.2 1.2 0 .68-.52 1.2-1.2 1.2ZM8 70c0 1.06 3.371 2.078 9.373 2.828C23.373 73.578 31.513 74 40 74c8.487 0 16.626-.421 22.627-1.172C68.63 72.078 72 71.061 72 70c0-1.06-3.371-2.078-9.373-2.828C56.627 66.422 48.487 66 40 66c-8.487 0-16.626.421-22.627 1.172C11.37 67.922 8 68.939 8 70Z"
              opacity="0.2"></path>
            <path fill="#ffc107"
              d="M69.12 59.84c0 .68.52 1.2 1.2 1.2.68 0 1.2-.52 1.2-1.2 0-.68-.52-1.2-1.2-1.2-.68 0-1.2.56-1.2 1.2ZM72.4 65c-1.52.4-1.84.72-2.2 2.2-.4-1.52-.72-1.84-2.2-2.2 1.48-.4 1.84-.72 2.2-2.2.36 1.48.68 1.84 2.2 2.2ZM12.6 16.04c-1.96.52-2.36.92-2.88 2.88-.52-1.96-.92-2.36-2.88-2.88 1.96-.52 2.36-.96 2.88-2.88.48 1.96.92 2.36 2.88 2.88Zm58.4-.08c-1.2.32-1.44.56-1.76 1.76-.32-1.2-.56-1.44-1.76-1.76 1.2-.32 1.44-.56 1.76-1.76.28 1.2.56 1.44 1.76 1.76ZM70.16 11c-3.12.8-3.76 1.48-4.6 4.6-.8-3.12-1.48-3.76-4.6-4.6 3.12-.8 3.76-1.48 4.6-4.6.8 3.08 1.48 3.76 4.6 4.6ZM55.6 68.4c-6.4 0-11.6-5.2-11.6-11.6 0-6.4 5.2-11.6 11.6-11.6 6.4 0 11.6 5.2 11.6 11.6 0 6.4-5.2 11.6-11.6 11.6Zm0-20.8c-5.08 0-9.2 4.12-9.2 9.2 0 5.08 4.12 9.2 9.2 9.2 5.08 0 9.2-4.12 9.2-9.2 0-5.08-4.12-9.2-9.2-9.2Z"
              opacity="0.5"></path>
            <path fill="#ffc107"
              d="M61.2 58h-5.6c-.68 0-1.2-.52-1.2-1.2v-5.6c0-.68.52-1.2 1.2-1.2.68 0 1.2.52 1.2 1.2v4.4h4.4c.68 0 1.2.52 1.2 1.2 0 .68-.52 1.2-1.2 1.2Z"
              opacity="0.5"></path>
            <path fill="#ffc107"
              d="M41.4 68.4H22c-5.08 0-9.2-4.12-9.2-9.2v-36c0-5.08 4.12-9.2 9.2-9.2h36c5.08 0 9.2 4.12 9.2 9.2v19.4c0 .68-.52 1.2-1.2 1.2-.68 0-1.2-.52-1.2-1.2V23.2c0-3.76-3.04-6.8-6.8-6.8H22c-3.76 0-6.8 3.04-6.8 6.8v36c0 3.76 3.04 6.8 6.8 6.8h19.4c.68 0 1.2.52 1.2 1.2 0 .68-.52 1.2-1.2 1.2Z"
              opacity="0.5"></path>
          </svg>
          <p class="txt">No items added to cart</p>
          <el-button class="btn" @click="doneCommand(4)" round>Explore Collections</el-button>
        </div>
        <div v-else class="table_main">
          <div class="table_wrap">
            <el-table :data="list">
              <el-table-column label="Items">
                <template #default="scope">
                  <div class="tick_item">
                    <div class="tick_icon">
                      <el-icon class="close" @click="delTick(scope.row.order_id)">
                        <ElClose />
                      </el-icon>
                    </div>
                    <div class="tick_txt">
                      <span class="tick_name">{{ scope.row.tick }}</span>
                      <span class="tick_type">{{ scope.row.p }}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="amount" width="100" label="Quantity"></el-table-column>
              <el-table-column label="Value" align="right" width="120">
                <template #default="scope">
                  <div v-if="scope.row.status === 'onSell'">
                    <span>{{ $Utils.rpZero(scope.row.price || "0") }} BNB</span>
                  </div>
                  <div v-else style="color: red">Unavailable</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="sum_pay">
            <div class="num">
              <div>Total Pay</div>
              <div>
                <img style="width: 20px;margin-right: 4px;" src="@/assets/images/icon_bnb.png" alt="">
                <span>{{ cartData.num }}</span>
              </div>
            </div>
            <!--            <el-button class="buy_batch" @click="buyBatch" round>Buy Now</el-button>-->
          </div>
        </div>
      </div>
    </el-drawer>
    <el-dialog append-to-body class="connect_dialog" v-model="connectDialog">
      <el-row :gutter="20" align="middle">
        <el-col :span="12">
          <div class="wallet_list">
            <div class="title">Connect Wallet</div>
            <div class="desc">
              Start by connecting with one of the wallets below.
              Be sure to store your private keys or seed phrase
              securely . Never share them with anyone.
            </div>
            <div class="list">
              <el-row align="middle">
                <el-col :span="8">
                  <div class="wallet_icon" @click="connect('metamask')">
                    <div class="icon_main">
                      <img src="@/assets/images/wallet_metamask.png" alt="">
                    </div>
                    <div class="txt">Metamask</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="wallet_icon" @click="connect()">
                    <div class="icon_main">
                      <img src="@/assets/images/wallet_injected.png" alt="">
                    </div>
                    <div class="txt">Injected</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="wallet_icon" @click="connect('trustwallet')">
                    <div class="icon_main">
                      <img src="@/assets/images/wallet_trust.png" alt="">
                    </div>
                    <div class="txt">Trust</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="wallet_icon" @click="connect('gatewallet')">
                    <div class="icon_main">
                      <img src="@/assets/images/wallet_gate.png" alt="">
                    </div>
                    <div class="txt">Gate Wallet</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="wallet_icon" @click="connect('tokenpocket')">
                    <div class="icon_main">
                      <img src="@/assets/images/wallet_tp.png" alt="">
                    </div>
                    <div class="txt">Token Pocket</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right_main">
            <div class="top_txt">Haven’t got a wallet yet?</div>
            <img class="icon" src="@/assets/images/connect_right_icon.png" alt="">
            <a class="btn" href="" target="_blank" style="visibility: hidden">
              <span>Learn How to Connect</span>
              <img src="@/assets/images/link_learn_icon.png" alt="">
            </a>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-drawer append-to-body class="card_dialog" v-model="navDialog" :show-close="false" direction="rtl">
      <div class="body">
        <div class="navDialog-box">
          <router-link to="/bscsMarket">Home</router-link>
          <router-link to="/Tokens">Tokens</router-link>
          <router-link to="/Marketplace">Marketplace</router-link>
          <!-- <router-link to="/Runes">Runes</router-link> -->
          <!-- <router-link to="/Deploymint">Deploy</router-link> -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { computed, getCurrentInstance, ref, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import CartIcon from "@/components/CartIcon.vue"
import { Close as ElClose } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"
import Clipboard from "clipboard"

import { DocumentCopy, House, SwitchButton } from "@element-plus/icons-vue"
import { useGetCart, useSignInfoGet, getWalletObj } from "@/hooks/api"

const that = getCurrentInstance().proxy
const router = useRouter()
const store = useStore()
const { address } = toRefs(store.state.wallet)
const tickLen = computed(() => Object.keys(store.state.wallet.ticks).length)
const copyEl = ref(null)
const connectDialog = ref(false)
const navDialog = ref(false)
watch(address, () => {
  if (address.value) {
    connectDialog.value = false
  }
})

const showNavDialog = () => {
  navDialog.value = true
}

const walletLink = {
  metamask: "https://metamask.io/",
  trustwallet: "https://trustwallet.com/",
  gatewallet: "https://chromewebstore.google.com/detail/gate-wallet/cpmkedoipcpimgecpmgpldfpohjplkpp",
  tokenpocket: "https://www.tokenpocket.pro/"
}

async function connect(type) {
  let key = type
  if (!key) {
    // eslint-disable-next-line no-param-reassign
    key = "ethereum"
  }
  let walletObj = getWalletObj(key)
  if (!walletObj) {
    connectDialog.value = false
    if (type) {
      ElMessageBox.confirm("Not found the " + key + " connect plugins", "Connect Wallet", {
        type: "warning",
        cancelButtonText: "close",
        confirmButtonText: "download",
        customClass: "wallet_download",
        closeOnClickModal: false,
        showClose: false
      }).then(res => {
        if (walletLink[key]) {
          window.open(walletLink[key])
        }
      }).catch(reason => {
      })
    } else {
      ElMessage.warning("Not found the wallet connect plugins")
    }
    return false
  }
  let address = ''
  let loading = ElLoading.service({
    lock: true,
    text: 'Wallet connecting ...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  try {
    let accounts = await walletObj.request({ method: "eth_requestAccounts" })
    address = accounts?.[0]
    connectDialog.value = false
  } catch (e) {
    ElMessage.warning(e?.message || JSON.stringify(e))
  }
  loading.close()
  store.commit('wallet/setAddress', { address, key: key })
}

function Copy() {
  let clipboard = new Clipboard(".tag-read", {
    text(elem) {
      return address.value
    }
  })
  clipboard.on('success', function (e) {
    ElMessage.success("Copy Address Success")
    clipboard.destroy()
  })
  // 复制失败事件
  clipboard.on('error', function (e) {
    ElMessage.warning("Copy Address Fail")
    clipboard.destroy()
  })
}

const list = ref([])
const cardDialog = ref(false)
const getCard = useGetCart()
const BN = that.$web3.utils.BN,
  toWei = that.$web3.utils.toWei,
  fromWei = that.$web3.utils.fromWei

async function getList() {
  let result = await getCard()
  let data = {}
  list.value = (result.data || []).map(item => {
    data[String(item.order_id)] = 1
    let amount = "" + Math.max(Number(item.order_amt || 0) - Number(item.buy_lim), 0),
      price = new BN(String(item.price))
    item.price = fromWei((new BN(amount).mul(price)).toString())
    item.amount = amount
    return item
  })
  store.commit("wallet/checkTicks", data)
}

function clearTicks(data) {
  store.commit("wallet/clearTicks")
  list.value = []
}

function delTick(id) {
  store.commit("wallet/clearTickId", id)
  getList()
}

async function showDialog() {
  cardDialog.value = true
  await getList()
}

function doneCommand(val) {
  switch (val) {
    case 3:
      store.commit('wallet/setAddress', { address: "", key: "" })
      break
    case 1:
      router.push({ name: 'MyEthscriptions' })
      break
    case 2:
      copyEl.value?.click()
      break
    case 4:
      router.push({ name: 'Marketplace' })
      cardDialog.value = false
      break
  }
}


const cartData = computed(() => {
  let num = new BN("0"), orders = {}
  list.value.forEach(item => {
    if (item.status === 'onSell') {
      let n = new BN(toWei(String(item.price) || "0"))
      num = num.add(n)
      orders[item.order_id] = item.amount
    }
  })
  return {
    num: that.$Utils.rpZero(fromWei(num.toString())),
    orders: orders
  }
})
const getSignInfo = useSignInfoGet()

async function buyBatch() {
  if (!address.value) {
    return ElMessage.warning("Please connect the wallet first")
  }
  if (Number(cartData.value.num) <= 0) {
    return false
  }
  let loading = ElLoading.service({
    text: "Buy transition....",
    lock: true, background: 'rgba(0,0,0,0.5)'
  })
  await getList()
  let orders = cartData.value.orders
  let keys = Object.keys(orders)
  if (!keys.length) {
    loading.close()
    return ElMessage.warning("No ticks available for purchase")
  }
  let signDatas = await Promise.all(keys.map(key => {
    return getSignInfo(address.value, key, orders[key])
  }))
  let bnb = new BN("0"), errMsg = ""
  let ords = [], pids = [], prices = [], sells = [], deadlines = [], signs = [], buyAmts = [], orderAmts = []

  for (let i = 0; i < signDatas.length; i++) {
    let { data, code, msg } = signDatas[i]
    if (code !== 200) {
      errMsg = msg
      break
    }
    ords.push(data.order_id)
    pids.push(data.project_id)
    prices.push(data.price)
    buyAmts.push(data.buy_amt)
    orderAmts.push(data.order_amt)
    deadlines.push(data.deadline)
    sells.push(data.seller)
    signs.push(data.signature)
    bnb = bnb.add(new BN(data.price))
  }
  if (!ords.length) {
    loading.close()
    return ElMessage.warning(errMsg || "No ticks available for purchase")
  }

  let abi = that.$Contract.control.methods.batchBuy(ords, pids, orderAmts, buyAmts, prices, sells, deadlines, signs).encodeABI()
  let res = await that.$sendTransition(that.$Contract.control._address, abi, bnb.toString())
  if (res.status) {
    await that.$statusByHash(res.hash)
    await that.$Utils.sleep(10000)
    clearTicks()
    ElMessage.success("Purchase transaction initiated")
  } else {
    ElMessage.error(res.msg || "buy fail")
  }
  loading.close()
}


</script>
<style lang="scss" scoped>
.etchHead {
  border-bottom: 1px solid #3f3c3b;
  width: 100vw;
  height: 54px;
  background: #000000;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 100;
  overflow-x: auto;
  overflow-y: hidden;

  .main {
    height: 100%;
    min-width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      margin-left: 20px;

      img {
        width: 35px;
        height: 35px;
      }

      p {
        font-size: 16px;
        font-weight: bold;
        color: #fff;

        span {
          color: #ffc107;
        }
      }
    }

    .navigation {
      width: 100%;
      display: flex;
      padding-left: 20px;
      align-items: center;
      //justify-content: center;

      a {
        font-size: 15px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        text-decoration: none;
        padding: 2px 0;
        display: block;
        position: relative;

        &:before {
          display: block;
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
        }
      }

      .active-menu {
        color: #ffc107;

        &:before {
          background-color: #ffc107;
        }
      }
    }

    .user_address {
      color: #ffffff;
      font-size: 14px;
      margin-right: 10px;
      cursor: pointer;
    }

    .etchRight {
      margin-right: 10px;
      background: #ffc107;
      color: #171A1F;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      padding: 0 8px;
      height: 30px;
      line-height: 30px;
      width: 142px;
      transition: all 0.5s;
      cursor: pointer;

      span {
        margin-left: 4px;
      }
    }

    .etchRight:hover {
      transform: scale(1.1)
    }
  }

  .nav-icon {
    margin-top: 5px;
    display: none;
  }


  @media (max-width: 768px) {
    .main {
      min-width: 0;
      padding: 0 10px;
    }

    .navigation {
      display: none !important;
    }

    .nav-icon {
      display: block;
    }
  }

}

.navDialog-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  font-size: 14px;

  a {
    color: #fff;
    margin-top: 10px;
  }
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>

<style lang="scss">
.el-dropdown__popper.login_drop.el-popper {
  background-color: #202229;
  border-color: #202229;

  .el-dropdown-menu {
    background-color: #202229;

    .el-dropdown-menu__item {
      color: #ffffff;
      font-size: 12px;

      &:hover,
      &:focus {
        background-color: rgba(255, 255, 255, 0.08);
      }
    }
  }
}

.el-drawer.card_dialog.rtl {
  top: 55px;
  height: auto;
  background-color: #13161a;
  color: #ffffff;

  .el-drawer__header {
    display: none;
  }

  .el-drawer__body {
    overflow: hidden;
    padding: 0;
  }

  .body {
    padding: 20px 0 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      width: 100%;
      font-size: 12px;
      align-items: center;
      padding: 0 10px 20px;
      user-select: none;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;

        .cart_clear {
          margin-left: 10px;
          color: #ffc107;
          cursor: pointer;
        }
      }

      .icon {
        font-size: 28px;
        padding: 6px;
        color: #ffffff;
      }
    }

    .empty {
      padding-top: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        font-weight: 400;
        font-size: 12px;
        line-height: 1.5;
      }

      .btn {
        user-select: none;
        font-size: 12px;
        padding: 0;
        border: 1px solid #f7d558;
        color: #f7d558;
        border-radius: 15px;
        text-align: center;
        width: 150px;
        background-color: transparent;
        margin-top: 15px;
        height: 24px;

        &:hover {
          color: #000;
          background-color: #f7d558;
        }
      }
    }

    .table_main {
      width: 100%;
      flex: 1;
      overflow: hidden auto;


      .table_wrap {
        padding: 0 10px 20px;

        .el-table {
          background-color: transparent;

          .el-table__cell {
            background-color: transparent;
          }

          .el-table__inner-wrapper:before {
            display: none;
          }

          tr {
            font-size: 12px;
            background-color: transparent;

            td,
            th {
              line-height: 1;
              border: 0 none;

              .cell {
                color: #ffffff;
                padding: 0 4px;
              }
            }

            th {
              .cell {
                color: rgba(255, 255, 255, 0.73);
              }
            }
          }
        }

        .tick_item {
          position: relative;
          padding-left: 35px;
          line-height: 1.2;

          .tick_icon {
            width: 25px;
            height: 25px;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 9;
            margin: auto;
            background: url("@/assets/images/bscs.jpg") center/125% 125% no-repeat;

            .close {
              position: absolute;
              top: -4px;
              right: -4px;
              z-index: 9;
              background-color: #585959;
              width: 14px;
              height: 14px;
              padding: 3px;
              border-radius: 50%;
            }
          }

          .tick_txt {
            .tick_name {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 16px;
              display: block;
              width: 95%;
            }

            .tick_type {
              margin-left: 5px;
              font-size: 12px;
              color: rgb(143, 139, 139);
            }
          }
        }


      }

      .sum_pay {
        padding: 20px;
        background: rgb(32, 34, 41);

        .num {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          font-size: 14px;
          color: #ffc107;

          &>div {
            display: flex;
            align-items: center;
          }
        }

        .buy_batch {
          user-select: none;
          font-size: 12px;
          padding: 0;
          border: 1px solid #f7d558;
          color: #f7d558;
          border-radius: 15px;
          text-align: center;
          width: 100%;
          background-color: transparent;
          height: 32px;

          &:hover {
            color: #000;
            background-color: #f7d558;
          }
        }
      }
    }
  }
}


.el-overlay .connect_dialog {
  width: 700px;
  background-color: #0F1014;
  border: 1px solid #000000;
  border-radius: 10px;

  .el-dialog__header {
    display: none;

  }

  .el-dialog__body {
    padding: 0;

    .wallet_list {
      height: 400px;
      display: flex;
      flex-direction: column;

      .title {
        color: #ffffff;
        font-size: 16px;
        padding: 30px 20px 15px;
      }

      .desc {
        font-size: 12px;
        padding: 0 20px;
        color: #ffffff;
        line-height: 1.5;
      }

      .list {
        width: 100%;
        flex: 1;
        overflow: hidden auto;
        padding: 20px;

        .wallet_icon {
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin-top: 30px;

          .icon_main {
            width: 50px;
            height: 50px;
            padding: 10px;
            background-color: #1D1F28;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;

            img {
              max-width: 100%;
              max-height: 100%;
              display: block;
            }
          }

          .txt {
            font-size: 10px;
            text-align: center;
            color: #ffffff;
            padding-top: 10px;
          }
        }
      }
    }

    .right_main {
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: url("@/assets/images/connect_right_bg.png") center /80% auto no-repeat;

      .top_txt {
        font-size: 14px;
        color: white;
      }

      .icon {
        width: 150px;
        margin: 40px auto;
      }

      .btn {
        width: 200px;
        height: 32px;
        background: #FFC107;
        border-radius: 7px;

        display: flex;
        align-items: center;
        justify-content: center;

        span {
          color: #000000;
          font-size: 12px;
          margin-right: 5px;
          font-weight: bolder;
        }

        img {
          width: 12px;
        }
      }
    }
  }
}

.el-message-box.wallet_download {
  background-color: #0F1014;
  border: 1px solid #000000;

  .el-message-box__title {
    color: #ffffff;
  }

  .el-message-box__message {
    color: #ffffff;
  }

  .el-button.el-button--primary {
    background-color: #ffc107;
    border-color: #ffc107;

    &:focus-visible {
      outline: #f7d558;
    }
  }
}
</style>
