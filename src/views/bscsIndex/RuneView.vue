<!-- 一个Rune的详情页面 -->
<template>
  <div class="etchCon">
    <page-header />
    <div class="rune-view">
      <h2 class="rune-title">RUNE</h2>
      <div class="rune-detail"></div>
      <div class="rune-detail-info">
        <div class="rune-detail-info-left">
          <h3 class="rune-detail-info-title">BSCR</h3>
          <div class="rune-detail-info-desc">
            <div class="rune-detail-info-desc-item">
              <span class="rune-detail-info-desc-item-title">Attack</span>
              <span class="rune-detail-info-desc-item-value">10</span>
            </div>
            <div class="rune-detail-info-desc-item">
              <span class="rune-detail-info-desc-item-title">Attack</span>
              <span class="rune-detail-info-desc-item-value">10</span>
            </div>
            <div class="rune-detail-info-desc-item">
              <span class="rune-detail-info-desc-item-title">Attack</span>
              <span class="rune-detail-info-desc-item-value">10</span>
            </div>
          </div>
        </div>
        <div class="rune-detail-info-right">
          <h3 class="rune-detail-info-title">BSCR</h3>
          <div class="rune-detail-info-desc">
            <div class="rune-detail-info-desc-item">
              <span class="rune-detail-info-desc-item-title">Attack</span>
              <span class="rune-detail-info-desc-item-value">10</span>
            </div>
            <div class="rune-detail-info-desc-item">
              <span class="rune-detail-info-desc-item-title">Attack</span>
              <span class="rune-detail-info-desc-item-value">10</span>
            </div>
            <div class="rune-detail-info-desc-item">
              <span class="rune-detail-info-desc-item-title">Attack</span>
              <span class="rune-detail-info-desc-item-value">10</span>
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
  .rune-detail-info-left {
    width: 49%;
    height: 300px;
    background-color: #000;
    border-radius: 10px;
    /*  */
  }
  .rune-detail-info-right {
    width: 49%;
    height: 300px;
    background-color: #000;
    border-radius: 10px;
  }
  .rune-detail-info-right,.rune-detail-info-left{
    padding: 26px;
    .rune-detail-info-title{
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #fff;
      text-align: center;
    }
    .rune-detail-info-desc {
      padding: 20px;
      .rune-detail-info-desc-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        font-size: 16px;
        .rune-detail-info-desc-item-title {
          color: #fff;
        }
        .rune-detail-info-desc-item-value {
          color: #fff;
        }
      }
    }

  }
}
</style>
