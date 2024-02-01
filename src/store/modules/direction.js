const state = () => ({
  type: 'forward' // 页面切换方向
})

const mutations = {
  // 更新页面切换方向
  updateDirection(state, type) {
    state.type = type
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
