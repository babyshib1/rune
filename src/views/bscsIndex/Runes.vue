<template>
  <div class="etchCon">
    <page-header />
    <div class="etchMiddle mw">
      <div class="market_head">
        <div class="title">Runes</div>
        <div class="etchInput">
          <input
            spellcheck="false"
            v-model="keyword"
            type="text"
            placeholder="enter the tick name"
          />
          <i></i>
          <button @click="searchClick">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#fff"
            >
              <path
                fill="#fff"
                d="m15.938 14.188 2.687 2.687c.25.25.25.625 0 .875l-.875.875a.604.604 0 0 1-.875 0L14.25 16c-1.375 1-3 1.563-4.813 1.563a8.109 8.109 0 0 1-8.124-8.125c0-4.5 3.625-8.126 8.124-8.126 4.5 0 8.126 3.625 8.126 8.126a8.52 8.52 0 0 1-1.625 4.75ZM9.375 16.25a6.855 6.855 0 0 0 6.875-6.875A6.855 6.855 0 0 0 9.375 2.5 6.855 6.855 0 0 0 2.5 9.375a6.855 6.855 0 0 0 6.875 6.875Z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="table mw">
      <div class="tableList">
        <div class="tableLeft">
          <p>Rune</p>
          <p class="text-center">Suppli</p>
          <p class="text-center">Progress </p>
          <p class="text-center">Holders</p>
          <p>
            Deploy Time
          </p>
          <p></p>

          <p style="width: 20px; flex: none; height: 1px"></p>
        </div>
        <div class="tableFlex" v-for="(item, index) in list" :key="index"
        @click="() => $router.push({ path: '/RuneView' })"
        >
          <div class="tableRight">
            <div class="p1">
              {{ item.type }}
              <span>{{ item.name }}</span>
              <img
                src="@/assets/projects/gold.png"
                style="width: 20px; height: 20px"
              />
            </div>
            <div>
              <div class="text-center">{{ item.supply }}</div>
            </div>

            <div class="Progress">
              <span>{{ item.progress }}</span>
              <div class="procces_main">
                <div class="index" style="width: 100%"></div>
              </div>
            </div>

            <div>
              <div class="text-center">{{ item.holders }}</div>
            </div>
            <div>
              <span>{{ item.created }}</span>
            </div>
            <div>
              <button class="mintBtn" @click.stop="">Mint</button>
            </div>
          </div>
        </div>
        <div class="pageNum">
          <div class="MuiPagination-ul"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"

const list = ref([
  {
    type: "BSCR",
    name: "BSC-20",
    supply: "100,000,000",
    progress: "0%",
    holders: "0",
    created: "2021-09-09 12:00:00"
  }
])
const keyword = ref("")
const searchClick = () => {
  console.log(keyword.value)
}
</script>
<script></script>
<style lang="scss" scoped>
.etchMiddle {
  padding: 90px 30px 0;
  .market_head {
    height: 3.33333rem !important;
    height: 200px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

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
        content: "";
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
      background-color: #1d1f28;
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

        & > div {
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
          display: flex;
          flex-direction: column;
          align-items:center;
          span {
            display: block;
            width: 80%;
            text-align: center;
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
.mintBtn {
  margin-right: 0.26667rem;
  background: #ffc107;
  color: #171a1f;
  border-radius: 0.21333rem;
  font-size: 0.32rem;
  font-weight: 600;
  text-align: center;
  padding: 0 20px;
  height: 0.8rem;
  line-height: 0.8rem;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  cursor: pointer;
}
/* 居中 */
.text-center {
  width: 100%;
  text-align: center;
}
</style>
