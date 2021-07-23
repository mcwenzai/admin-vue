import request from '@/utils/request'

/**
 * @name: upload
 * @desc: 阿里云oss文件上传
 */
export function upload(data) {
	return request({
		url: '/oss/upload',
		method: 'post',
		data,
	})
}
