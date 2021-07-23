import request from '@/utils/request'

/**
 * @name: addTag
 * @desc: 新增标签
 */
export function addTag(data) {
	return request({
		url: '/mall/goodsTag',
		method: 'post',
		data,
	})
}

/**
 * @name: editTag
 * @desc: 修改标签
 */
export function editTag(data) {
	return request({
		url: '/mall/goodsTag',
		method: 'put',
		data,
	})
}

/**
 * @name: tagInfo
 * @desc: 新增标签
 */
export function tagInfo(id) {
	return request({
		url: `/mall/goodsTag/${id}`,
		method: 'get',
	})
}

/**
 * @name: delTag
 * @desc: 新增标签
 */
export function delTag(id) {
	return request({
		url: `/mall/goodsTag/${id}`,
		method: 'delete',
	})
}

/**
 * @name: exportTag
 * @desc: 导出标签列表
 */
export function exportTag() {
	return request({
		url: `/mall/goodsTag/export`,
		method: 'get',
	})
}

/**
 * @name: tagList
 * @desc: 标签列表
 */
export function tagList(params) {
	return request({
		url: `/mall/goodsTag/list`,
		method: 'get',
		params,
	})
}
