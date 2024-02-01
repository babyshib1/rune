import {createRouter,createWebHashHistory} from 'vue-router'
import store from '../store'
const modules = import.meta.globEager('./*.js') || []
const routes = Object.values(modules).reduce((acc, cur) => [...acc, ...Object.values(cur)], []).flat()
const {BASE_URL,VITE_CDP_URL,VITE_CDP_KEY} = import.meta.env
const router = createRouter({
	history: createWebHashHistory(BASE_URL),
	routes: [
		...routes,
		{
			path: '/:pathMatch(.*)',
			redirect: '/404'
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
		return {
			x: 0,
			y: 0
		}
	}
})
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
router.beforeEach((to, from, next) => {
	document.documentElement.scrollTop = document.body.scrollTop = 0
	if (to.params.direction) {
		store.commit('direction/updateDirection', to.params.direction)
	} else {
		const toIndex = history.getItem(to.path)
		const fromIndex = history.getItem(from.path)
		// 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
		if (toIndex) {
			if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
				store.commit('direction/updateDirection', 'forward')
			} else {
				store.commit('direction/updateDirection', 'back')
			}
		} else {
			++historyCount
			history.setItem('count', historyCount)
			to.path !== '/' && history.setItem(to.path, historyCount)
			store.commit('direction/updateDirection', 'forward')
		}
	}

	// // 加载 linkflow.min.js
	// if (!window.linkflow) {
	// 	let script = document.createElement('script')
	// 	script.async = false
	// 	script.defer = false
	// 	script.setAttribute('type', 'text/javascript')
	// 	script.src = `${VITE_CDP_URL}/linkflow.min.js?token=${VITE_CDP_KEY}&baseDomain=${VITE_CDP_URL}`
	// 	document.head.appendChild(script)
	// 	script.addEventListener('load', next())
	// 	return
	// }
	next()
})

router.afterEach((to, from) => {
	let bodySrcollTop = document.body.scrollTop
	if (bodySrcollTop !== 0) {
		document.body.scrollTop = 0
		return
	}
	let docSrcollTop = document.documentElement.scrollTop
	if (docSrcollTop !== 0) {
		document.documentElement.scrollTop = 0
	}
})

export default router