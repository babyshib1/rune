<template>
  <div class="etchCon">
    <page-header/>
    <div class="etchMiddle mw">
      <svg @click="back" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           width="24" height="24">
        <path
          d="M723.781818 986.414545c-11.915636 0-23.831273-4.538182-32.907636-13.637818L263.005091 544.907636c-18.176-18.176-18.176-47.639273 0-65.815272L690.874182 51.223273c18.176-18.176 47.639273-18.176 65.838545 0 18.176 18.176 18.176 47.639273 0 65.815272L361.751273 512l394.961454 394.961455c18.176 18.176 18.176 47.639273 0 65.838545-9.099636 9.076364-21.015273 13.614545-32.930909 13.614545z"
          fill="#ffffff"></path>
      </svg>
      <p>Token / Detail</p>
    </div>
    <div class="etchTitle mw">
      <div class="disLeft">
        <p style="display:flex;align-items: center">
          <img v-if="$Utils.getIsOne(info.project_id)"
               style="width: 50px;margin-left: -20px" src="@/assets/images/icon_market.png"
               alt="">
          {{ info.p }} {{ info.tick }}
        </p>
        <div style="flex: 1;">
          <img v-if="$Utils.getSrcById(info.project_id)"
               :src="$Utils.getSrcById(info.project_id)" style="width: 20px;height: 20px">

        </div>
        <div :style="{ opacity: store.state.wallet.address ? 1 : 0.5 }"
             @click="store.state.wallet.address && router.push({ name: 'MyEthscriptions', query: { project_id: info.project_id } })"
             class="disRight">My Bscscriptions
        </div>
      </div>
      <div class="disType">
        <p>
          <span><img style="width: 20px;margin-right: 8px;" src="@/assets/images/floor_icon.png" alt="">Floor Price</span>
          <span>${{ $Utils.splitNum($Utils.rpZero(calcFloorPrice(info.floor_price)) || "0") }}</span>
        </p>
        <p>
          <span><img style="width: 20px;margin-right: 8px;" src="@/assets/images/market_icon.png" alt="">Market Cap</span>
          <span>${{ $Utils.splitNum($Utils.rpZero(calcMarketCap(info.market_cap))) }}</span>
        </p>
        <p>
          <span><img style="width: 20px;margin-right: 8px;" src="@/assets/images/icon_bnb.png" alt="">Total Vol</span>
          <span>{{ $Utils.splitNum($Utils.rpZero(fromWei(info.totalValue) || "0") )}}BNB</span>
        </p>
        <p>
          <span><img style="width: 20px;margin-right: 8px;" src="@/assets/images/holder_icon.png" alt="">Holders</span>
          <span>{{ $Utils.splitNum(info.holderAmount || 0) }}</span></p>
        <p>
          <span><img style="width: 20px;margin-right: 8px;" src="@/assets/images/order_icon.png" alt="">Listed</span>
          <span>{{ $Utils.splitNum(total || 0 )}}</span>
        </p>
        <p>
          <span><img style="width: 20px;margin-right: 8px;" src="@/assets/images/total_icon.png" alt="">Total Supply</span>
          <span>{{ $Utils.splitNum(info.max || 0) }}</span>
        </p>
        <div class="sort_type">
          <svg v-show="sort===1" @click="sort=-1" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg" width="40" height="40">
            <path
              d="M768 362.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v387.648l61.418667-61.397333a21.333333 21.333333 0 0 1 30.165333 0l30.165334 30.165333a21.333333 21.333333 0 0 1 0 30.165333l-116.053334 116.053334a53.333333 53.333333 0 0 1-90.922666-34.218667L704 848.917333V384a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667zM554.666667 789.333333a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H128a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334h426.666667z m0-320a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H128a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334h426.666667zM896 149.333333a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H128a21.333333 21.333333 0 0 1-21.333333-21.333334V170.666667a21.333333 21.333333 0 0 1 21.333333-21.333334h768z"
              fill="#ffc107"></path>
          </svg>
          <svg style="transform: rotateX(180deg)" v-show="sort===-1" @click="sort=1" viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               width="40" height="40">
            <path
              d="M768 362.666667a21.333333 21.333333 0 0 1 21.333333 21.333333v387.648l61.418667-61.397333a21.333333 21.333333 0 0 1 30.165333 0l30.165334 30.165333a21.333333 21.333333 0 0 1 0 30.165333l-116.053334 116.053334a53.333333 53.333333 0 0 1-90.922666-34.218667L704 848.917333V384a21.333333 21.333333 0 0 1 21.333333-21.333333h42.666667zM554.666667 789.333333a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H128a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334h426.666667z m0-320a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H128a21.333333 21.333333 0 0 1-21.333333-21.333334v-42.666666a21.333333 21.333333 0 0 1 21.333333-21.333334h426.666667zM896 149.333333a21.333333 21.333333 0 0 1 21.333333 21.333334v42.666666a21.333333 21.333333 0 0 1-21.333333 21.333334H128a21.333333 21.333333 0 0 1-21.333333-21.333334V170.666667a21.333333 21.333333 0 0 1 21.333333-21.333334h768z"
              fill="#ffc107"></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="mw">
      <div class="table ">
        <div class="tableList" v-for="(item, index) in list" :key="index">
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
          <!-- <div class="price">1000 BNB</div>@click="linkToLog({project_id:info.id,tick_id:item.ord})" -->
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
                <a target="_blank" :href="$Config.browser+'/tx/'+item.hash" style="display: flex;align-items: center;color: #ffffff">#{{ item.blockNumber }}
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
        <div class="pageNum">
          <div class="MuiPagination-ul">
            <el-pagination background hide-on-single-page :page-size="size" v-model:current-page="page"
                           layout="prev, pager, next" :total="total"/>
          </div>
        </div>
      </div>
    </div>

    <el-dialog class="buyDialog" v-model="buyDialog" width="400px" :close-on-click-modal="false">
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
import {useStore} from 'vuex'
import {getCurrentInstance, computed, watch, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {ElLoading, ElMessage} from 'element-plus'
import {useApiDetailOrders, useApiTokenDetail, useGetCart, useSignInfoGet} from "@/hooks/api"
import CartIcon from "@/components/CartIcon.vue"

const that = getCurrentInstance().proxy
const router = useRouter()
const route = useRoute()
const id = route.query.project_id || ""
const store = useStore()
const address = computed(() => store.state.wallet.address)
const ticks = computed(() => store.state.wallet.ticks)

function back() {
  router.push({name: 'Marketplace'})
}

const info = useApiTokenDetail(id)
watch(info, () => {
  if (!info.value?.project_id) {
    back()
  }
})
const {total, size, page, list, sort, getData} = useApiDetailOrders(id, 20)

const getSignInfo = useSignInfoGet()

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
  console.log(buyData.value.order_id)
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

function calcPrice(price) {
  let bnPrice = new that.$web3.utils.BN(String(price || "0"))
  return that.$web3.utils.fromWei(bnPrice.toString())
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


function calcTotalVol(price) {
  return Number(price / 1e18).toFixed(2)
}
function calcMarketCap(price) {
  let num = that.$web3.utils.BN(that.$web3.utils.hexToNumberString("0x" + Number(price||0).toString(16)))
  let bnb = that.$web3.utils.BN(store.state.wallet.bnbToUsdt)
  return (Number(num.mul(bnb).toString()) / 1e26).toFixed(4)
}
function fromWei(price) {
  return that.$web3.utils.fromWei(String(price || "0"))
}
function calcFloorPrice(price) {
  let num = that.$web3.utils.BN(String(price || "0"))
  let bnb = that.$web3.utils.BN(store.state.wallet.bnbToUsdt)
  return (Number(num.mul(bnb).toString()) / 1e26).toFixed(4)
}

function calcUnitPrice(price) {
  let num = that.$web3.utils.BN(String(price || "0"))
  return (Number(num.mul(that.$web3.utils.BN(bnb.value)).toString()) / 1e26).toFixed(2)
}
</script>

<style scoped lang="scss">
.etchCon {
  position: relative;

  .etchMiddle {
    display: flex;
    align-items: center;
    margin: 30px 40px 10px;
    padding-top: 120px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;

    p {
      margin-left: 10px;
    }
  }

  .etchTitle {
    margin: 0 40px 0 65px;

    .disLeft {
      display: flex;
      align-items: center;

      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
      color: #fff;
      min-height: 27px;

      p {
        margin-right: 10px;
      }

      .disRight {
        float: right;
        height: 36px;
        width: 160px;
        border-radius: 4px;
        background: #ffc107;
        font-weight: 500;
        font-size: 14px;
        box-sizing: border-box;
        color: rgb(23, 26, 31);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease-in-out 0s;
      }
    }

    .disType {
      display: flex;
      align-items: center;
      margin-top: 20px;
      position: relative;
      padding: 20px 150px 20px 20px;
      background-color: #202229;
      justify-content: space-between;
      border-radius: 5px;

      .sort_type {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 50px;
        height: 50px;
        right: 50px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      p {
        line-height: 1.5;
        font-weight: 500;
        font-size: 13px;
        color: rgba(255, 255, 255, 0.65);
        &>span{
          display: flex;
          align-items: center;
        }
        span:last-child{
          margin-top: 10px;
          color: #fff;

          display: block;
        }
      }

    }
  }

  .table {
    margin: 10px  -10px 50px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;

    .tableList {
      width: 222px;
      border-radius: 8px;
      border: 1px solid rgb(47, 52, 62);
      background: rgb(32, 34, 41);
      transition: all 0.8s ease 0s;
      padding: 16px;
      margin: 10px;

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

    .tableList:last-child {
      margin-right: 2%;
    }

  }

  .table::v-deep {
    .pageNum {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      margin-top: 20px;

      .MuiPagination-ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 16px;

        .is-active {
          background: #484d56;
          border: 1px solid #484d56;
        }

        button, li {
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

        }
      }
    }
  }
}
@media (max-width: 768px) {
  .disType{
      flex-direction: column;
      padding: 20px 20px 20px 20px !important;
      align-items: start !important;
  }
}
</style>
<style lang="scss">
.sort_select_pop {
  .el-select-dropdown__item {
    padding-left: 20px;
  }
}

.buyDialog {
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
