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
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </div>
          <div class="rune-mint-info">
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Total staking </span>
              <span class="rune-mint-info-item-value">10</span>
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Number of stakers</span>
              <span class="rune-mint-info-item-value">10</span>
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Fund pools(BNB)</span>
              <span class="rune-mint-info-item-value">10</span>
            </div>
          </div>
          <div class="rune-mint-address">
            <div class="rune-mint-address-item">
              <span class="rune-mint-address-item-title">Pledge contract</span>
              <span class="rune-mint-address-item-value">10</span>
            </div>
            <div class="rune-mint-address-item">
              <span class="rune-mint-address-item-title">Token contract</span>
              <span class="rune-mint-address-item-value">0x123123123123</span>
            </div>
          </div>
        </div>
        <div class="rune-detail-info-right">
          <div class="rune-mint-info">
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Staking</span>
              <span class="rune-mint-info-item-value">10 BSCR</span>
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Bonus</span>
              <span class="rune-mint-info-item-value">10 BNB</span>
            </div>
          </div>
          <div class="rune-console">
            <div class="rune-console-item">
              <span class="rune-console-item-title background">Stake XboneLP:0</span>
              <span class="rune-console-item-button">Stake</span>
            </div>
            <div class="rune-console-item">
              <div class="rune-console-item-title">
                <div>Claim (tax %)</div>
                <div class="rune-console-item-subtitle">BNB</div>
              </div>
              <span class="rune-console-item-button">Claim</span>
            </div>
            <div class="rune-console-item">
              <div class="rune-console-item-title">
                <div>Redeem</div>
                <div class="rune-console-item-subtitle">RedeemBSCR NBN</div>
              </div>
              <span class="rune-console-item-button">Redeem</span>
            </div>
          </div>
        </div>
      </div><div class="rune-detail-info">
        <div class="rune-detail-info-left">
          <h3 class="rune-detail-info-title">BSCS POOL</h3>
          <div class="rune-detail-info-introduce">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </div>
          <div class="rune-mint-info">
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Total staking </span>
              <span class="rune-mint-info-item-value">10 </span>
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Number of stakers</span>
              <span class="rune-mint-info-item-value">10</span>
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Fund pools(BNB)</span>
              <span class="rune-mint-info-item-value">10</span>
            </div>
          </div>
          <div class="rune-mint-address">
            <div class="rune-mint-address-item">
              <span class="rune-mint-address-item-title">Pledge contract</span>
              <span class="rune-mint-address-item-value">10</span>
            </div>
            <div class="rune-mint-address-item">
              <span class="rune-mint-address-item-title">Token contract</span>
              <span class="rune-mint-address-item-value">0x123123123123</span>
            </div>
          </div>
        </div>
        <div class="rune-detail-info-right">
          <div class="rune-mint-info">
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Staking</span>
              <span class="rune-mint-info-item-value">10 BSCS</span>
            </div>
            <div class="rune-mint-info-item">
              <span class="rune-mint-info-item-title">Bonus</span>
              <span class="rune-mint-info-item-value">10 BNB</span>
            </div>
          </div>
          <div class="rune-console">
            <div class="rune-console-item">
              <span class="rune-console-item-title background">Stake XboneLP:0</span>
              <span class="rune-console-item-button">Stake</span>
            </div>
            <div class="rune-console-item">
              <div class="rune-console-item-title">
                <div>Claim (tax %)</div>
                <div class="rune-console-item-subtitle">BNB</div>
              </div>
              <span class="rune-console-item-button">Claim</span>
            </div>
            <div class="rune-console-item">
              <div class="rune-console-item-title">
                <div>Redeem</div>
                <div class="rune-console-item-subtitle">RedeemBSCR NBN</div>
              </div>
              <span class="rune-console-item-button">Redeem</span>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
const rune = ref({
  name: "RUNE",
  image:
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg",
  description: "",
  stats: {
    attack: 10,
    defense: 10,
    magic: 10,
    difficulty: 10
  }
})
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
    align-items: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  .rune-detail-info-left,
  .rune-detail-info-right {
    height: 300px;
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
    .rune-detail-info-introduce {
      color: #fff;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
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
          font-size: 16px;
          color: #fff;
        }
      }
    }
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
      .background{
        padding: 10px/*  */;
        background-color: #999;
      }
      .rune-console-item-title {
        font-size: 14px;
        color: #fff;
        .rune-console-item-subtitle {
          font-size: 12px;
          color: #999;

        }
      }
      .rune-console-item-button {
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px solid #fff;
        color: #fff;
        cursor: pointer;
        font-size: 14px;/*  */
      }
    }
  }
}

</style>
