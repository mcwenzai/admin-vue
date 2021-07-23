import request from '@/utils/request'

/**
 * @name: addBrand
 * @desc: 新增品牌
 */
export function addBrand(data) {
	return request({
		url: '/mall/brand',
		method: 'post',
		data,
	})
}

/**
 * @name: editBrand
 * @desc: 编辑品牌
 */
export function editBrand(data) {
	return request({
		url: '/mall/brand',
		method: 'put',
		data,
	})
}

/**
 * @name: getBrandInfo
 * @desc: 获取品牌详情
 */
export function getBrandInfo(id) {
	return request({
		url: `/mall/brand/${id}`,
		method: 'get',
	})
}

/**
 * @name: delBrand
 * @desc: 删除品牌
 */
export function delBrand(id) {
	return request({
		url: `/mall/brand/${id}`,
		method: 'delete',
	})
}

/**
 * @name: list
 * @desc: 品牌列表
 */
export function list(params) {
	return request({
		url: `/mall/brand/list`,
		method: 'get',
		params,
	})
}
