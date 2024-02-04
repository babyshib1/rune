<template>
  <div class="etchCon">
    <page-header/>
    <div class="etchMiddle mw">
      <div class="market_head ">
        <div class="title">Marketplace</div>
        <div class="etchInput">
          <input spellcheck="false" v-model="keyword" type="text" placeholder="enter the tick name">
          <i></i>
          <button @click="searchClick">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff">
              <path fill="#fff"
                    d="m15.938 14.188 2.687 2.687c.25.25.25.625 0 .875l-.875.875a.604.604 0 0 1-.875 0L14.25 16c-1.375 1-3 1.563-4.813 1.563a8.109 8.109 0 0 1-8.124-8.125c0-4.5 3.625-8.126 8.124-8.126 4.5 0 8.126 3.625 8.126 8.126a8.52 8.52 0 0 1-1.625 4.75ZM9.375 16.25a6.855 6.855 0 0 0 6.875-6.875A6.855 6.855 0 0 0 9.375 2.5 6.855 6.855 0 0 0 2.5 9.375a6.855 6.855 0 0 0 6.875 6.875Z">
              </path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="table mw">
      <div class="root">
        <p>Trending Tokens</p>
        <div :style="{ opacity: store.state.wallet.address ? 1 : 0.5 }"
             @click="store.state.wallet.address && router.push({ name: 'MyEthscriptions'})"
             class="bscscriptions_btn">All Bscscriptions
        </div>
      </div>
     <div class="scroll">
      <div class="tableList">
        <div class="tableLeft">
          <p>Collection</p>
          <p>Floor Price</p>
          <!--          <p>Unit Price</p>-->
          <p>Total Vol</p>
          <p>Market Cap</p>
          <p>Holders</p>
          <p>Listed</p>
          <p style="width: 20px;flex: none;height: 1px;"></p>
        </div>
        <div class="tableFlex" v-for="(item, index) in list" :key="index" @click="goDetailTokens(item)">
          <div class="tableRight">
            <div class="p1">
              {{ item.tick }}<span>{{ item.p }}</span>
              <img v-if="$Utils.getSrcById(item.project_id)"
                   :src="$Utils.getSrcById(item.project_id)" style="width: 20px;height: 20px">
            </div>
            <div>
              <img style="width: 20px;margin-right: 8px;" src="@/assets/images/floor_icon.png" alt="">
              ${{ $Utils.splitNum($Utils.rpZero(calcUnitPrice(item.floor_price)) || "0")}}</div>
            <div><img style="width: 20px;margin-right: 8px;" src="@/assets/images/icon_bnb.png" alt="">{{ $Utils.splitNum($Utils.rpZero(fromWei(item.totalValue) || "0"))}}</div>
            <div>
              <img style="width: 20px;margin-right: 8px;" src="@/assets/images/market_icon.png" alt="">
              ${{ $Utils.splitNum($Utils.rpZero(calcMarketCap(item.market_cap))) }}</div>
            <div><img style="width: 20px;margin-right: 8px;" src="@/assets/images/holder_icon.png" alt="">{{ $Utils.splitNum(item.holderAmount||0) }}</div>
            <div><img style="width: 20px;margin-right: 8px;" src="@/assets/images/order_icon.png" alt="">{{ $Utils.splitNum(item.totalOnSellOrder || 0) }}</div>
            <div style="width: 20px;flex: none;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                   color="rgba(255,255,255,0.45)">
                <path fill="currentColor"
                      d="m5.833 15 5-5-5-5L7.5 3.333 14.167 10 7.5 16.666 5.833 15Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="pageNum">
          <div class="MuiPagination-ul">
            <el-pagination :page-size="size" hide-on-single-page
                           v-model:current-page="page" @current-change="getData" layout="prev, pager, next"
                           :total="total"/>
          </div>
        </div>
      </div>
     </div>
    </div>
  </div>
</template>

<script setup>
import {ref, getCurrentInstance, watch} from 'vue'
import {useRouter} from 'vue-router'
import {useApiMarketList} from "@/hooks/api"
import {useStore} from "vuex"

const store = useStore()
const {proxy: that} = getCurrentInstance()
const router = useRouter()

function goDetailTokens(data) {
  router.push({name: 'detailToken', query: {project_id: data.project_id}})
}

const {total, size, page, list, getData, keyword} = useApiMarketList(20)

function searchClick() {
  page.value = 1
  getData()
}

getData()

function fromWei(price) {
  return that.$web3.utils.fromWei(String(price || "0"))
}

function calcMarketCap(price) {
  let num = that.$web3.utils.BN(that.$web3.utils.hexToNumberString("0x" + Number(price||0).toString(16)))
  let bnb = that.$web3.utils.BN(store.state.wallet.bnbToUsdt)
  return (Number(num.mul(bnb).toString()) / 1e26).toFixed(4)
}

function calcUnitPrice(price) {
  let num = that.$web3.utils.BN(String(price || "0"))
  let bnb = that.$web3.utils.BN(store.state.wallet.bnbToUsdt)
  return (Number(num.mul(bnb).toString()) / 1e26).toFixed(4)
}
</script>

<style scoped lang="scss">
.etchCon {
  position: relative;

  .etchMiddle {

    padding: 90px 30px 0;

    .market_head {
      height: 200px;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      background: url("@/assets/images/banner2.png") right 0 /100% 100% no-repeat;

      .etchInput {
        display: flex;
        align-items: center;
        width: 400px;
        height: 36px;
        border-radius: 6px;
        border: 1px solid rgb(47, 52, 62);
        background: rgb(32, 34, 41);
        transition: all 0.2s ease-in-out 0s;
        margin: 20px 0;

        input {
          flex: 0.97;
          font-size: 12px;
          color: #fff;
          line-height: 30px;
          background: rgb(32, 34, 41);
          border: none;
          padding: 0 10px;
        }

        i {
          background: rgba(255, 255, 255, 0.12);
          width: 1px;
          height: 100%;
          margin-left: 4px;
        }

        button {
          background: rgb(32, 34, 41);
          cursor: pointer;
          margin: 0 auto;
          padding: 8px;
        }

        button:hover {
          background-color: rgba(229, 255, 101, 0.08);
          border-radius: 50%;
        }
      }

      .title {
        font-size: 28px;
        font-weight: bold;
        color: #ffffff;
        padding: 10px 0;
        position: relative;

        &:before {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 60px;
          background-color: #fff;
          content: '';
        }
      }
    }

    //.herder {
    //  display: flex;
    //  align-items: center;
    //  justify-content: center;
    //
    //  p {
    //    border-radius: 44px;
    //    border: 1px solid #ffc107;
    //    padding: 0px 16px;
    //    box-sizing: border-box;
    //    cursor: pointer;
    //    transition: border 0.2s ease-in-out 0s;
    //    padding: 10px 20px;
    //    font-size: 14px;
    //    color: #fff;
    //  }
    //}
    //
    //
    //.disRight:hover {
    //  opacity: 0.9;
    //}

  }

  .table {
    margin: 0 10px;
    border-radius: 4px;
    //border: 1px solid rgb(47, 52, 62);
    padding: 30px;
    box-sizing: border-box;
    //background: rgb(32, 34, 41);

    .root {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;

      p {
        line-height: 1;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 1px;
      }

      .bscscriptions_btn {
        user-select: none;
        float: right;
        height: 36px;
        width: 140px;
        border-radius: 4px;
        background: #ffc107;
        font-weight: 500;
        font-size: 13px;
        box-sizing: border-box;
        color: rgb(23, 26, 31);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease-in-out 0s;
      }
    }

    .tableList {
      margin: 20px 0 40px;

      .tableLeft {
        display: flex;
        align-items: center;
        padding: 12px 20px;
        background-color: #000000;
        border-radius: 6px;

        p {
          flex: 1;
          font-size: 13px;
          color: #a5a6a9;
        }
      }

      .tableFlex {
        padding: 15px 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(47, 52, 62);

        &:hover {
          background-color: #484d56;
        }

        .tableRight {
          flex: 1;
          display: flex;
          align-items: center;
          //border-bottom: 1px solid rgb(47, 52, 62);

          &>div {
            font-size: 13px;
            flex: 1;
            cursor: pointer;
            padding: 12px 0;
            box-sizing: border-box;
            color: #fff;
            display: flex;
            align-items: center;
          }

          .p1 {
            color: #ffc107;
            display: flex;
            align-items: center;
            font-weight: bolder;
            font-style: italic;
            font-size: 18px;
            span {
              font-weight: normal;
              border-radius: 30px;
              padding: 0 4px;
              //background: rgba(255, 255, 255, 0.1);
              color: rgb(143, 139, 139);
              font-size: 12px;
              margin-left: 6px;
            }
          }

          .Progress {
            span {
              display: block;
            }

            .procces_main {
              height: 6px;
              border-radius: 5px;
              overflow: hidden;
              padding: 0;
              margin-top: 6px;
              width: 80%;
              background-color: rgb(66, 66, 66);
            }

            .index {
              background: #ffc107;
              height: 100%;
              padding: 0;
              width: 0;
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


}
@media (max-width: 768px) {
  .etchMiddle{
    padding: 90px 20px 0 !important
  }
  .etchInput{
    width: 100% !important;
    button {
      padding: 5px !important
    }
  }
  .etch_wrap{
    padding:  10px !important
  }
  .etch_wrap{
    background: url("@/assets/images/banner1.png") right center / 300% 100% no-repeat !important
  }
  .scroll{
    max-width: 100vw;
    overflow: auto
  }
  .tableList
  {
      min-width: 900px;
    padding: 50px 20px 30px !important;
  }
}
</style>
