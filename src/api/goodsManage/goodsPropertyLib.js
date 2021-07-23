import request from '@/utils/request'

/**********************属性************************ */

/**
 * @name: addAttribute
 * @desc: 新增商品属性
 */
export function addAttribute(data) {
	return request({
		url: '/mall/attribute',
		method: 'post',
		data,
	})
}

/**
 * @name: editAttribute
 * @desc: 新增商品属性
 */
export function editAttribute(data) {
	return request({
		url: '/mall/attribute',
		method: 'post',
		data,
	})
}

/**
 * @name: attributeInfo
 * @desc: 商品属性详情
 */
export function attributeInfo(data) {
	return request({
		url: `/mall/attribute/${id}`,
		method: 'get',
	})
}

/**
 * @name: delAttribute
 * @desc: 删除商品属性
 */
export function delAttribute(ids) {
	return request({
		url: `/mall/attribute/${ids}`,
		method: 'delete',
	})
}

/**
 * @name: exportAttribute
 * @desc: 导出商品属性列表
 */
export function exportAttribute() {
	return request({
		url: `/mall/attribute/export`,
		method: 'get',
	})
}

/**
 * @name: attributeList
 * @desc: 删除商品属性
 */
export function attributeList(params) {
	return request({
		url: `/mall/attribute/list`,
		method: 'get',
		params,
	})
}

/**********************属性值************************ */
/**
 * @name: addValue
 * @desc: 新增商品属性值
 */
export function addValue(data) {
	return request({
		url: '/mall/attributeValue',
		method: 'post',
		data,
	})
}

/**
 * @name: editValue
 * @desc: 修改商品属性值
 */
export function editValue(data) {
	return request({
		url: '/mall/attributeValue',
		method: 'put',
		data,
	})
}

/**
 * @name: valueInfo
 * @desc: 获取商品属性详情信息
 */
export function valueInfo(id) {
	return request({
		url: `/mall/attributeValue/${id}`,
		method: 'get',
	})
}

/**
 * @name: delValue
 * @desc: 删除商品属性值
 */
export function delValue(ids) {
	return request({
		url: `/mall/attributeValue/${ids}`,
		method: 'delete',
	})
}

/**
 * @name: exportValue
 * @desc: 导出商品属性值列表
 */
export function exportValue() {
	return request({
		url: '/mall/attributeValue/export',
		method: 'get',
	})
}

/**
 * @name: valueList
 * @desc: 查询商品属性值列表
 */
export function valueList(params) {
	return request({
		url: '/mall/attributeValue/list',
		method: 'get',
		params,
	})
}
