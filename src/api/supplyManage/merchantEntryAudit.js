import request from '@/utils/request'

const _URL = '/mall/storeInfo/'

/**
 * @name: list
 * @desc: 查询审核列表
 */
export function list(data) {
	return request({
		url: _URL + 'list',
		method: 'get',
		params: data,
	})
}

/**
 * @name: getAuditDetailInfo
 * @desc: 查询审核详情信息
 */
export function getAuditDetailInfo(id) {
	return request({
		url: `${_URL}getAuditDetailInfo/${id}`,
		method: 'get',
	})
}

/**
 * @name: auditStoreInfo
 * @desc: 厂商/店铺审核接口
 */
export function auditStoreInfo(params) {
	return request({
		url: _URL + 'auditStoreInfo',
		method: 'post',
		params,
	})
}

/**
 * @name: getStoreAuditList
 * @desc: 获得店铺审核记录
 */
export function getStoreAuditList(storeId) {
	return request({
		url: `${_URL}getStoreAuditList/${storeId}`,
		method: 'get',
	})
}

/**
 * @name: freezeOperate
 * @desc: 店铺/厂商进行冻结/解冻操作
 */
export function freezeOperate(params) {
	return request({
		url: `${_URL}banStoreInfo`,
		method: 'post',
		params,
	})
}
