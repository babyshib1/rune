<template>
  <el-dialog append-to-body class="margeComponentDialog" :model-value="status" width="800px"
             :close-on-click-modal="false"
             :show-close="false">
    <template #header>
      <div class="header"><span class="tick">{{ info.tick }}</span> <span class="p">{{ info.type }}</span> for
        marge ticks
      </div>
    </template>
    <div class="main">
      <swiper @slide-change="getNextPage" :space-between="30" slides-per-view="auto">
        <swiper-slide v-for="item in tables" :key="item.id" class="swiper_main" @click="select(item)">
          <div class="top">
            <div class="tick">
              <span>{{ info.tick }}</span>
              <van-icon v-if="selectIds[item.tick_id]" style="color: #17d417;" name="checked"/>
            </div>
            <div class="tag">
              <el-tag type="info">{{ info.type }}</el-tag>
              <el-tag type="info">{{ (item.op||"Mint").toLowerCase() }}</el-tag>
            </div>
            <div v-if="!item.ord" class="num">{{ item.lim }}</div>
            <div v-if="item.ord" class="num">{{ $Utils.rpZero(item.price || '0') }} BNB</div>
          </div>
          <div class="bottom">
            <div class="row">
              <div class="col_left">#{{ item.tick_id }}</div>
              <div class="col_righ">you</div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <template #footer>
      <div class="footer">
        <el-button class="btn_cancel" @click="cancel">Cancel</el-button>
        <el-button class="btn_listing" @click="marge">Marge</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import {Swiper, SwiperSlide} from "swiper/vue"
import {computed, ref, watch} from "vue"
import {useApiTokenInfo, useApiUserTokens} from "@/hooks/api"
import {useStore} from "vuex"
import 'swiper/swiper.min.css'
import {ElMessage} from "element-plus"

const store = useStore()
const emit = defineEmits(['update:modelValue', "marge"])
const address = computed(() => store.state.wallet.address)
const props = defineProps({
  id: Number,
  modelValue: Boolean
})
const status = ref(props.modelValue)
const info = useApiTokenInfo(props.id)
const selectIds = ref({})
const tables = ref([])
const {reset, size, page, total, list} = useApiUserTokens(props.id, 5, 1,false)

watch(list, () => {
  let v = []
  if (page.value === 1) {
    v = list.value
  } else {
    tables.value.push(...list.value)
    return false
  }
  tables.value = v
})
watch(props, () => {
  status.value = props.modelValue
  selectIds.value = {}
  if (props.modelValue) {
    reset()
  }
})
watch(address, () => {
  selectIds.value = {}
  reset()
})

function select(data) {
  selectIds.value[data.tick_id] = !selectIds.value[data.tick_id]
}

function getNextPage(el) {
  let index = el.activeIndex + 2
  if ((index === tables.value.length) && (tables.value.length < total.value)) {
    page.value++
  }
}

function cancel() {
  status.value = false
  emit("update:modelValue", status.value)
}

function marge() {
  let eids = []
  for (let i in selectIds.value) {
    if (selectIds.value[i]) {
      eids.push(i)
    }
  }

  if (eids.length > 1) {
    emit("marge", eids)
  } else {
    ElMessage.warning("Click tick to select, at least two ticks can be used to marge")
  }
}
</script>
<style lang="scss">

.margeComponentDialog {
  &.el-dialog {
    background-color: #313439;
    border-radius: 10px;
  }


  .el-dialog__header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-right: 0;
  }

  .header {
    user-select: none;
    color: white;
    font-size: 16px;
    padding-bottom: 10px;

    .tick {
      color: #ffc107;
    }

    .p {
      border-radius: 5px;
      padding: 0 8px;
      background: rgba(255, 255, 255, 0.1);
      color: rgb(255, 255, 255);
      font-size: 12px;
      display: inline-block;
    }
  }

  .el-dialog__body {
    padding: 40px 20px 20px;
  }

  .main {
    min-height: 300px;

    .swiper_main {
      width: 200px;
      background: #202229;
      border-radius: 5px;
      border: 1px solid #2a2e3b;
      user-select: none;

      .top,
      .bottom {
        padding: 20px;
      }

      .top {
        height: 220px;

        .tick {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          color: #ffc107;

          span {
            max-width: 80%;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            flex: 1;
            text-overflow: ellipsis;
          }
        }

        .tag {
          padding: 5px 0;

          .el-tag {
            margin-right: 5px;
            background-color: transparent;
            color: #999;
            border-color: #999;
            height: auto;
            padding: 2px 8px;
            min-height: 19px;

            &::v-deep {
              span {
                display: block;
                transform: scale(0.8);
              }
            }
          }
        }

        .num {
          padding: 20px 0 15px;
          text-align: center;
          color: #ffc107;
          font-size: 20px;
        }
      }

      .bottom {
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
        }

        color: white;
        background-color: #2b2d34;

      }

    }
  }

  .footer {
    .btn_cancel {
      background-color: transparent;
      border: 1px solid #fff;
      width: 60px;
      color: #fff;
    }

    .btn_listing {
      background-color: #ffc107;
      border: 1px solid #ffc107;
      width: 60px;
      color: #000;
    }
  }

}
</style>
