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
        <div class="sub-title">bsc-20 rune platform</div>
      </div>
    </div>
    <div class="table mw">
      <div class="scroll">
        <div class="tableList">
          <div class="tableLeft">
            <p>Rune</p>
            <p class="text-center">Suppli</p>
            <p class="text-center">Progress</p>
            <p class="text-center">Holders</p>
            <p class="text-center">Deploy Time</p>
            <p></p>

            <p style="width: 20px; flex: none; height: 1px"></p>
          </div>
          <div
            class="tableFlex"
            v-for="(item, index) in [bscr]"
            :key="index"
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
                  <div class="index" :style="`width: ${item.progress}`"></div>
                </div>
              </div>

              <div>
                <div class="text-center">{{ item.minterCount }}</div>
              </div>

              <div>
                <div class="text-center">{{ item.created }}</div>
              </div>

              <div>
                <button
                  class="mintBtn"
                  v-if="bscr.mintedCount >= bscr.maxMintCount"
                  @click.stop=""
                >
                  Full
                </button>
                <button class="mintBtn" v-else @click.stop="mint">Mint</button>
              </div>
            </div>
          </div>
          <div class="pageNum">
            <div class="MuiPagination-ul"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElLoading, ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import bscrABI from "../../plugins/contracts/abis/bscr";
import web3 from "web3";

const loading = ref(null);
const openLoading = () => {
  loading.value = ElLoading.service({
    lock: true,
    text: "Loading", // 加载的文字
    background: "rgba(0, 0, 0, 0.7)",
  });
};
// 关闭loading
const closeLoading = () => {
  loading.value.close();
};
const bscr = ref({
  type: "BSCR",
  name: "BSC-20",
  supply: "210,000",
  progress: "0%",
  mintedCount: 0,
  minterCount: 0,
  // TODO 这部分可能需要修改，比如maxMintCount上线后应该为210000, 时间为部署合约的时间, mintValue为0.005BNB，合约需要修改
  address: "0x29Ba2AEBC809Af28c553b3f04c8Fea7b7337d477",
  created: "2024-02-07 09:39:10",
  mintValue: web3.utils.toBN(1e18 * 0.005),
  maxMintCount: 210000, //
});
const keyword = ref("");
const searchClick = () => {
  console.log(keyword.value);
};
const syncBscr = async () => {
  try {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;
    const provider = new web3(ethereum);
    const bscrContract = new provider.eth.Contract(
      bscrABI as any,
      bscr.value.address
    );
    const mintValue = await bscrContract.methods.MINT_VALUE().call();
    const mintedCount = await bscrContract.methods.mintedCount().call();
    const minterCount = await bscrContract.methods.minterCount().call();
    bscr.value.mintValue = web3.utils.toBN(mintValue);
    bscr.value.mintedCount = mintedCount;
    bscr.value.minterCount = minterCount;
    bscr.value.progress = `${((mintedCount / bscr.value.maxMintCount) * 100)
      .toFixed(2)
      .replace(".00", "")}%`;
  } catch (e) {
    console.log(e);
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));
  syncBscr();
};

const mint = async () => {
  if (bscr.value.mintedCount >= bscr.value.maxMintCount)
    return ElMessage({
      message: "Full",
      type: "error",
    });

  const execute = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      ElMessage({
        message: "Please connect wallet first.",
        type: "error",
      });
      return;
    }
    try {
      const provider = new web3(ethereum);
      const txReq = {
        from: await provider.eth.getAccounts().then((res) => res[0]),
        to: bscr.value.address,
        value: bscr.value.mintValue,
        data: "0x1249c58b",
      };
      const gas = await provider.eth.estimateGas(txReq);
      const tx = await provider.eth.sendTransaction({
        ...txReq,
        gas: Math.floor(gas * 1.5),
        gasPrice: 3e9,
      });
      ElMessage({
        message: `Mint transaction has been sent. ${tx.transactionHash}`,
        type: "info",
      });
    } catch (e) {
      let msg: any = e.message?.message || e.reason || e.message || e;
      try {
        msg = JSON.parse(msg.split("\n").slice(1).join(""));
        msg = msg.message;
      } catch (e) {}
      ElMessage({
        message: msg,
        type: "error",
      });
    }
  };

  openLoading();
  await execute();
  closeLoading();
};

onMounted(() => {
  syncBscr();
});
</script>

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

    .sub-title {
      font-size: 14px;
      color: #fff;
      padding: 0;
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
          align-items: center;

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
.btnbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .etchMiddle {
    padding: 90px 20px 0 !important;
  }

  .etchInput {
    width: 100% !important;

    button {
      width: 100%;
    }
  }

  .scroll {
    max-width: 100vw;
    overflow: auto;
  }

  .tableList {
    min-width: 900px !important;
  }
}
</style>
