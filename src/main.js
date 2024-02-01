import {createApp} from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import '@/utils/permission'
import defaultSettings from '@/settings'
import router from './router'
import store from './store'
import VConsole from 'vconsole'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import contract from '@/plugins/contracts'
import {
  Field,
  Checkbox,
  Toast,
  Popup,
  Notify,
  Form,
  Overlay,
  Button,
  Dialog,
  Icon,
  Slider,
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  Picker,
  Loading,
  CountDown,
  List
} from 'vant'

import CDP_LINKFLOW from '@/utils/cdp.js'
import constcontext from '@/utils/context.js'

const app = createApp(App)

app.config.globalProperties.$CDP_LINKFLOW = CDP_LINKFLOW
app.config.globalProperties.$context = constcontext

app
  .use(router)
  .use(store)
  .use(Field)
  .use(Checkbox)
  .use(Toast)
  .use(Popup)
  .use(Notify)
  .use(Form)
  .use(Overlay)
  .use(Button)
  .use(Dialog)
  .use(Icon)
  .use(Slider)
  .use(Radio)
  .use(RadioGroup)
  .use(Cell)
  .use(CellGroup)
  .use(Swipe)
  .use(SwipeItem)
  .use(Picker)
  .use(Loading)
  .use(CountDown)
  .use(List)
  .use(ElementPlus)
  .use(contract)

if (import.meta.env.MODE === 'development' && defaultSettings.vconsole) {
  new VConsole()
}

const components = import.meta.globEager('./components/*.vue')

for (let url in components) {
  let name = url.replace(/(^.\/?components)|(.vue$)|(\/)/g, '')
  app.component(name, components[url].default)
}

app.mount('#app')
