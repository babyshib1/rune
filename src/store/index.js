import {createStore, createLogger} from 'vuex'

import dic from './modules/dic'
import direction from './modules/direction'
import wallet from './modules/wallet'

import getters from './getters'


const debug = import.meta.env.VITE_NODE_ENV !== 'production'

const store = createStore({
  modules: {
    dic,
    direction, wallet
  },
  getters
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})

export default store
