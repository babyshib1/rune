<template>
  <div class="etchCon">
    <page-header/>
    <div class="etchMiddle">
      <div class="disFlexImg">
        <img src="@/assets/images/logo.png" alt="">
        <p>BS<span>C</span>S</p>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.etchCon {
  position: relative;

  .etchMiddle {
    height: calc(100vh - 130px);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .disFlexImg {
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 140px;
      }
      p{
        font-size: 80px;
        font-weight: bold;
        color: #fff;

        span {
          color: #ffc107;
        }
      }
    }
  }
}
</style>
<script setup>
</script>
