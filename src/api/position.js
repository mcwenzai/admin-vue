import request from '@/utils/request'

const _URI = '/mall/address/'

/**
 *  @name: getProvince
 *  @desc: 获得所有省级数据
 */
export function getProvince() {
	return request({
		url: _URI + 'getAllProvince',
		method: 'get',
	})
}

/**
 *  @name: getCityList
 *  @desc: 按省编码查找市数据
 */
export function getCityList(provinceCode) {
	return request({
		url: `${_URI}getCityList/${provinceCode}`,
		method: 'get',
	})
}

/**
 *  @name: getDistrictList
 *  @desc: 按市编码查找县/区数据
 */
export function getDistrictList(cityCode) {
	return request({
		url: `${_URI}getDistrictList/${cityCode}`,
		method: 'get',
	})
}

/**
 *  @name: getTownList
 *  @desc: 按县编码查找街道数据
 */
export function getTownList(districtCode) {
	return request({
		url: `${_URI}getTownList/${districtCode}`,
		method: 'get',
	})
}
