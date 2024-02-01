<template>
  <div class="etchCon">
    <page-header/>
    <div class="etchMiddle mw">
      <div class="horizontal">
        <div class="backRow" @click="$router.go(-1)">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               width="24" height="24">
            <path
              d="M723.781818 986.414545c-11.915636 0-23.831273-4.538182-32.907636-13.637818L263.005091 544.907636c-18.176-18.176-18.176-47.639273 0-65.815272L690.874182 51.223273c18.176-18.176 47.639273-18.176 65.838545 0 18.176 18.176 18.176 47.639273 0 65.815272L361.751273 512l394.961454 394.961455c18.176 18.176 18.176 47.639273 0 65.838545-9.099636 9.076364-21.015273 13.614545-32.930909 13.614545z"
              fill="#ffffff"></path>
          </svg>
          <p>Mint</p>
        </div>
        <div class="inputList">
          <p><span>Tick</span><input disabled placeholder="Tick Name" :value="tickInfo.tick" type="text"></p>
          <p><span>Type</span><input disabled placeholder="Tick Type" :value="tickInfo.p" type="text"></p>
          <p><span>Lim</span><input disabled placeholder="Tick Lim" :value="tickInfo.lim" type="text"></p>
          <p><span>Tick Max</span><input disabled placeholder="Tick Lim" :value="tickInfo.max"
                                         type="text"></p>
          <button class="buy"
                  :style="{ opacity:Number(tickInfo.max)>Number(tickInfo.mint_lim) ? '1' : '0.2' }"
                  @click="mint">
            Mint
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref, getCurrentInstance, watch, computed} from 'vue'
import {ElLoading, ElMessage} from 'element-plus'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {useApiSearchTick} from "@/hooks/api"

const route = useRoute()
const store = useStore()
const {proxy: that} = getCurrentInstance()


const address = computed(() => store.state.wallet.address)

const judgeTxt = {
  address: "Please connect the wallet",
  limitTotalSupply: "The total supply quantity must be greater than the limit quantity",
  limitScaleTotal: "The total supply quantity must be an integral multiple of the limit quantity",
  notId: "No corresponding data was found, please try again later.",
  overMaxCount: "The current tick has been minted.",
  tickOverMaxCount: "The current tick has been minted.",
  tickId: "Please input the tick id"
}

const searchTick = useApiSearchTick()

function judgeCondition(arr = []) {
  let msg = ''
  arr.some(item => {
    if (item[0]) {
      msg = judgeTxt[item[1]] || 'input empty data'
      return true
    }
  })
  return msg
}


const tickInfo = ref({})

async function getTickInfoById() {
  if (route.query?.project_id) {
    let result = await searchTick(route.query.project_id)
    tickInfo.value = result?.data || {}
  } else {
    tickInfo.value = {}
  }
}

getTickInfoById()
watch(route, () => {
  getTickInfoById()
})


async function mint() {
  await getTickInfoById()
  let msg = judgeCondition([
    [!address.value, 'address'],
    [!tickInfo.value?.project_id, 'notId'],
    [!(Number(tickInfo.value.max) > Number(tickInfo.value.mint_lim)), 'overMaxCount']
  ])
  if (msg) {
    ElMessage.warning(msg)
    return false
  }
  let loading = ElLoading.service({
    text: "Mint send transition....",
    lock: true,
    background: 'rgba(0,0,0,0.5)'
  })
  let abi = that.$web3.utils.utf8ToHex("data:," + JSON.stringify({
    "p": tickInfo.value.p,
    "op": "mint",
    "tick": tickInfo.value.tick,
    "amt": String(tickInfo.value.lim)
  }))
  let res = await that.$sendTransition(address.value, abi)
  if (res.status) {
    await that.$statusByHash(res.hash)
    await that.$Utils.sleep(8000)
    ElMessage.success("Mint transition send success")
  } else {
    ElMessage.error(res.msg || "Mint transition send fail")
  }
  loading.close()
}
</script>

<style scoped lang="scss">
.etchCon {
  &:deep .van-radio__label {
    color: #fff !important;
  }

  position: relative;

  .etchMiddle {
    margin: 0 auto 30px;
    padding-top: 90px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
    min-height: calc(100vh - 120px);

    .src_20 {
      margin-top: 20px;
      font-size: 14px;
      color: #ccc;
    }

    .horizontal {
      //margin-top: 20px;
      background: url("@/assets/images/Marketplace-Mint Background.png") 0 0 /100% 100% no-repeat;
      padding: 20px 20px 60px;
      max-width: 1000px;
      margin: auto;

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
        }
      }

      .van-radio-group--horizontal {
        justify-content: center;
      }

      .inputList {
        width: 400px;
        margin: auto;
        position: relative;

        p {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;

          span {
            font-size: 13px;
            width: 100px;
            text-align: right;
            display: block;
          }

          input, select {
            flex: 1;
            font-size: 16px;
            color: #fff;
            border-radius: 4px;
            background: #14151a;
            border: none;
            padding: 7px 10px;
            margin-left: 20px;
          }

          .repeat_inp {
            flex: 1;
            margin-left: 0.53333rem;
            font-size: 0.42667rem;
            color: #fff;
            border-radius: 0.10667rem;
            background: rgb(32, 34, 41);
            border: none;
            padding: 0;

            &::v-deep {
              .van-field__control {
                color: white;
              }

              input {
                padding: 0 0.26667rem;
              }

              .max {
                background-color: transparent;
                padding: 0 10px;
                color: rgb(255, 193, 7);
                height: 32px !important;
                border-left: 1px solid #8a8484;

                button {
                  height: 100%;
                  font-size: 12px;
                }
              }
            }
          }

          .tip {
            margin-top: 20px;
            font-size: 12px;
            color: #ccc;
            flex: 1;
            margin-top: 0;
            text-align: left;
            margin-left: 0.53333rem;
          }

          .van-slider {
            flex: 1;
            margin-left: 20px;

            .custom-button {
              background: #ffc107;
              font-size: 10px;
              padding: 0 8px;
              border-radius: 2px;
              user-select: none;

            }
          }
        }

        .buy {
          user-select: none;
          font-size: 14px;
          color: #fff;
          padding: 8px 0;
          background: #ffc107;
          border-radius: 4px;
          text-align: center;
          width: 140px;
          margin: 20px auto 0;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
