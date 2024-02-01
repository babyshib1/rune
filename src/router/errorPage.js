export const route = [{
	path: '/404',
	name: '404',
	component: () => import('views/errorPage/404.vue'),
	meta: {
		title: '404',
		keepAlive: true
	}
}]