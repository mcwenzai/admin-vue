import request from '@/utils/request'

/**
 * @name: manufactureGoodsById
 * @desc: 商品审核列表详情
 */
export function manufactureGoodsById(id) {
	return request({
		url: `/mall/manufactureGoods/${id}`,
		method: 'get',
	})
}

/**
 * @name: manufactureGoodsAudit
 * @desc: 商品审核
 */
export function manufactureGoodsAudit(data) {
	return request({
		url: `/mall/manufactureGoods/audit`,
		method: 'put',
		data,
	})
}

/**
 * @name: manufactureGoodsList
 * @desc: 商品列表
 */
export function manufactureGoodsList(params) {
	return request({
		url: `/mall/manufactureGoods/list`,
		method: 'get',
		params,
	})
}

/**
 * @name: manufactureAuditHistory
 * @desc: 商品审核历史
 */
export function manufactureAuditHistory(params) {
	return request({
		url: '/mall/goodsAudit/list',
		method: 'get',
		params,
	})
}

/**
 * @name: batchAudit
 * @desc: 批量通过
 */
export function batchAudit(params) {
	return request({
		url: '/mall/manufactureGoods/batchAudit',
		method: 'put',
		params,
	})
}

/**
 * @name: batchOperate
 * @desc: 批量上架/下架
 */
export function batchOperate(data) {
	return request({
		url: '/mall/manufactureGoods/batchOperate',
		method: 'put',
		data,
	})
}

/**
 * @name: SpecificationList
 * @desc: 根据货品Id和类型查询规格详情
 */
export function SpecificationList(params) {
	return request({
		url: '/mall/manufacturerGoodsSpecification/list',
		method: 'get',
		params,
	})
}
