import request from '@/utils/request'

export const systemService = {
	getSign(data) {
		return request({
			url: '/v2/sign/get',
			method: 'post',
			data,
			noEncrypt: true
		})
	},
	postExample01(data) {
		return request({
			url: '/v2/sign/postExample02',
			method: 'post',
			data
		})
	}
}