import request from '@/utils/request'

/**
 * @name: addCategory
 * @desc: 添加商品品类
 */
export function addCategory(data) {
	return request({
		url: '/mall/category',
		method: 'post',
		data,
	})
}

/**
 * @name: editCategory
 * @desc: 修改商品品类
 */
export function editCategory(data) {
	return request({
		url: '/mall/category',
		method: 'put',
		data,
	})
}

/**
 * @name: expandCategory
 * @desc: 品类子集
 */
export function expandCategory(params) {
	return request({
		url: '/mall/category',
		method: 'get',
		params,
	})
}

/**
 * @name: delCategory
 * @desc: 删除商品品类
 */
export function delCategory(ids) {
	return request({
		url: `/mall/category/${ids}`,
		method: 'delete',
	})
}

/**
 * @name: categoryList
 * @desc: 品类列表
 */
export function categoryList(params) {
	return request({
		url: '/mall/category/list',
		method: 'get',
		params,
	})
}
