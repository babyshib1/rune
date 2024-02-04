<template>
  <div class="etchCon">
    <page-header/>
    <div class="etchMiddle mw">
      <div class="etch_wrap">
        <p class="etchTitle">Check out token bscscriptions balance of the address.</p>
        <div class="etchInput">
          <input spellcheck="false" v-model="keyword" type="text">
          <i></i>
          <button @click="searchClick">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff">
              <path fill="#fff"
                    d="m15.938 14.188 2.687 2.687c.25.25.25.625 0 .875l-.875.875a.604.604 0 0 1-.875 0L14.25 16c-1.375 1-3 1.563-4.813 1.563a8.109 8.109 0 0 1-8.124-8.125c0-4.5 3.625-8.126 8.124-8.126 4.5 0 8.126 3.625 8.126 8.126a8.52 8.52 0 0 1-1.625 4.75ZM9.375 16.25a6.855 6.855 0 0 0 6.875-6.875A6.855 6.855 0 0 0 9.375 2.5 6.855 6.855 0 0 0 2.5 9.375a6.855 6.855 0 0 0 6.875 6.875Z">
              </path>
            </svg>
          </button>
        </div>
        <p class="Recognize">Recognize all operations including Tick Name and Address.</p>
      </div>
    </div>
   <div class="scroll">
    <div class="table mw">
      <p class="root">The full list of token bscscriptions</p>
      <div class="tableList">
        <div class="tableLeft">
          <p>Token</p>
          <p>Progress</p>
          <p>Holders</p>
          <p>Deploy Time</p>
        </div>
        <div class="tableFlex" v-for="(item, index) in  list " :key="index" @click="goDetailTokens(item)">
          <div class="tableRight">
            <div class="p1">{{ item.tick }}
              <span>{{ item.p }}</span>
              <img v-if="$Utils.getSrcById(item.project_id)" :src="$Utils.getSrcById(item.project_id)"
                   style="width: 20px;height: 20px"
                   alt="">
            </div>
            <div class="Progress">
              <span>{{ $Utils.numPercent(item.mint_lim, item.max) }}</span>
              <div class="procces_main">
                <div class="index" :style="{ width: $Utils.numPercent(item.mint_lim, item.max) }"></div>
              </div>
            </div>
            <div class="arc"><img style="width: 20px;margin-right: 8px;" src="@/assets/images/holder_icon.png" alt="">{{ $Utils.splitNum(item.holderAmount) }}</div>
            <div class="arc"><img style="width: 20px;margin-right: 8px;" src="@/assets/images/deploy_icon.png" alt="">{{ $Utils.formatTemp(item.deploy_time) }}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                 color="rgba(255,255,255,0.45)" focusElementRef="[object Object]">
              <path fill="currentColor" d="m5.833 15 5-5-5-5L7.5 3.333 14.167 10 7.5 16.666 5.833 15Z"></path>
            </svg>
          </div>
        </div>
        <div class="pageNum">
          <div class="MuiPagination-ul">
            <el-pagination hide-on-single-page background @current-change="pageChange" :page-size="size"
                           v-model:current-page="page" layout="prev, pager, next" :total="total"/>
          </div>
        </div>
      </div>
    </div>
   </div>
  </div>
</template>
<script setup>
import {useApiTokens} from "@/hooks/api"
import {useRouter} from "vue-router"
import {getCurrentInstance, watch} from "vue"

const {page, size, search, pageChange, list, total, keyword} = useApiTokens(20)
const router = useRouter()
const that = getCurrentInstance().proxy

function goDetailTokens(data) {
  if (!data.project_id) {
    return false
  }
  router.push({name: 'detailTokens', query: {project_id: data.project_id}})
}

watch(keyword, () => keyword.value = String(keyword.value || "").trim())
search()

function searchClick() {
  if (that.$web3.utils.isAddress(keyword.value)) {
    router.push({name: 'TokenSearch', query: {a: keyword.value}})
  } else {
    page.value = 1
    search()
  }
}
</script>
<style scoped lang="scss">
.etchCon {
  position: relative;

  .etchMiddle {
    position: relative;
    padding: 90px 40px 0;

    .etch_wrap {
      padding: 40px 400px 70px 20px;
      background: url("@/assets/images/banner1.png") right center / 100% 100% no-repeat;
      border-radius: 10px;

      .etchTitle {
        line-height: 1.5;
        color: #ffc107;
        //text-align: center;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 1px;
      }

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

      .Recognize {
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        //text-align: center;
        font-size: 12px;
        letter-spacing: 1px;
      }
    }

  }

  .table {
    border-radius: 12px;
    //border: 1px solid rgb(47, 52, 62);
    padding: 50px 40px 30px;
    box-sizing: border-box;
    //background: rgb(32, 34, 41);
    .root {
      margin: 0;
      line-height: 1;
      color: #fff;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: 1px;
    }

    .tableList {
      margin: 30px 0 40px;

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
        border-radius: 4px;
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


          div {
            font-size: 14px;
            flex: 1;
            cursor: pointer;
            padding: 15px 0;
            box-sizing: border-box;
            color: #fff;
          }
          .arc{
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
  .table{
    padding: 50px 20px 30px !important;
  }
}
</style>
