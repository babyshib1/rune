<template>
  <div class="etchCon">
    <page-header/>
    <div class="etchMiddle mw">
      <div class="backRow" @click="back">
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="24" height="24">
          <path
            d="M723.781818 986.414545c-11.915636 0-23.831273-4.538182-32.907636-13.637818L263.005091 544.907636c-18.176-18.176-18.176-47.639273 0-65.815272L690.874182 51.223273c18.176-18.176 47.639273-18.176 65.838545 0 18.176 18.176 18.176 47.639273 0 65.815272L361.751273 512l394.961454 394.961455c18.176 18.176 18.176 47.639273 0 65.838545-9.099636 9.076364-21.015273 13.614545-32.930909 13.614545z"
            fill="#ffffff"></path>
        </svg>
        <p>{{ titleTxt }}</p>
      </div>
      <div class="herder">
      </div>
      <div class="balanceSplit">
        <div class="balance">
          <div>
            <div title="click to select tick" class="select_btn" ref="buttonRef"
                 v-click-outside="onClickOutside">
              <div class="tick" v-if="activeTick&&activeTick.project_id">
                <span class="tick_txt">{{ activeTick.tick }}</span>
                <span class="erc20">{{ activeTick.p }}</span>
                <img v-if="$Utils.getSrcById(activeTick.project_id)"
                     :src="$Utils.getSrcById(activeTick.project_id)" style="width: 20px;height: 20px">
                <van-icon v-if="!route.query.id" name="arrow-down"/>
              </div>
              <div class="tick_all" v-else>All Ticks
                <van-icon name="arrow-down"/>
              </div>
            </div>
            <el-popover width="300" popper-class="pop_select_user" placement="right-start" ref="popoverRef"
                        :virtual-ref="buttonRef"
                        trigger="click" virtual-triggering>
              <div class="pop_select">
                <el-input placeholder="Enter the tick" v-model="tickKeyword">
                  <template #append>
                    <el-button :icon="elSearch" @click="getSelect(tickKeyword)"></el-button>
                  </template>
                </el-input>
                <div class="list">
                  <div class="tick_main" @click="checkList({id:0})">
                    <span class="tick" :class="{active:!selectId}">All Tick</span>
                  </div>
                  <div class="tick_main" v-for="item in selectList" :key="item.project_id" @click="checkList(item)">
                    <span class="tick" :class="{active:selectId==item.project_id}">{{ item.tick }}</span>
                    <span class="type">{{ item.p }}</span>
                    <img v-if="$Utils.getSrcById(item.project_id)"
                         :src="$Utils.getSrcById(item.project_id)" style="width: 20px;height: 20px">
                  </div>
                </div>
              </div>
            </el-popover>
          </div>
          <div>
            <span>Available balance:</span>
            <span class="num" style="margin-left: 10px;">{{ balance || 0 }}</span>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="result">
          <div class="num">Result: <span>{{ total }}</span>
            <van-icon name="replay" @click="getData"/>
          </div>
          <div class="type">
            <el-dropdown trigger="click" @command="setType">
              <div class="link">
                <span v-if="type=== 0">Not Sell</span>
                <span v-if="type=== 1">In Sell</span>
                <van-icon name="arrow-down"/>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="0">Not Sell</el-dropdown-item>
                  <el-dropdown-item :command="1">In Sell</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </div>
        </div>
        <div class="table">
          <div class="item" v-for="item in list" :key="item.id">
            <div class="main">
              <div class="top">
                <div class="tick">
                  <span>{{ item.tick }}</span>
                  <img v-if="$Utils.getSrcById(item.project_id)"
                       :src="$Utils.getSrcById(item.project_id)" style="width: 20px;height: 20px">
                  <van-icon v-else style="color: #17d417;" name="checked"/>
                </div>
                <div class="tag">
                  <el-tag type="info">{{ item.p }}</el-tag>
                  <el-tag type="info">{{ (item.op || "Mint").toLowerCase() }}
                  </el-tag>
                </div>
                <div v-if="item.status=='onSell'" class="num" title="tick unit price">
                  {{ $Utils.rpZero(calcTotal($Utils.orderDiv(item.order_amt, item.buy_amt), item.price)) || "0" }} BNB
                </div>
                <div v-else class="num">{{ $Utils.rpZero(item.balance || '0') }}</div>
              </div>
              <div class="bottom">
                <div>
                  <div class="row" v-if="item.status=='onSell'">
                    <div class="col_left">
                      <img style="width: 20px;margin-right: 8px;" src="@/assets/images/icon_bnb.png" alt="">
                      {{ $Utils.rpZero(calcPrice(item.price)) || "0" }}
                    </div>
                    <div class="col_right"><span style="color:#f7d558">{{ item.buy_lim }}</span> / {{ item.order_amt }}
                    </div>
                  </div>
                  <div class="row" v-else>
                    <div class="col_left">#</div>
                    <div class="col_right">you</div>
                  </div>
                </div>

                <el-button class="list_btn cancel" v-if="item.status=='onSell'" @click="cancelSell(item)">
                  Cancel List
                </el-button>
                <div v-else-if="item.balance>0" class="operation_btn">
                  <el-button class="list_btn" @click="showDialog(item)">List</el-button>
                  <el-button class="list_btn transfer" @click="showTransfer(item)">Transfer</el-button>
                </div>
                <div class="operation_btn" v-else>
                  <div class="op_txt">error logs</div>
                  <!--                  <div class="op_txt" v-if="item.status==4">Transfer in progress</div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="pageNum">
          <div class="MuiPagination-ul">
            <el-pagination hide-on-single-page background :page-size="size" v-model:current-page="page"
                           layout="prev, pager, next" :total="total"/>
          </div>
        </div>
      </div>
    </div>
    <el-dialog class="transferDialog" v-model="transferDialog" width="400px" :close-on-click-modal="false">
      <template #header>
        <div class="header"><span class="tick">{{ transferData.tick }}</span> <span
          class="p">{{ transferData.p }}</span> for
          transfer
        </div>
      </template>
      <div class="main">
        <div>
          <div class="erc20">
            <div class="top">
              <div class="tick">
                <span>{{ transferData.tick }}</span>

                <img v-if="$Utils.getSrcById(transferData.project_id)"
                     :src="$Utils.getSrcById(transferData.project_id)" style="width: 20px;height: 20px">
                <van-icon v-else style="color: #17d417;" name="checked"/>
              </div>
              <div class="tag">
                <el-tag type="info">{{ transferData.p }}</el-tag>
                <el-tag type="info">{{ (transferData.op || "Mint").toLowerCase() }}
                </el-tag>
              </div>
              <div class="num">{{ transferData.balance || 0 }}</div>
              <div class="bottom"></div>
            </div>

          </div>
          <div class="inp">
            <el-input spellcheck="false" v-model="toAmount" placeholder="Enter the amount"></el-input>
          </div>
          <div class="inp">
            <el-input spellcheck="false" v-model="toAddress">
              <template #prefix>TO:</template>
            </el-input>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="footer">
          <el-button class="btn_cancel" @click="transferDialog = false">Cancel</el-button>
          <el-button class="btn_listing" @click="send">Send</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog class="sellDialog" v-model="showListDialog" width="400px" :close-on-click-modal="false">
      <template #header>
        <div class="header">List <span class="tick">{{ activeData.tick }}</span> <span class="p">{{
            activeData.p
          }}</span> for
          sale
        </div>
      </template>
      <div class="main">
        <div>
          <div class="erc20">
            <div class="top">
              <div class="tick">
                <span>{{ activeData.tick }}</span>
                <img v-if="$Utils.getSrcById(activeData.project_id)"
                     :src="$Utils.getSrcById(activeData.project_id)" style="width: 20px;height: 20px">
                <van-icon v-else style="color: #17d417;" name="checked"/>

              </div>
              <div class="tag">
                <el-tag type="info">{{ activeData.p }}</el-tag>
                <el-tag type="info">{{ (activeData.op || "Mint").toLowerCase() }}
                </el-tag>
              </div>
              <div class="num">{{ activeData.balance || 0 }}</div>
              <div class="bottom">

              </div>
            </div>

          </div>
          <div class="inp">
            <el-input maxlength="12" v-model="amount" placeholder="Enter the sell amount"></el-input>
          </div>
          <div class="inp">
            <el-input maxlength="12" v-model="price" placeholder="Enter the unit price">
              <template #suffix>BNB</template>
            </el-input>
          </div>
          <div style="height:20px;color: #f56c6c;font-size: 14px;">
            <span v-if="Number(uTotal)>0 &&Number(uTotal)<10">Order total amount should be greater than $10</span>
          </div>
        </div>
        <div class="row">
          <div class="col">Unit price</div>
          <div class="col">{{ price || '0.00' }} BNB</div>
        </div>
        <div class="row">
          <div class="col"></div>
          <div class="col" style="font-size: 12px;color: #999">≈ ${{ unitUsdtPrice.toFixed(4) }}</div>
        </div>
        <div class="row">
          <div class="col">Service Fee</div>
          <div class="col">{{ sellFee / 100 }}%</div>
        </div>
        <!-- <div class="row">
          <div class="col">Creator Royalty</div>
          <div class="col">1%</div>
        </div> -->
        <!--        <div class="line"></div>-->
        <div class="row">
          <div class="col">Fee</div>
          <div class="col">{{ systemConfig.DEXFee || "0.00" }}BNB</div>
        </div>
        <div class="row">
          <div class="col"></div>
          <div class="col">≈ ${{ uTotal }}</div>
        </div>
      </div>
      <template #footer>
        <div class="footer">
          <el-button class="btn_cancel" @click="showListDialog = false">Cancel</el-button>
          <el-button class="btn_listing" @click="sell">Listing</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, getCurrentInstance, watch, computed, unref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {ElLoading, ElMessage, ClickOutside as vClickOutside} from 'element-plus'
import {Search as elSearch} from '@element-plus/icons-vue'
import {useStore} from 'vuex'
import {
  useApiTickList,
  useApiUserTokens,
  useConfigGet,
  useApiTokenDetail
} from "@/hooks/api"

const {proxy: that} = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const store = useStore()
const address = computed(() => store.state.wallet.address)
const id = route.query?.project_id || ""
const titleTxt = computed(() => id ? "My Bscscriptions" : "All Bscscriptions")

function back() {
  id ? router.push({name: 'detailToken', query: {project_id: id}}) : router.push({name: 'Marketplace'})
}

watch(address, () => {
  page.value = 1
  getData()
})
const buttonRef = ref()
const popoverRef = ref()
const tickKeyword = ref("")
watch(tickKeyword, () => tickKeyword.value = String(tickKeyword.value || "").trim())
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
const activeTick = ref({})

function checkList(item) {
  selectId.value = item.project_id
  activeTick.value = item
  unref(popoverRef).hide()
}

const {list: selectList, getData: getSelect} = useApiTickList()
const {getData, size, page, type, total, list, balance, id: selectId} = useApiUserTokens(id)
selectId.value = id

getSelect()
if (id) {
  let tokenInfo = useApiTokenDetail(id)
  watch(tokenInfo, () => {
    activeTick.value = tokenInfo.value
  })
}
getData()
getConfig()
const systemConfig = ref({})

async function getConfig() {
  let {data} = await useConfigGet()
  systemConfig.value = data
}

function setType(val) {
  type.value = val
  page.value = 1
}

async function cancelSell(data) {
  if (!(data.order_id && data.p && data.tick)) {
    return ElMessage.error("error data")
  }
  let loading = ElLoading.service({
    text: "Cancel Selling....",
    lock: true,
    background: 'rgba(0,0,0,0.5)'
  })
  await getConfig()
  if (!systemConfig.value.MasterReceiver) {
    ElMessage.error("Not Found config")
    return loading.close()
  }
  let abi = that.$web3.utils.utf8ToHex("data:," + JSON.stringify({
    "p": data.p,
    "op": "cancel",
    "tick": data.tick,
    "oid": data.order_id
  }))
  let res = await that.$sendTransition(systemConfig.value.MasterReceiver, abi)
  if (res.status) {
    await that.$statusByHash(res.hash)
    await that.$Utils.sleep(10000)
    getData()
    ElMessage.success("Cancel transition send success")
  } else {
    ElMessage.error(res.msg || "Cancel transition send fail")
  }
  loading.close()
}


const transferDialog = ref(false)
const transferData = ref({})
const toAddress = ref("")
const toAmount = ref("")
watch(toAddress, () => toAddress.value = String(toAddress.value || "").trim())
watch(toAmount, () => toAmount.value = String(toAmount.value || "").replace(/^0|\D/g, ""))

function showTransfer(data) {
  if (data.status >= 2) {
    return false
  }
  transferDialog.value = true
  toAddress.value = ""
  toAmount.value = ""
  transferData.value = data
}

async function send() {
  if (!(transferData.value.p && transferData.value.tick)) {
    return ElMessage.warning("error data")
  }
  if (!Number(toAmount.value || 0)) {
    return ElMessage.warning("Please enter the transfer amount")
  }
  if (Number(toAmount.value || 0) > Number(transferData.value.balance || 0)) {
    return ElMessage.warning("The transfer amount is greater than the balance")
  }
  if (!that.$web3.utils.isAddress(toAddress.value)) {
    return ElMessage.warning("Please enter the correct receiving address")
  }
  let loading = ElLoading.service({
    text: "Transfer....",
    lock: true,
    background: 'rgba(0,0,0,0.5)'
  })
  let abi = that.$web3.utils.utf8ToHex("data:," + JSON.stringify({
    "p": transferData.value.p,
    "op": "transfer",
    "tick": transferData.value.tick,
    "amt": String(toAmount.value)
  }))
  let res = await that.$sendTransition(toAddress.value, abi)
  if (res.status) {
    transferDialog.value = false
    await that.$statusByHash(res.hash)
    await that.$Utils.sleep(10000)
    getData()
    ElMessage.success("Transfer transition send success")
  } else {
    ElMessage.error(res.msg || "Transfer transition send fail")
  }
  loading.close()
}

const showListDialog = ref(false)
const activeData = ref({})
const price = ref("")
const amount = ref("")
const sellFee = ref(300)
const unitUsdtPrice = computed(() => {
  let BN = that.$web3.utils.BN
  let usdt = new BN(store.state.wallet.bnbToUsdt || "0")
  let unitPrice = new BN(that.$web3.utils.toWei(that.$Utils.formatNum(price.value) || "0", "gwei"))
  return Number(usdt.mul(unitPrice).toString()) / 1e17
})
const uTotal = computed(() => {
  let n = 0
  if (unitUsdtPrice.value && Number(amount.value || 0)) {
    n = Number(unitUsdtPrice.value * amount.value)
  }
  return n.toFixed(4)
})

function showDialog(data) {
  price.value = ''
  amount.value = ''
  showListDialog.value = true
  activeData.value = data
  getConfig()
}

watch(price, () => price.value = that.$Utils.formatNum(price.value))
watch(amount, () => amount.value = String(amount.value || "").replace(/^0|\D/g, ""))

async function sell() {
  if (!(activeData.value.p && activeData.value.tick)) {
    return false
  }
  if (!Number(amount.value || 0)) {
    return ElMessage.warning("Please enter the sell amount")
  }
  if (Number(amount.value || 0) > Number(activeData.value.balance || 0)) {
    return ElMessage.warning("The Selling amount is greater than the balance")
  }
  if (!Number(price.value || 0)) {
    return ElMessage.warning("Please enter the sell unit price")
  }
  console.log(unitUsdtPrice.value)
  if (Number(uTotal.value || 0) < 10) {
    return ElMessage.warning("Order total amount should be greater than $10")
  }
  let loading = ElLoading.service({
    text: "Selling....",
    lock: true,
    background: 'rgba(0,0,0,0.5)'
  })
  await getConfig()
  if (!systemConfig.value.MasterReceiver) {
    ElMessage.error("Not Found config")
    return loading.close()
  }
  let fee = that.$web3.utils.toWei(systemConfig.value.DEXFee || "0")
  console.log(JSON.stringify({
    "p": activeData.value.p,
    "op": "sell",
    "tick": activeData.value.tick,
    "amt": String(amount.value),
    "price": that.$web3.utils.toWei(price.value || "0")
  }))
  let abi = that.$web3.utils.utf8ToHex("data:," + JSON.stringify({
    "p": activeData.value.p,
    "op": "sell",
    "tick": activeData.value.tick,
    "amt": String(amount.value),
    "price": that.$web3.utils.toWei(price.value || "0")
  }))
  let res = await that.$sendTransition(systemConfig.value.MasterReceiver, abi, fee)
  if (res.status) {
    showListDialog.value = false
    await that.$statusByHash(res.hash)
    await that.$Utils.sleep(10000)
    getData()
    ElMessage.success("Transfer transition send success")
  } else {
    ElMessage.error(res.msg || "Transfer transition send fail")
  }
  loading.close()
}

function calcTotal(amount, price) {
  let bnPrice = new that.$web3.utils.BN(String(price || "0"))
  let bnAmount = new that.$web3.utils.BN(String(amount || "0"))
  return that.$web3.utils.fromWei(bnPrice.mul(bnAmount).toString())
}

function calcPrice(price) {
  return that.$web3.utils.fromWei(String(price || "0"))
}
</script>

<style scoped lang="scss">
.etchCon {
  position: relative;

  .etchMiddle {
    margin: 0 40px;
    padding-top: 100px;
    padding-bottom: 30px;

    .backRow {
      display: flex;
      width: 200px;
      align-items: center;
      color: white;
      padding: 0 0 15px;
      font-size: 14px;
      user-select: none;

      p {
        margin-left: 10px;
        color: #fff;
        font-size: 16px;
      }
    }

    .herder {
      display: flex;
      align-items: center;

      &::v-deep {
        .el-select {
          margin-right: 10px;

          &.is_active {
            .el-input__wrapper {
              box-shadow: 0 0 0 1px #ffc107 inset !important;
            }
          }
        }

        .el-input__wrapper {
          width: 140px;
          border-radius: 44px;
          padding: 0px 16px;
          box-sizing: border-box;
          cursor: pointer;
          font-size: 14px;
          background-color: transparent;
          color: #fff;

          .el-input__inner {
            text-align: center;
            color: #fff;
            font-size: 12px;
          }

          &.is-focus {
            box-shadow: 0 0 0 1px #ffc107 inset !important;
          }
        }

      }
    }

    .balanceSplit {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0;
      border-bottom: 1px solid rgba(238, 238, 238, 0.3);

      .merge_btn {

        font-size: 14px;
        padding: 5px 15px;
        user-select: none;
        cursor: pointer;
        background: #ffc107;
        color: #171A1F;
        border-radius: 15px;
      }

      .balance {
        font-size: 14px;
        color: #fff;
        display: flex;
        align-items: center;

        .select_btn {
          display: block;
          margin-right: 10px;
          user-select: none;
          cursor: pointer;

          i {
            margin-left: 5px;
          }

          .tick {
            display: flex;
            align-items: center;

            .tick_txt {
              font-size: 18px;
              color: #ffc107;
            }

            .erc20 {
              margin-left: 5px;
              border-radius: 5px;
              padding: 2px 8px;
              background: rgba(255, 255, 255, 0.1);
              color: rgb(255, 255, 255);
              font-size: 12px;
              display: inline-block;
              min-width: 40px;
              min-height: 20px;

            }
          }

        }

        .num {
          margin-right: 10px;
          color: #ffc107;
        }
      }

      .splitBtn {
        width: 60px;
        background: #ffc107;
      }
    }

    .list {
      padding-top: 20px;

      .result {
        font-size: 16px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .num {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .type {
          &::v-deep {
            .link {
              cursor: pointer;
              display: flex;
              width: 100px;
              color: white;

              span {
                text-align: right;
                display: block;
                width: 80px;
              }
            }
          }
        }

        span {
          display: block;
          min-width: 30px;
          padding: 0 10px;
        }
      }

      .table {
        padding: 20px 0 0;
        display: flex;
        flex-wrap: wrap;
        margin-left: -15px;
        margin-right: -15px;
        min-height: 400px;
        align-items: start;

        .item {
          width: 245px;
          padding: 10px;

          .main {
            width: 100%;
            //height: 100%;
            background: #202229;
            border-radius: 5px;
            border: 1px solid #2a2e3b;

            .top,
            .bottom {
              padding: 10px;
            }

            .top {
              //height: 180px;
              padding-bottom: 0;

              .tick {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 16px;
                color: #ffc107;

                span {
                  max-width: 80%;
                  display: block;
                  overflow: hidden;
                  white-space: nowrap;
                  flex: 1;
                  text-overflow: ellipsis;
                }
              }

              .tag {
                padding: 5px 0;

                .el-tag {
                  margin-right: 5px;
                  background-color: transparent;
                  color: #999;
                  border-color: #999;
                  height: auto;
                  padding: 2px 8px;
                  min-height: 19px;

                  &::v-deep {
                    span {
                      display: block;
                      transform: scale(0.8);
                    }
                  }
                }
              }

              .num {
                padding: 30px 0 60px;
                text-align: center;
                cursor: pointer;
                color: #ffc107;
                font-size: 20px;
                background: url("@/assets/images/k-line.png") bottom center/ 100% auto no-repeat;

                .bsc_price {
                  font-size: 12px;
                  color: #ffffff;
                  padding-top: 2px;
                }
              }
            }

            .bottom {
              .row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 12px;
                height: 20px;
                line-height: 20px;
                margin-bottom: 20px;

                .col_left {
                  display: flex;
                  align-items: center;
                }
              }

              color: white;
              //background-color: #2b2d34;

              .operation_btn {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .op_txt {
                  color: #b7b6b4;
                  font-size: 12px;
                  height: 32px;
                  line-height: 32px;
                  flex: 1;
                }
              }

              .list_btn {
                &:active, &:focus {
                  background-color: #ffc107;
                }

                flex: 1;
                background-color: #ffc107;
                color: #000;

                &.transfer {
                  background-color: #52b2f5;
                }

                &.split {
                  background-color: #95d475;
                }

                &.cancel {
                  background-color: #fff;
                  width: 100%;
                }
              }
            }

          }
        }
      }
    }

    .pageNum {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      .MuiPagination-ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 16px;

        &:deep {

          button,
          li {
            color: rgb(255, 255, 255);
            background: transparent;
            border: 0 none;
            border-radius: 4px;
            height: 30px;
            min-width: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 13px;

            &.is-active {
              background: #484d56;
              border: 1px solid #484d56;

            }
          }


        }
      }
    }

  }
}
</style>
<style lang="scss">
.sellDialog {
  background-color: #181a20;
  border-radius: 10px;

  .el-dialog__header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-right: 0;
  }

  .el-dialog__body {
    padding: 15px 20px;
  }

  .header {
    user-select: none;
    color: white;
    font-size: 16px;
    padding-bottom: 10px;

    .tick {
      color: #ffc107;
    }

    .p {
      border-radius: 5px;
      padding: 0 8px;
      background: rgba(255, 255, 255, 0.1);
      color: rgb(255, 255, 255);
      font-size: 12px;
      display: inline-block;
    }
  }

  .main {
    .erc20 {
      //width: 200px;
      margin: auto;
      background-color: #202229;
      border-radius: 5px;
      overflow: hidden;

      .top {
        padding: 20px 0 0;
        //height: 200px;
        .tick {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          color: #ffc107;
          padding: 0 20px;

          span {
            max-width: 80%;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            flex: 1;
            text-overflow: ellipsis;
          }
        }

        .tag {
          padding: 5px 20px;

          .el-tag {
            margin-right: 5px;
            background-color: transparent;
            color: #999;
            border-color: #999;
            height: auto;
            padding: 2px 8px;
            // min-height: 19px;

            &::v-deep {
              span {
                display: block;
                transform: scale(0.8);
              }
            }
          }
        }

        .num {
          padding: 15px 0;
          text-align: center;
          color: #ffc107;
          font-size: 20px;
        }

        .bottom {
          text-align: center;
          font-size: 12px;
          color: #fff;
          padding-bottom: 60px;
          //margin-bottom: -1px;
          background: url("@/assets/images/k-line.png") bottom center/ 100% auto no-repeat;
        }
      }
    }

    .inp {
      padding: 10px 0;

      .el-input__wrapper {
        background-color: #202229;
        // border-color: #202229;
        color: white;
        box-shadow: none;

        .el-input__inner {
          color: #fff;
        }
      }
    }

    .floorPrice {
      text-align: center;
      font-size: 12px;
      color: #999;
      padding-bottom: 20px;

      span {
        color: #fff;
      }

    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: white;
      padding: 5px 0;

      .col {
        .link {
          display: flex;
          align-items: center;
          color: white;

          .van-icon {
            margin-left: 10px;
          }
        }
      }
    }

    .line {
      margin: 10px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn_cancel {
      background-color: #2b2d34;
      border: 1px solid #2b2d34;
      width: 45%;
      color: #fff;
    }

    .btn_listing {
      background-color: #ffc107;
      border: 1px solid #ffc107;
      width: 45%;
      color: #000;
    }
  }
}

.transferDialog {
  .el-dialog__body {
    padding: 15px 20px;
  }

  background-color: #181a20;
  border-radius: 10px;

  .el-dialog__header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-right: 0;
  }

  .header {
    user-select: none;
    color: white;
    font-size: 16px;
    padding-bottom: 10px;

    .tick {
      color: #ffc107;
    }

    .p {
      border-radius: 5px;
      padding: 0 8px;
      background: rgba(255, 255, 255, 0.1);
      color: rgb(255, 255, 255);
      font-size: 12px;
      display: inline-block;
    }
  }

  .main {
    .erc20 {
      margin: auto;
      background-color: #202229;
      border-radius: 5px;
      overflow: hidden;

      .top {
        padding: 20px 0 0;
        //height: 200px;
        .tick {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          color: #ffc107;
          padding: 0 20px;

          span {
            max-width: 80%;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            flex: 1;
            text-overflow: ellipsis;
          }
        }

        .tag {
          padding: 5px 20px;

          .el-tag {
            margin-right: 5px;
            background-color: transparent;
            color: #999;
            border-color: #999;
            height: auto;
            padding: 2px 8px;
            // min-height: 19px;

            &::v-deep {
              span {
                display: block;
                transform: scale(0.8);
              }
            }
          }
        }

        .num {
          padding: 15px 0;
          text-align: center;
          color: #ffc107;
          font-size: 20px;

        }

        .bottom {
          text-align: center;
          font-size: 12px;
          color: #fff;
          padding-bottom: 60px;
          //margin-bottom: -1px;
          background: url("@/assets/images/k-line.png") bottom center/ 100% auto no-repeat;
        }
      }

    }

    .inp {
      padding: 10px 0 0;

      .el-input__wrapper {
        background-color: #202229;
        // border-color: #202229;
        color: white;
        box-shadow: none;

        .el-input__inner {
          color: #fff;
          font-size: 12px;
          padding-left: 10px;
        }
      }
    }
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn_cancel {
      background-color: #2b2d34;
      border: 1px solid #2b2d34;
      width: 45%;
      color: #fff;
    }

    .btn_listing {
      background-color: #ffc107;
      border: 1px solid #ffc107;
      width: 45%;
      color: #000;
    }
  }
}

.splitDialog {
  background-color: #313439;
  border-radius: 10px;

  .el-dialog__header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-right: 0;
  }

  .header {
    user-select: none;
    color: white;
    font-size: 16px;
    padding-bottom: 10px;

    .tick {
      color: #ffc107;
    }

    .p {
      border-radius: 5px;
      padding: 0 8px;
      background: rgba(255, 255, 255, 0.1);
      color: rgb(255, 255, 255);
      font-size: 12px;
      display: inline-block;
    }
  }

  .el-dialog__body {
    padding: 40px 40px 20px;
  }

  .main {
    .erc20 {
      width: 100%;
      margin: auto;
      background-color: #202229;
      border-radius: 5px;
      overflow: hidden;

      .top {
        padding: 20px;
        height: 160px;

        .tick {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          color: #ffc107;

          span {
            max-width: 80%;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            flex: 1;
            text-overflow: ellipsis;
          }
        }

        .tag {
          padding: 5px 0;

          .el-tag {
            margin-right: 5px;
            background-color: transparent;
            color: #999;
            border-color: #999;
            height: auto;
            padding: 2px 8px;
            // min-height: 19px;

            &::v-deep {
              span {
                display: block;
                transform: scale(0.8);
              }
            }
          }
        }

        .num {
          padding: 15px 0;
          text-align: center;
          color: #ffc107;
          font-size: 20px;
        }
      }

      .bottom {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        background-color: #2b2d34;
        color: #fff;
      }
    }

    .inp {
      padding: 30px 0 0;

      .el-input__wrapper {
        background-color: #202229;
        // border-color: #202229;
        color: white;
        box-shadow: none;

        .el-input__inner {
          color: #fff;
          font-size: 12px;

        }
      }
    }
  }

  .footer {
    .btn_cancel {
      background-color: transparent;
      border: 1px solid #fff;
      width: 60px;
      color: #fff;
    }

    .btn_listing {
      background-color: #ffc107;
      border: 1px solid #ffc107;
      width: 60px;
      color: #000;
    }
  }
}
</style>
<style lang="scss">
.pop_select_user {
  //background-color: #13161a!important;
  //border-color: #13161a!important;
  //.el-popper__arrow:before{
  //  background-color: #13161a!important;
  //}
  .pop_select {

    .list {
      margin: 10px 0 0;
      overflow: hidden auto;
      height: 200px;
      flex-wrap: wrap;
      user-select: none;
      cursor: default;

      .tick_main {
        border-top: 1px solid #eee;
        padding: 6px 0;
        display: flex;
        align-items: center;

        .tick {
          font-size: 15px;

          &.active {
            color: #ffc107;
          }
        }

        .type {
          margin-left: 5px;
          background-color: rgba(255, 255, 255, .1);
          color: #999;
          border-color: #999;
          height: auto;
          padding: 2px 8px;
          transform: scale(0.8);
          display: block;

        }
      }
    }
  }
}
</style>
