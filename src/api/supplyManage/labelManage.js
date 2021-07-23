import request from '@/utils/request'

/**
 * @name: addTag
 * @desc: 新增店铺标签
 */
export function addTag(data) {
	return request({
		url: '/system/tag',
		method: 'post',
		data,
	})
}

/**
 * @name: editTag
 * @desc: 修改店铺标签
 */
export function editTag(data) {
	return request({
		url: '/system/tag',
		method: 'put',
		data,
	})
}

/**
 * @name: tagInfo
 * @desc: 标签详情
 */
export function tagInfo(id) {
	return request({
		url: `/system/tag/${id}`,
		method: 'get',
	})
}

/**
 * @name: delTag
 * @desc: 删除店铺标签
 */
export function delTag(ids) {
	return request({
		url: `/system/tag/${ids}`,
		method: 'delete',
	})
}

/**
 * @name: exportTag
 * @desc: 导出店铺标签列表
 */
export function exportTag() {
	return request({
		url: `/system/tag/export`,
		method: 'get',
	})
}

/**
 * @name: tagList
 * @desc: 查询标签列表
 */
export function tagList(params) {
	return request({
		url: `/system/tag/list`,
		method: 'get',
		params,
	})
}
