<template>
  <div class="bscsscriptions">
    <page-header/>
    <div class="etchMiddle mw">
      <svg @click="backTo" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           width="24" height="24">
        <path
          d="M723.781818 986.414545c-11.915636 0-23.831273-4.538182-32.907636-13.637818L263.005091 544.907636c-18.176-18.176-18.176-47.639273 0-65.815272L690.874182 51.223273c18.176-18.176 47.639273-18.176 65.838545 0 18.176 18.176 18.176 47.639273 0 65.815272L361.751273 512l394.961454 394.961455c18.176 18.176 18.176 47.639273 0 65.838545-9.099636 9.076364-21.015273 13.614545-32.930909 13.614545z"
          fill="#ffffff"></path>
      </svg>
      <p>Back</p>
    </div>
    <div class="info mw">
      <pre class="left">{{ sourceData }}</pre>
      <div class="right">
        <div class="title">{{ info.tick }} {{ info.p }} #{{ info.blockNumber }}</div>
        <div class="row">
          <div class="txt">Mimetype</div>
          <div class="data">text/plain</div>
        </div>
        <div class="row">
          <div class="txt">Block</div>
          <div class="data">#{{ info.blockNumber }}</div>
        </div>
        <div class="row">
          <div class="txt">Collection</div>
          <div class="data">{{ info.tick }} {{ info.p }} token</div>
        </div>
        <div class="row">
          <div class="txt">From</div>
          <div class="data">{{ $Utils.formatAddress($Utils.getFromUser(info)) }}</div>
        </div>
        <div class="row">
          <div class="txt">To</div>
          <div class="data">{{ $Utils.formatAddress($Utils.getToUser(info)) }}</div>
        </div>
        <div class="row">
          <div class="txt">Time</div>
          <div class="data">{{ $Utils.formatTemp(info.timestamp) }}</div>
        </div>
      </div>
    </div>
    <!--    <div class="activeList mw">-->
    <!--      <div class="title">Activity</div>-->
    <!--      <div class="tableList">-->
    <!--        <div class="tableLeft">-->
    <!--          <p>Event</p>-->
    <!--          <p>Price</p>-->
    <!--          <p>From</p>-->
    <!--          <p>To</p>-->
    <!--          <p>Date Time</p>-->
    <!--        </div>-->
    <!--        <div class="tableFlex" v-for="(item, index) in  list " :key="index">-->
    <!--          <div>{{ item.operation_method || "" }}</div>-->
    <!--          <div>{{ Number(item.price || 0) > 0 ? $Utils.rpZero(item.price) : "" }}</div>-->
    <!--          <div>{{ $Utils.formatAddress(item.from_user) }}</div>-->
    <!--          <div>{{ $Utils.formatAddress(item.to_user) }}</div>-->
    <!--          <div>{{ $Utils.formatTemp(item.create_timestamp) }}</div>-->
    <!--        </div>-->
    <!--        <div class="pageNum">-->
    <!--          <div class="MuiPagination-ul">-->
    <!--            <el-pagination background hide-on-single-page :page-size="size"-->
    <!--                           v-model:current-page="page" layout="prev, pager, next" :total="total"/>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script setup>
import {useApiScriptionInfo, useApiTokenDetail} from "@/hooks/api"
import {useRoute, useRouter} from "vue-router"
import {computed, onMounted, ref} from "vue"

const route = useRoute()
const router = useRouter()
const id = route.query.hash || ""

function backTo() {
  router.go(-1)
}

if (!id) {
  backTo()
}
const info = ref({})
!(async function () {
  let {data} = await useApiScriptionInfo(id)
  info.value = data
})()

const sourceData = computed(() => {
  let list = {
    "p": info.value?.p,
    "op": (info.value.op || "mint").toLowerCase(),
    "tick": info.value?.tick
  }
  if (['mint', 'transfer', 'sell'].includes(list.op)) {
    list['amt'] = info.value.amt
  }
  if (list.op === 'cancel') {
    list['oid'] = info.value.order_id
  }
  if (list.op === 'sell') {
    list['price'] = info.value.price
  }
  if (list.op === 'deploy') {
    list['max'] = info.value.max
    list['lim'] = info.value.lim
  }
  return list
})

</script>
<style scoped lang="scss">
.bscsscriptions {
  position: relative;
  padding: 150px 40px 30px;
  //max-width: 1280px;
  margin: auto;
  color: #ffffff;

  .etchMiddle {
    padding: 0 0 30px;
    display: flex;
    align-items: center;
    user-select: none;

    p {
      color: #ffc107;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 1px;
      margin-left: 10px;

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

  .info {
    padding: 30px;
    border-radius: 4px;
    border: 1px solid rgb(47, 52, 62);
    box-sizing: border-box;
    background: rgb(32, 34, 41);
    display: flex;

    .left {
      flex: 2;
      white-space: pre-wrap !important;
      line-height: 2;
      word-break: break-all!important;
      background-color: #0a0606;
      border-radius: 12px;
      padding: 20px;
      color: #ffffff;
      font-size: 16px;
      min-height: 300px;
    }

    .right {
      padding-left: 30px;
      color: #ffffff;
      flex: 3;

      .title {
        font-size: 24px;
        padding-bottom: 20px;
      }

      .row {
        display: flex;
        align-items: center;
        border-top: 1px solid #373737;
        padding: 15px 0;

        .txt {
          width: 150px;
          font-size: 12px;
        }

        .data {
          flex: 1;
          font-size: 12px;
        }
      }
    }
  }

  .activeList {
    //padding: 30px;
    border-radius: 4px;
    //border: 1px solid rgb(47, 52, 62);
    box-sizing: border-box;
    //background: rgb(32, 34, 41);
    margin-top: 40px;

    .title {
      font-size: 24px;
      padding-bottom: 20px;
    }

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
          font-size: 14px;
          flex: 1;
          cursor: pointer;
          padding: 12px 0;
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
