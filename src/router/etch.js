const route = [
	{
		path: '/',
		redirect: "/bscsMarket"
	},
	{
		path: '/bscsMarket',
		name: 'homePage',
		component: () => import('@/views/bscsIndex/index.vue'),
		meta: {
			title: 'BscsMarket',
			auth: true,
			keepAlive: false
		}
	},
	{
		path: '/Tokens',
		name: 'Tokens',
		component: () => import('@/views/bscsIndex/Tokens.vue'),
		meta: {
			title: 'Tokens',
			auth: true,
			keepAlive: false
		}
	},
  {
		path: '/bscsscriptions',
		name: 'Bscsscriptions',
		component: () => import('@/views/bscsIndex/bscsscriptions.vue'),
		meta: {
			title: 'Bscsscriptions',
			keepAlive: false
		}
	},
	{
		path: '/Token/Search',
		name: 'TokenSearch',
		component: () => import('@/views/bscsIndex/TokenSearch.vue'),
		meta: {
			title: 'TokenSearch',
			auth: true,
			keepAlive: false
		}
	},
	{
		path: '/Marketplace',
		name: 'Marketplace',
		component: () => import('@/views/bscsIndex/Marketplace.vue'),
		meta: {
			title: 'Marketplace',
			auth: true,
			keepAlive: false
		}
	},
	{
		path: '/RuneView',
		name: 'RuneView',
		component: () => import('@/views/bscsIndex/RuneView.vue'),
		meta: {
			title: 'Runes',
			auth: true,
			keepAlive: false
		}
	},
	{
		path: '/Runes',
		name: 'Runes',
		component: () => import('@/views/bscsIndex/Runes.vue'),
		meta: {
			title: 'Runes',
			auth: true,
			keepAlive: false
		}
	},
	{
		path: '/detailToken',
		name: 'detailToken',
		component: () => import('@/views/bscsIndex/detailToken.vue'),
		meta: {
			title: 'detailToken',
			auth: true,
			keepAlive: false
		}
	},

	{
		path: '/Deploymint',
		name: 'Deploymint',
		component: () => import('@/views/bscsIndex/Deploymint.vue'),
		meta: {
			title: 'Deploymint',
			auth: true,
			keepAlive: false
		}
	},
	
	{
		path: '/Deploymint',
		name: 'Deploymint',
		component: () => import('@/views/bscsIndex/Deploymint.vue'),
		meta: {
			title: 'Deploymint',
			auth: true,
			keepAlive: false
		}
	},

	{
		path: '/detailTokens',
		name: 'detailTokens',
		component: () => import('@/views/bscsIndex/detailTokens.vue'),
		meta: {
			title: 'DetailTokens',
			auth: true,
			keepAlive: false
		}
	},
	{
		path: '/MyEthscriptions',
		name: 'MyEthscriptions',
		component: () => import('@/views/bscsIndex/MyEthscriptions.vue'),
		meta: {
			title: 'MyBscscriptions',
			auth: true,
			keepAlive: false
		}
	}

]

export default route
