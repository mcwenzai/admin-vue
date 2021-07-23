/**
 * 通用js方法封装处理
 * Copyright (c) 2021 SHT
 */

const baseURL = process.env.VUE_APP_BASE_API

// 日期格式化
export function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/')
		}
		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

// 表单重置
export function resetForm(refName) {
	if (this.$refs[refName]) {
		this.$refs[refName].resetFields()
	}
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
	var search = params
	search.params = {}
	if (null != dateRange && '' != dateRange) {
		if (typeof propName === 'undefined') {
			search.params['beginTime'] = dateRange[0]
			search.params['endTime'] = dateRange[1]
		} else {
			search.params['begin' + propName] = dateRange[0]
			search.params['end' + propName] = dateRange[1]
		}
	}
	return search
}

// 回显数据字典
export function selectDictLabel(datas, value) {
	var actions = []
	Object.keys(datas).some((key) => {
		if (datas[key].dictValue == '' + value) {
			actions.push(datas[key].dictLabel)
			return true
		}
	})
	return actions.join('')
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
	var actions = []
	var currentSeparator = undefined === separator ? ',' : separator
	var temp = value.split(currentSeparator)
	Object.keys(value.split(currentSeparator)).some((val) => {
		Object.keys(datas).some((key) => {
			if (datas[key].dictValue == '' + temp[val]) {
				actions.push(datas[key].dictLabel + currentSeparator)
			}
		})
	})
	return actions.join('').substring(0, actions.join('').length - 1)
}

// 通用下载方法
export function download(fileName) {
	window.location.href =
		baseURL +
		'/common/download?fileName=' +
		encodeURI(fileName) +
		'&delete=' +
		true
}

// 字符串格式化(%s )
export function sprintf(str) {
	var args = arguments,
		flag = true,
		i = 1
	str = str.replace(/%s/g, function() {
		var arg = args[i++]
		if (typeof arg === 'undefined') {
			flag = false
			return ''
		}
		return arg
	})
	return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
	if (!str || str == 'undefined' || str == 'null') {
		return ''
	}
	return str
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
	id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	rootId =
		rootId ||
		Math.min.apply(
			Math,
			data.map((item) => {
				return item[parentId]
			})
		) ||
		0
	//对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	//循环所有项
	const treeData = cloneData.filter((father) => {
		let branchArr = cloneData.filter((child) => {
			//返回每一项的子级数组
			return father[id] === child[parentId]
		})
		branchArr.length > 0 ? (father.children = branchArr) : ''
		//返回第一层
		return father[parentId] === rootId
	})
	return treeData != '' ? treeData : data
}

/**
 * 地址拼接
 * @param {String} Province 省
 * @param {String} City 市
 * @param {String} Area 区/县
 * @param {String} Address 街道地址
 */
export function filterPlace(Province, City, Area, Address) {
	let place = ''
	if (Province !== null && Province !== '') {
		place += `${Province}省`
	} else {
		place = '/'
	}
	if (City !== null && City !== '') {
		place += `${City}市`
	} else {
		place = '/'
	}
	if (Area !== null && Area !== '') {
		place += `${Area}`
	} else {
		place = '/'
	}
	if (Address !== null && Address !== '') {
		place += `${Address}`
	} else {
		place = '/'
	}
	return place
}

/**
 * 入驻审核状态格式化
 * @param {Number | String} state 状态
 * @desc 0:未申请、1:审核中、2:审核通过、3:审核失败
 *  ban (0正常1禁用)
 */
export function filterState(state) {
	switch (state) {
		case 0:
			return '未申请'
		case 1:
			return '待审核'
		case 2:
			return '审核通过'
		case 3:
			return '审核失败'
	}
}

/**
 * 厂商/商户审核列表
 * @param {Number | String} ban
 * @desc '':全部、0:正常、1:禁用、
 */
export function filterBan(ban) {
	switch (ban) {
		case 0:
			return '正常'
		case 1:
			return '冻结'
		case 3:
			return '断续'
	}
}

/**
 * 商品审核状态格式化
 * @param {Number} state 状态
 * @param {String} type 渲染类型，audit代表审核列表，list代表商品列表
 * @desc 0 未上架 1待审核 2(已通过/已上架) 3 未通过 9已下架; AA 审批列表所有 BB 货品列表所有
 */
export function filterGoodsState(state, type) {
	switch (state) {
		case 0:
			return '未上架'
		case 1:
			return '待审核'
		case 2:
			return type === 'audit' ? '已通过' : '已上架'
		case 3:
			return '未通过'
		case 9:
			return '已下架'
	}
}
