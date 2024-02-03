<!-- 一个Rune的详情页面 -->
<template>
  <div class="etchCon">
    <page-header />
    <div class="rune-view">
      <div class="rune-view__header">
        <div class="rune-view__header__title">
          <h1>{{ rune.name }}</h1>
        </div>
        <div class="rune-view__header__image">
          <img :src="rune.image" :alt="rune.name" />
        </div>
      </div>
      <div class="rune-view__content">
        <div class="rune-view__content__description">
          <p>{{ rune.description }}</p>
        </div>
        <div class="rune-view__content__stats">
          <div class="rune-view__content__stats__stat">
            <div class="rune-view__content__stats__stat__name">
              <h3>Attack</h3>
            </div>
            <div class="rune-view__content__stats__stat__value">
              <p>{{ rune.stats.attack }}</p>
            </div>
          </div>
          <div class="rune-view__content__stats__stat">
            <div class="rune-view__content__stats__stat__name">
              <h3>Defense</h3>
            </div>
            <div class="rune-view__content__stats__stat__value">
              <p>{{ rune.stats.defense }}</p>
            </div>
          </div>
          <div class="rune-view__content__stats__stat">
            <div class="rune-view__content__stats__stat__name">
              <h3>Magic</h3>
            </div>
            <div class="rune-view__content__stats__stat__value">
              <p>{{ rune.stats.magic }}</p>
            </div>
          </div>
          <div class="rune-view__content__stats__stat">
            <div class="rune-view__content__stats__stat__name">
              <h3>Difficulty</h3>
            </div>
            <div class="rune-view__content__stats__stat__value">
              <p>{{ rune.stats.difficulty }}</p>
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
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    &__title {
      h1 {
        font-size: 24px;
        font-weight: 700;
        color: #fff;
      }
    }
    &__image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  &__content {
    &__description {
      margin-bottom: 30px;
      p {
        font-size: 16px;
        font-weight: 400;
        color: #fff;
      }
    }
    &__stats {
      display: flex;
      justify-content: space-between;
      &__stat {
        width: 23%;
        &__name {
          h3 {
            font-size: 16px;
            font-weight: 400;
            color: #fff;
          }
        }
        &__value {
          p {
            font-size: 16px;
            font-weight: 400;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>