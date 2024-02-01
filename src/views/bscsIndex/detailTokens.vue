<template>
  <div class="etchCon mw">
    <page-header/>
    <div class="etchMiddle ">
      <svg @click="backTo('Tokens')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           width="24" height="24">
        <path
          d="M723.781818 986.414545c-11.915636 0-23.831273-4.538182-32.907636-13.637818L263.005091 544.907636c-18.176-18.176-18.176-47.639273 0-65.815272L690.874182 51.223273c18.176-18.176 47.639273-18.176 65.838545 0 18.176 18.176 18.176 47.639273 0 65.815272L361.751273 512l394.961454 394.961455c18.176 18.176 18.176 47.639273 0 65.838545-9.099636 9.076364-21.015273 13.614545-32.930909 13.614545z"
          fill="#ffffff"></path>
      </svg>

      <p>
        {{ info.tick }}<span>{{ info.p }}</span>
        <img v-if="$Utils.getSrcById(info.project_id)"
             :src="$Utils.getSrcById(info.project_id)" style="width: 20px;height: 20px">
      </p>
    </div>
    <div class="detail">
      <div class="disFlex">
        <p>Overview</p>
        <span :style="{ background: id && (info.max > info.mint_lim) ? 'rgb(229 255 101)' : '' }"
              @click="id && (info.max > info.mint_lim) && router.push({ name: 'Deploymint', query: { project_id: info.project_id } })">Mint</span>
      </div>
      <div class="detaiList">
        <p>Bscscriptions ID<span>{{ bscscriptionsID }}</span></p>
        <p>Total Supply<span>{{ $Utils.splitNum(info.max) }}</span></p>
        <p>Minted<span>{{ $Utils.splitNum(info.mint_lim) }}</span></p>
        <p>Limit per mint<span>{{ $Utils.splitNum(info.lim) }}</span></p>
        <p>Decimal<span>18</span></p>
        <p>Deploy By<span>{{ info.project_id }}</span></p>
        <p>Deploy Time<span>{{ $Utils.formatTemp(info.deploy_time) }}</span></p>
        <p>Creator<span>{{ info.deployer }}</span></p>
        <p>Holders<span>{{ $Utils.splitNum(info.holderAmount) }}</span></p>
        <p>Total Transactions<span>{{ $Utils.splitNum(transferTotal) }}</span></p>
      </div>
    </div>
    <div class="root">
      <button @click="tab = 0" :class="{ tab_active: !tab }">Holders</button>
      <button @click="tab = 1" :class="{ tab_active: tab }">Transfers</button>
    </div>
    <div class="table">
      <div>
        <div v-show="tab === 0" class="tableList">
          <div class="tableLeft">
            <p>Rank</p>
            <p>Address</p>
            <p>Percentage</p>
            <p>Value</p>
          </div>
          <div class="tableFlex" v-for="(item, index) in  holderList " :key="'h' + index">
            <div class="p1">{{ index + holderPage * holderSize + 1 - holderSize }}</div>
            <div>{{ $Utils.formatAddress(item.user) }}</div>
            <div class="Progress">
              <span>{{ $Utils.numPercent(item.balance, info.max) }}</span>
              <div class="procces_main">
                <div class="index"
                     :style="{ width: $Utils.numPercent(item.balance, info.max) }"></div>
              </div>
            </div>
            <div>{{ $Utils.splitNum(item.balance) }}</div>
          </div>
          <div class="pageNum">
            <div class="MuiPagination-ul">
              <el-pagination background hide-on-single-page :page-size="holderSize"
                             v-model:current-page="holderPage" layout="prev, pager, next"
                             :total="holderTotal"/>
            </div>
          </div>
        </div>
        <div v-show="tab === 1" class="tableList">
          <div class="tableLeft">
            <p>Hash</p>
            <p>Method</p>
            <p>Quantity</p>
            <p>From</p>
            <p>To</p>
            <p>Date Time</p>
          </div>
          <div class="tableFlex" v-for="(item, index) in  transferList " :key="index">
            <div class="p1" @click="linkTo(item.hash)">
              <el-tooltip effect="dark" :content="item.hash" placement="top">
                <span> {{ $Utils.formatAddress(item.hash) }}</span>
              </el-tooltip>
            </div>
            <div>{{ item.op || "" }}</div>
            <div>{{ $Utils.splitNum(item.amt) }}</div>
            <div>{{ $Utils.formatAddress($Utils.getFromUser(item)) }}</div>
            <div>{{ $Utils.formatAddress($Utils.getToUser(item)) }}</div>
            <div>{{ $Utils.formatTemp(item.timestamp) }}</div>
          </div>
          <div class="pageNum">
            <div class="MuiPagination-ul">
              <el-pagination background hide-on-single-page :page-size="transferSize"
                             v-model:current-page="transferPage" layout="prev, pager, next" :total="transferTotal"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, getCurrentInstance, computed, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useApiTokenHolders, useApiTokenInfo, useApiTokenTransfers} from "@/hooks/api"

const that = getCurrentInstance().proxy
const route = useRoute()
const router = useRouter()
const id = route.query.project_id || ""

function backTo(name, ...od) {
  if (name) {
    router.push({name, ...od})
  } else {
    router.go(-1)
  }
}

if ((!id)) {
  backTo('Tokens')
}
const info = useApiTokenInfo(id)
const tab = ref(0)
const bscscriptionsID = computed(() => {
  let str = ""
  if (info.value?.source_data) {
    try {
      str = that.$web3.utils.sha3(info.value.source_data)
    } catch (e) {

    }
  }
  return str
})
const {
  page: holderPage,
  total: holderTotal,
  size: holderSize,
  list: holderList
} = useApiTokenHolders(id, 20)

const {
  page: transferPage,
  total: transferTotal,
  size: transferSize,
  list: transferList
} = useApiTokenTransfers(id, 20)

function linkTo(hash) {
  if (!hash) {
    return false
  }
  router.push({
    name: "Bscsscriptions",
    query: {
      hash
    }
  })
}
</script>

<style scoped lang="scss">
.etchCon {
  position: relative;

  .etchMiddle {
    margin: 30px 40px;
    padding-top: 120px;
    display: flex;
    align-items: center;

    p {
      color: #ffc107;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 1px;
      margin-left: 10px;
      display: flex;
      align-items: center;

      span {
        border-radius: 30px;
        padding: 0px 4px;
        background: rgba(255, 255, 255, 0.1);
        color: rgb(255, 255, 255);
        font-size: 12px;
        margin-left: 6px;
      }
    }
  }

  .detail {
    margin: 0 40px;
    border-radius: 4px;
    border: 1px solid rgb(47, 52, 62);
    box-sizing: border-box;
    background: url("@/assets/images/Token-Evnm Background.png") center top/100% 100% no-repeat;


    .disFlex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      //border-bottom: 1px solid rgb(47, 52, 62);
      padding: 15px 30px;

      p {
        color: rgb(255, 255, 255);
        font-size: 16px;
        font-weight: 500;
      }

      span {
        cursor: pointer;
        font-size: 13px;
        background: rgba(229, 255, 101, 0.4);
        padding: 12px 20px;
        border: 1px solid rgb(47, 52, 62);
        border-radius: 4px;
      }
    }

    .detaiList {
      margin-top: 20px;

      p {
        padding: 0 30px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: rgba(255, 255, 255, 0.65);
        font-size: 13px;
        font-weight: 500;

        span {
          color: #fff;
        }
      }
    }
  }

  .root {
    padding: 60px 0 0;
    text-align: center;

    button {
      font-size: 12px;
      padding: 8px 20px;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
      background-color: rgb(54, 56, 62);
      color: #fff;
      font-weight: 500;
      cursor: pointer;

      &.tab_active {
        background-color: #ffc107;
        color: #000;
      }
    }
  }

  .table {
    margin: 0 10px;
    border-radius: 4px;
    //border: 1px solid rgb(47, 52, 62);
    padding: 30px;
    box-sizing: border-box;
    //background: rgb(32, 34, 41);


    .tableList {
      //margin: 40px 0;
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

        div {
          font-size: 13px;
          flex: 1;
          cursor: pointer;
          padding: 15px 0;
          box-sizing: border-box;
          color: #fff;
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
</style>
