<!-- 一个Rune的详情页面 -->
<template>
  <div class="etchCon">
    <page-header />
    <div class="rune-view">
      <h2 class="rune-title">RUNE</h2>

      <div class="rune-detail-info">
        <div class="rune-detail-info-left">
          <h3 class="rune-detail-info-title">BSCR POOL</h3>
          <div class="rune-detail-info-introduce">
            <p>Total supply: 210,000</p>
            <p>
              Only 50 valid minting transactions per block, and the fees for
              failed minting will be refunded.
            </p>
            <p>Automatic addition of 20% liquidity.</p>
            <p>
              Transaction tax: 5% (BSCR Fund Pool 2%, BSCS Fund Pool 2%,
              Marketing 1%).
            </p>
            <p>Every hour, 0.1% of BSCR in liquidity is burned.</p>
          </div>
          <div class="rune-mint-info">
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Total staking </span>
              <span class="rune-mint-info-item-value"
                >{{ beautyNumber(bscrPoolInfo.totalStake, 4) }} BSCR</span
              >
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Number of stakers</span>
              <span class="rune-mint-info-item-value">{{
                bscrPoolInfo.stakers
              }}</span>
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Fund pools</span>
              <span class="rune-mint-info-item-value"
                >{{ beautyNumber(bscrPoolInfo.fundPools, 4) }} BNB</span
              >
            </div>
          </div>
          <div class="rune-mint-address">
            <div class="rune-mint-address-item">
              <span class="rune-mint-address-item-title">Pledge contract</span>
              <span class="rune-mint-address-item-value">{{
                bscrPoolInfo.pledgeContract
              }}</span>
            </div>
            <div class="rune-mint-address-item">
              <span class="rune-mint-address-item-title">Token contract</span>
              <span class="rune-mint-address-item-value">{{
                bscrTokenContract
              }}</span>
            </div>
          </div>
        </div>
        <div class="rune-detail-info-right">
          <div class="rune-mint-info">
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Staking</span>
              <span class="rune-mint-info-item-value"
                >{{ beautyNumber(mineBscrInfo.staking, 4) }} BSCR</span
              >
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Bonus</span>
              <span class="rune-mint-info-item-value"
                >{{ beautyNumber(mineBscrInfo.bonus, 4) }} BNB</span
              >
            </div>
          </div>
          <div class="rune-console">
            <div class="rune-console-item">
              <span class="rune-console-item-title"
                >Stake:{{ beautyNumber(mineBscrInfo.balance, 4) }} BSCR
                <!-- <div class="slider-box">
                  <el-slider class="class-slider" v-model="rune.stats.attack" :min="0" :max="100" />
                </div> -->
              </span>
              <span
                v-if="
                  Number(mineBscrInfo.balance) > Number(mineBscrInfo.allowance)
                "
                class="rune-console-item-button"
                @click="approve"
              >
                Approve
              </span>
              <span v-else class="rune-console-item-button" @click="stake">
                Stake
              </span>
            </div>
            <div class="rune-console-item">
              <div class="rune-console-item-title">
                <div>Claim:{{ beautyNumber(mineBscrInfo.bonus, 4) }} BNB</div>
              </div>
              <span class="rune-console-item-button" @click="claim">Claim</span>
            </div>
            <div class="rune-console-item">
              <div class="rune-console-item-title">
                <div>
                  Redeem:{{ beautyNumber(mineBscrInfo.staking, 4) }} BSCR
                </div>
              </div>
              <span class="rune-console-item-button" @click="redeem"
                >Redeem</span
              >
            </div>
          </div>
          <div class="rune-detail-info-introduce">
            <p>
              Users can stake any amount of BSCR runes in the fund pool with a
              staking tax rate of 5%.
            </p>
            <p>Staking is used to share BNB from the staking pool.</p>
          </div>
        </div>
      </div>
      <div class="rune-detail-info">
        <div class="rune-detail-info-left">
          <h3 class="rune-detail-info-title">BSCS POOL</h3>
          <div class="rune-detail-info-introduce">
            <p>Total supply: 5000</p>
            <p>
              Users can stake any amount of BSCS inscription in the fund pool
              with a staking tax rate of 0%.
            </p>
            <p>Staking is used to share BNB from the staking pool.</p>
          </div>
          <div class="rune-mint-info">
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Total staking </span>
              <span class="rune-mint-info-item-value"
                >{{ beautyNumber(bscsPoolInfo.totalStake, 4) }} BSCS
              </span>
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Number of stakers</span>
              <span class="rune-mint-info-item-value">{{
                bscsPoolInfo.stakers
              }}</span>
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Fund pools</span>
              <span class="rune-mint-info-item-value"
                >{{ beautyNumber(bscsPoolInfo.fundPools, 4) }} BNB</span
              >
            </div>
          </div>
          <div class="rune-mint-address">
            <div class="rune-mint-address-item">
              <span class="rune-mint-address-item-title">Pledge contract</span>
              <span class="rune-mint-address-item-value">{{
                bscsPoolInfo.pledgeContract
              }}</span>
            </div>
          </div>
        </div>
        <div class="rune-detail-info-right">
          <div class="rune-mint-info">
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Staking</span>
              <span class="rune-mint-info-item-value"
                >{{ beautyNumber(mineBscsInfo.staking, 4) }} BSCS</span
              >
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Bonus</span>
              <span class="rune-mint-info-item-value"
                >{{ beautyNumber(mineBscsInfo.bonus, 4) }} BNB</span
              >
            </div>
          </div>
          <div class="rune-console">
            <div class="rune-console-item">
              <span class="rune-console-item-title"
                >Stake:{{ beautyNumber(mineBscsInfo.staking, 4) }} BSCS</span
              >
              <span class="rune-console-item-button">Stake</span>
            </div>
            <div class="rune-console-item">
              <div class="rune-console-item-title">
                <div>Claim:{{ beautyNumber(mineBscsInfo.bonus, 4) }} BNB</div>
              </div>
              <span class="rune-console-item-button">Claim</span>
            </div>
            <div class="rune-console-item">
              <div class="rune-console-item-title">
                <div>
                  Redeem:{{ beautyNumber(mineBscsInfo.staking, 4) }} BSCS
                </div>
              </div>
              <span class="rune-console-item-button">Redeem</span>
            </div>
            <div class="rune-detail-info-introduce">
              <p>
                Users can stake any amount of BSCS inscription in the fund pool
                with a staking tax rate of 0%.
              </p>
              <p>Staking is used to share BNB from the staking pool.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-dialog width="30%" append-to-body class="connect_dialog" v-model="connectDialog">
      <div class="dialog-box">
        <span>
          Stake:{{ stakeValue }}
        </span>
        <div class="slider-box"> <el-slider v-model="stakeValue" :min="0" :max="100" /></div>
        <div class="btn">
          Stake
        </div>
      </div>
    </el-dialog> -->
  </div>
</template>
<script lang="ts" setup>
import { ElLoading, ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import web3 from "web3";
import bscrABI from "@/plugins/contracts/abis/bscr";
import bscrStakeABI from "@/plugins/contracts/abis/bscrStake";

const rune = ref({
  name: "RUNE",
  image:
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg",
  description: "",
  stats: {
    attack: 10,
    defense: 10,
    magic: 10,
    difficulty: 10,
  },
});
// TODO 修改token合约 和 质押合约 其他无需修改
const bscrTokenContract = ref("0x40249a500d9e74B0c951631Fe576D7eF46598545");
const bscrPoolInfo = ref({
  totalStake: "0",
  stakers: "0",
  fundPools: "0",
  pledgeContract: "0x12e1ab713E98323C997fFf02E65F64F330ff1c14",
});
const bscsPoolInfo = ref({
  totalStake: "0",
  stakers: "0",
  fundPools: "0",
  pledgeContract: "--", // 固定地址 0xaE73066BfC1986dD9ff5E85F3162A23e74839d12
});
const mineBscrInfo = ref({
  staking: "0",
  bonus: "0",
  balance: "0",
  allowance: "0",
});
const mineBscsInfo = ref({
  staking: "0",
  bonus: "0",
  balance: "0",
});

const loading = ref(null);
// 打开loading
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

const syncInfos = async () => {
  const ethereum = (window as any).ethereum;
  if (!ethereum) return;
  const provider = new web3(ethereum);
  const targetChainId = await provider.eth.getChainId();
  if (targetChainId !== 56)
    return ElMessage({
      message: "Please switch to BSC network.",
      type: "error",
    });
  const bscrContract = new provider.eth.Contract(
    bscrABI as any,
    bscrTokenContract.value
  );
  const bscrStakeContract = new provider.eth.Contract(
    bscrStakeABI as any,
    bscrPoolInfo.value.pledgeContract
  );
  const account = await provider.eth.getAccounts().then((res) => res[0]);
  bscrStakeContract.defaultAccount = account;

  try {
    const totalStake = await bscrStakeContract.methods.totalStake().call();
    const stakers = await bscrStakeContract.methods.getStakeCount().call();
    const fundPools = await provider.eth.getBalance(
      bscrPoolInfo.value.pledgeContract
    );
    bscrPoolInfo.value.totalStake = web3.utils.fromWei(
      totalStake as any,
      "ether"
    );
    bscrPoolInfo.value.stakers = stakers;
    bscrPoolInfo.value.fundPools = web3.utils.fromWei(
      fundPools as any,
      "ether"
    );
  } catch (e) {
    console.log(e);
  }

  try {
    const userInfo: any = await bscrStakeContract.methods.getUserInfo().call();
    const balance = await bscrContract.methods.balanceOf(account).call();
    const allowance = await bscrContract.methods
      .allowance(account, bscrPoolInfo.value.pledgeContract)
      .call();
    mineBscrInfo.value.staking = web3.utils.fromWei(
      userInfo.stakeAmount,
      "ether"
    );
    mineBscrInfo.value.bonus = web3.utils.fromWei(userInfo.reward, "ether");
    mineBscrInfo.value.balance = web3.utils.fromWei(balance as any, "ether");
    mineBscrInfo.value.allowance = web3.utils.fromWei(
      allowance as any,
      "ether"
    );
  } catch (e) {
    console.log(e);
  }

  try {
    const fundPools = await provider.eth.getBalance(
      "0xaE73066BfC1986dD9ff5E85F3162A23e74839d12"
    );
    bscsPoolInfo.value.fundPools = web3.utils.fromWei(
      fundPools as any,
      "ether"
    );
  } catch (e) {
    console.log(e);
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));
  syncInfos();
};

const approve = async () => {
  const execute = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;
    const provider = new web3(ethereum);
    const targetChainId = await provider.eth.getChainId();
    if (targetChainId !== 56)
      return ElMessage({
        message: "Please switch to BSC network.",
        type: "error",
      });
    const bscrContract = new provider.eth.Contract(
      bscrABI as any,
      bscrTokenContract.value
    );
    const account = await provider.eth.getAccounts().then((res) => res[0]);
    bscrContract.defaultAccount = account;

    try {
      const params = [
        bscrPoolInfo.value.pledgeContract,
        web3.utils.toWei(mineBscrInfo.value.balance, "ether"),
      ];
      const gas = await bscrContract.methods
        .approve(...params)
        .estimateGas({ from: account });
      const tx = await bscrContract.methods.approve(...params).send({
        from: account,
        gas: Math.floor(gas * 1.5),
        gasPrice: 3e9,
      });
      console.log(tx);
      ElMessage({
        message: `Approve transaction has been sent. ${tx.transactionHash}`,
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
const stake = async () => {
  if (mineBscrInfo.value.balance === "0")
    return ElMessage({
      message: "No Balance",
      type: "error",
    });

  const execute = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;
    const provider = new web3(ethereum);
    const targetChainId = await provider.eth.getChainId();
    if (targetChainId !== 56)
      return ElMessage({
        message: "Please switch to BSC network.",
        type: "error",
      });
    const bscrStakeContract = new provider.eth.Contract(
      bscrStakeABI as any,
      bscrPoolInfo.value.pledgeContract
    );
    const account = await provider.eth.getAccounts().then((res) => res[0]);
    bscrStakeContract.defaultAccount = account;

    try {
      const params = [web3.utils.toWei(mineBscrInfo.value.balance, "ether")];
      const gas = await bscrStakeContract.methods
        .stake(...params)
        .estimateGas({ from: account });
      const tx = await bscrStakeContract.methods
        .stake(web3.utils.toWei(mineBscrInfo.value.balance, "ether"))
        .send({
          from: account,
          gas: Math.floor(gas * 1.5),
          gasPrice: 3e9,
        });
      console.log(tx);
      ElMessage({
        message: `Stake transaction has been sent. ${tx.transactionHash}`,
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
const claim = async () => {
  if (mineBscrInfo.value.bonus === "0")
    return ElMessage({
      message: "No Bones",
      type: "error",
    });

  const execute = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;
    const provider = new web3(ethereum);
    const targetChainId = await provider.eth.getChainId();
    if (targetChainId !== 56)
      return ElMessage({
        message: "Please switch to BSC network.",
        type: "error",
      });
    const bscrStakeContract = new provider.eth.Contract(
      bscrStakeABI as any,
      bscrPoolInfo.value.pledgeContract
    );
    const account = await provider.eth.getAccounts().then((res) => res[0]);
    bscrStakeContract.defaultAccount = account;

    try {
      const params = [];
      const gas = await bscrStakeContract.methods
        .claim(...params)
        .estimateGas({ from: account });
      const tx = await bscrStakeContract.methods.claim(...params).send({
        from: account,
        gas: Math.floor(gas * 1.5),
        gasPrice: 3e9,
      });
      console.log(tx);
      ElMessage({
        message: `Claim transaction has been sent. ${tx.transactionHash}`,
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
const redeem = async () => {
  if (mineBscrInfo.value.staking === "0")
    return ElMessage({
      message: "No Stake",
      type: "error",
    });

  const execute = async () => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;
    const provider = new web3(ethereum);
    const targetChainId = await provider.eth.getChainId();
    if (targetChainId !== 56)
      return ElMessage({
        message: "Please switch to BSC network.",
        type: "error",
      });
    const bscrStakeContract = new provider.eth.Contract(
      bscrStakeABI as any,
      bscrPoolInfo.value.pledgeContract
    );
    const account = await provider.eth.getAccounts().then((res) => res[0]);
    bscrStakeContract.defaultAccount = account;

    try {
      const params = [];
      const gas = await bscrStakeContract.methods
        .redeem(...params)
        .estimateGas({ from: account });
      const tx = await bscrStakeContract.methods.redeem(...params).send({
        from: account,
        gas: Math.floor(gas * 1.5),
        gasPrice: 3e9,
      });
      console.log(tx);
      ElMessage({
        message: `Redeem transaction has been sent. ${tx.transactionHash}`,
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
  syncInfos();
});

// 用于处理小数点后位数过多的情况，notZeroFixed表示小数点后不为0的位数
const beautyNumber = (
  n: string | number,
  fixed: number,
  notZeroFixed?: number
) => {
  n = n.toString();
  const dotIdx = n.indexOf(".");
  if (dotIdx == -1) return n;
  const notZeroIdx = n.split(".")[1].search(/[^0]/);
  if (notZeroIdx) {
    notZeroFixed = notZeroFixed || Math.ceil(fixed / 2);
    n = n.slice(0, dotIdx + notZeroIdx + notZeroFixed + 1);
  } else n = n.slice(0, dotIdx + fixed + 1);
  return n.replace(/0*$/, "").replace(/\.$/, "");
};
</script>
<style lang="scss" scoped>
.etchCon {
  padding: 90px 30px 0;
}

.rune-view {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;

  .rune-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #fff;
    text-align: center;
  }

  .rune-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #000;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }

  .rune-detail-info {
    display: flex;
    justify-content: space-between;
    align-items: normal;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  .rune-detail-info-left,
  .rune-detail-info-right {
    background-color: #000;
    border-radius: 10px;
    padding: 16px;
  }

  .rune-detail-info-left {
    width: 65%;

    .rune-detail-info-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #fff;
      text-align: center;
    }

    .rune-mint-address {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .rune-mint-address-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .rune-mint-address-item-title {
          font-size: 14px;
          color: #fff;
          margin-right: 10px;
        }

        .rune-mint-address-item-value {
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }

  .rune-detail-info-introduce {
    color: #a3a3a3;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  .rune-detail-info-right {
    width: 34%;
  }

  .rune-mint-info {
    display: flex;
    justify-content: space-between;

    .rune-mint-info-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .rune-mint-info-item-title {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
      }

      .rune-mint-info-item-value {
        font-size: 16px;
        color: #fff;
      }
    }
  }

  .rune-console {
    margin-top: 20px;

    .rune-console-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .background {
        padding: 10px /*  */;
        background-color: #999;
      }

      .rune-console-item-title {
        font-size: 14px;
        color: #fff;
        width: 100%;
        display: flex;
        align-items: center;

        .slider-box {
          width: 50%;
          margin-left: 15px;

          .class-slider {
          }
        }

        .rune-console-item-subtitle {
          font-size: 12px;
          color: #999;
        }
      }

      .rune-console-item-button {
        padding: 5px 10px;
        border-radius: 5px;
        background: #ffc107;
        color: #000;
        cursor: pointer;
        font-size: 14px;
        /*  */
      }
    }
  }
}

.dialog-box {
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;

  .slider-box {
    width: 50%;
    margin-left: 15px;
  }

  .btn {
    display: flex;
    justify-content: space-between;

    margin-top: 20px;
    background-color: #ffc107;
    padding: 10px 20px;
    border-radius: 5px;
  }
}

/* 手机端 */
@media (max-width: 768px) {
  .rune-view {
    padding: 0 0px;
  }

  .rune-detail-info {
    flex-direction: column;
    padding: 0 !important;
  }

  .rune-detail-info-left,
  .rune-detail-info-right {
    width: 100% !important;
    margin-top: 20px;
  }
}
</style>
