<template>
  <div class="searchCoin">
    <page-header/>
    <div class="etchMiddle mw">
      <div class="backRow" @click="back">
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="24" height="24">
          <path
            d="M723.781818 986.414545c-11.915636 0-23.831273-4.538182-32.907636-13.637818L263.005091 544.907636c-18.176-18.176-18.176-47.639273 0-65.815272L690.874182 51.223273c18.176-18.176 47.639273-18.176 65.838545 0 18.176 18.176 18.176 47.639273 0 65.815272L361.751273 512l394.961454 394.961455c18.176 18.176 18.176 47.639273 0 65.838545-9.099636 9.076364-21.015273 13.614545-32.930909 13.614545z"
            fill="#ffffff"></path>
        </svg>
        <p>{{ userAddress }}</p>
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
            <el-popover width="300" popper-class="other_select_user" placement="right-start" ref="popoverRef"
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
            <div class="tableList" v-if="item.status==='onSell'">
              <div class="img">
                <p>{{ item.tick }}</p>
                <img v-if="$Utils.getSrcById(item.project_id)"
                     :src="$Utils.getSrcById(item.project_id)" style="width: 20px;height: 20px">
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                  <g clip-path="url(#swoosh-icon-green_svg__a)" opacity="0.65">
                    <path fill="#4EFCC7"
                          d="M8 14.667A6.667 6.667 0 1 0 8 1.334a6.667 6.667 0 0 0 0 13.333ZM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Z">
                    </path>
                    <path stroke="#4EFCC7" stroke-width="1.3" d="m5 8 2.5 2.5L12 6"></path>
                  </g>
                  <defs>
                    <clipPath id="swoosh-icon-green_svg__a">
                      <path fill="#4EFCC7" d="M0 0h16v16H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="typeList">
                <p>{{ item.p }}</p>
                <p>{{ (item.op || "Mint").toLowerCase() }}</p>
              </div>
              <div class="priceType">
                <p>{{ $Utils.orderDiv(item.order_amt, item.buy_lim) }}</p>
                <div class="bsc_price">{{ $Utils.rpZero(calcPrice(item.price)) }} BNB / {{ item.tick }}</div>
                <div class="bsc_price" style="font-size: 15px;color:#999">≈ ${{ calcUPrice(item.price) }}</div>
              </div>
              <div class="lianEtch">
                <p style="display:flex;align-items: center">
                  <img style="width: 20px;margin-right: 8px;" src="@/assets/images/icon_bnb.png" alt="">
                  {{ $Utils.rpZero(calcTotal($Utils.orderDiv(item.order_amt, item.buy_lim), item.price)) || "0" }}
                </p>
                <!--            <p>{{ item.buy_lim }}/{{ item.order_amt }}</p>-->
                <p>{{ $Utils.formatAddress(item.seller) }}</p>
              </div>
              <div class="lianEtch">

                <p>${{ calcTotalU($Utils.orderDiv(item.order_amt, item.buy_lim), item.price) }}</p>
                <p>
                  <el-tooltip placement="top" :content="item.order_id">
                    <a target="_blank" :href="$Config.browser+'/tx/'+item.hash"
                       style="display: flex;align-items: center;color: #ffffff">#{{ item.blockNumber }}
                      <img style="width:14px;margin-left: 4px;" src="@/assets/images/link_icon.png" alt=""></a>
                  </el-tooltip>
                </p>
              </div>
              <div class="btl_list">
                <div class="buy" @click="showBuyDialog(item)">Buy</div>
                <cart-icon :active="!!ticks[item.order_id]"
                           @click="store.commit('wallet/changeTicks',item.order_id)"></cart-icon>
              </div>

            </div>
            <div class="main" v-else>
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
                <div class="num">{{ $Utils.rpZero(item.balance || '0') }}</div>
              </div>
              <div class="bottom">
                <div class="row">
                  <div class="col_left">#</div>
                  <div class="col_right">{{ $Utils.formatAddress(item.user) }}</div>
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
    <el-dialog class="searchBuyDialog" v-model="buyDialog" width="400px" :close-on-click-modal="false">
      <template #header>
        <div class="header">Buy <span class="tick">{{ buyData.tick }}</span> <span class="p">{{
            buyData.p
          }}</span> for
          buy
        </div>
      </template>
      <div class="main">
        <div>
          <div class="erc20">
            <div class="top">
              <div class="tick">
                <span>{{ buyData.tick }}</span>
                <img v-if="$Utils.getSrcById(buyData.project_id)"
                     :src="$Utils.getSrcById(buyData.project_id)" style="width: 20px;height: 20px">
                <van-icon v-else style="color: #17d417;" name="checked"/>

              </div>
              <div class="tag">
                <el-tag type="info">{{ buyData.p }}</el-tag>
                <el-tag type="info">{{ (buyData.op || "Mint").toLowerCase() }}
                </el-tag>
              </div>
              <div class="num">{{ $Utils.orderDiv(buyData.order_amt, buyData.buy_lim) }}</div>
              <div class="bottom"></div>
            </div>

          </div>

          <div class="inp">
            <el-input maxlength="12" v-model="buyNum" placeholder="Enter the buy amount">
              <template #suffix>
                <span @click.stop="buyNum=maxBuyNum" style="cursor: pointer">Max</span>
              </template>
            </el-input>
          </div>
        </div>
        <div class="row">
          <div class="col">Price</div>
          <div class="col">{{ $Utils.rpZero($web3.utils.fromWei("" + buyData.price || "0")) }} BNB</div>
        </div>
        <div class="row">
          <div class="col">Total Pay</div>
          <div class="col">{{ calcTotalPay(buyData.price) }}BNB</div>
        </div>
      </div>
      <template #footer>
        <div class="footer">
          <el-button class="btn_cancel" @click="buyDialog = false">Cancel</el-button>
          <el-button class="btn_listing" @click="buy(buyData)">Buy</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, getCurrentInstance, watch, computed, unref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {ElLoading, ElMessage, ClickOutside as vClickOutside} from 'element-plus'
import {Search as elSearch} from '@element-plus/icons-vue'
import {useStore} from 'vuex'
import {
  useApiTickList,
  useApiUserTokens, useGetCart, useSignInfoGet
} from "@/hooks/api"
import CartIcon from "@/components/CartIcon.vue"

const {proxy: that} = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const store = useStore()
const userAddress = computed(() => route.query.a || "")
;(!userAddress.value) && back()

function back() {
  router.push({name: 'Tokens'})
}

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
const {getData, size, page, type, total, list, balance, id: selectId} = useApiUserTokens("", 15, userAddress.value)
getSelect()
getData()

function setType(val) {
  type.value = val
  page.value = 1
}

const bnb = computed(() => store.state.wallet.bnbToUsdt)

function calcUPrice(price) {
  let bnPrice = new that.$web3.utils.BN(String(price || "0"))
  let bnBNB = new that.$web3.utils.BN(String(bnb.value || "0"))
  return (Number(that.$web3.utils.fromWei(bnPrice.mul(bnBNB).toString())) / 1e8).toFixed(4)
}

function calcTotalU(amount, price) {
  let bnPrice = new that.$web3.utils.BN(String(price || "0"))
  let bnBNB = new that.$web3.utils.BN(String(bnb.value || "0"))
  let amt = new that.$web3.utils.BN(String(amount || "0"))
  return (Number(that.$web3.utils.fromWei(bnPrice.mul(bnBNB).mul(amt).toString())) / 1e8).toFixed(2)
}

function calcTotal(amount, price) {
  let bnPrice = new that.$web3.utils.BN(String(price || "0"))
  let bnAmount = new that.$web3.utils.BN(String(amount || "0"))
  return that.$web3.utils.fromWei(bnPrice.mul(bnAmount).toString())
}

function calcPrice(price) {
  return that.$web3.utils.fromWei(String(price || "0"))
}


const ticks = computed(() => store.state.wallet.ticks)
const getSignInfo = useSignInfoGet()
const address = computed(() => store.state.wallet.address)
const buyDialog = ref(false)
const buyData = ref({})
const getOrder = useGetCart()
const buyNum = ref("")

const maxBuyNum = computed(() => {
  let num = 0
  if (buyData.value?.order_id) {
    num = Number(buyData.value.order_amt || 0) - Number(buyData.value.buy_lim || 0)
  }
  return num
})

watch(buyNum, () => buyNum.value = String(buyNum.value || "").replace(/^0|\D/g, ""))

function calcTotalPay(price) {
  let bnPrice = new that.$web3.utils.BN(String(price || "0"))
  let bnAmount = new that.$web3.utils.BN(String(buyNum.value || "0"))
  return that.$web3.utils.fromWei(bnPrice.mul(bnAmount).toString())
}

function showBuyDialog(data) {
  if (data.order_id) {
    buyData.value = data
    buyDialog.value = true
  }
}

async function buy(data) {
  if (!address.value) {
    ElMessage.warning("please connect the wallet")
    return false
  }
  if (!data.order_id) {
    ElMessage.warning("error data")
    return false
  }
  if (Number(buyNum.value) <= 0) {
    return ElMessage.warning("Please enter the buy amount")
  }

  let loading = ElLoading.service({
    text: "Buy transition....",
    lock: true, background: 'rgba(0,0,0,0.5)'
  })
  let {data: list} = await getOrder([data.order_id])
  if (!list?.length) {
    ElMessage.error("error data")
    return loading.close()
  }
  buyData.value = list[0]


  if (Number(buyNum.value) > Number(maxBuyNum.value)) {
    ElMessage.warning("The max buy amount is " + maxBuyNum.value)
    return loading.close()
  }
  let signData = await getSignInfo(address.value, buyData.value.order_id, buyNum.value)
  if (signData.code !== 200) {
    ElMessage.error(signData.msg)
    return loading.close()
  }

  let abi = that.$Contract.control.methods.buy(
    signData.data.order_id,
    signData.data.project_id,
    signData.data.order_amt,
    signData.data.buy_amt,
    signData.data.price,
    signData.data.seller,
    signData.data.deadline,
    signData.data.signature
  ).encodeABI()
  let res = await that.$sendTransition(that.$Contract.control._address, abi, signData.data.price)
  if (res.status) {
    buyDialog.value = false
    buyNum.value = ""
    await that.$statusByHash(res.hash)
    await that.$Utils.sleep(10000)
    getData()
    ElMessage.success("Purchase transaction initiated")
  } else {
    ElMessage.error(res.msg || "buy fail")
  }
  loading.close()
}


</script>

<style scoped lang="scss">
.searchCoin {
  position: relative;

  .etchMiddle {
    margin: 0 40px;
    padding-top: 100px;
    padding-bottom: 30px;

    .backRow {
      display: flex;
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
          width: 240px;
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

          .tableList {
            border-radius: 8px;
            border: 1px solid rgb(47, 52, 62);
            background: rgb(32, 34, 41);
            transition: all 0.8s ease 0s;
            padding: 16px;

            .img {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 10px;

              p {
                color: #ffc107;
                font-size: 18px;
                font-weight: bolder;
              }
            }

            .typeList {
              display: flex;
              align-items: center;
              margin-bottom: 5px;

              p {
                font-family: Poppins;
                font-weight: 400;
                line-height: 1.5;
                color: rgba(255, 255, 255, 0.45);
                font-size: 10px;
                padding: 0px 4px;
                box-sizing: border-box;
                border-radius: 3px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                margin-right: 4px;
              }
            }

            .price {
              font-size: 15px;
              text-align: center;
              color: #fff;
            }

            .priceType {
              user-select: none;
              cursor: pointer;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 10px 0 60px;
              background: url("@/assets/images/k-line.png") bottom center/ 100% auto no-repeat;

              .bsc_price {
                font-size: 12px;
                transform: scale(0.8);
                padding-top: 8px;
                color: #ffffff;
              }

              p {
                color: #ffc107;
                font-size: 20px;
                font-weight: 500;

                span {
                  color: rgba(255, 255, 255, 0.45);
                }
              }
            }

            .lianEtch {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-top: 15px;

              p {
                font-size: 12px;
                color: rgb(255, 255, 255);
              }
            }

            .meiPrice {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-top: 15px;
              margin-top: 10px;
              border-top: 1px solid rgba(255, 255, 255, 0.1);

              p {
                font-size: 12px;
                color: #fff;
              }

              p:last-child {
                color: rgba(255, 255, 255, 0.45);
              }
            }

            .btl_list {
              display: flex;
              padding-top: 20px;
              align-items: center;
              justify-content: space-between;

              .buy {
                user-select: none;
                font-size: 12px;
                padding: 6px 10px;
                border: 1px solid #f7d558;
                color: #f7d558;
                border-radius: 15px;
                text-align: center;
                width: 75%;

                &:hover {
                  color: #000;
                  background-color: #f7d558;
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
.other_select_user {
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

.searchBuyDialog {
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
</style>
