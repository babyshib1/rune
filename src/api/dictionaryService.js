import request from '@/utils/request'

// 公共接口
export const dictionaryService = {
	/**
	 * @function {获取下拉选项}
	 * @param  {type} data {}
	 * @return {type} {*}
	 */
	getDictionary(code) {
		return request({
			url: '/v1/common/getDictionary?prefix=' + code,
			method: 'get'
		})
	},
	/**
	 * @function {获取省市}
	 * @param  {type} data {}
	 * @return {type} {*}
	 */
	getProvinceAndCity(data) {
		return request({
			url: '/v1/vip/areas/allArea',
			method: 'post',
			data
		})
	},
	/**
	 * @function 查询门店列表
	 */
	getStoreList(data) {
		return request({
			url: `/v1/test/drive/queryStoreCityList`,
			method: 'get',
			params: data
		})
	}
}