import request from '@/utils/request'

export const etchService = {
	myHelpFriend(data) {
		return request({
			url: '/v2/activity/myHelpFriend',
			method: 'post',
			data
		})
	},
	fissionAwardInfo(data) {
		return request({
			url: '/v2/activity/fissionAwardInfo',
			method: 'post',
			data
		})
	},
}