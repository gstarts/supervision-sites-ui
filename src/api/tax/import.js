import request from '@/utils/request'

// 查询导入文件记录列表
export function listImport(query) {
	return request({
		url: '/tax/import/list',
		method: 'get',
		params: query
	})
}

// 查询导入文件记录详细
export function getImport(id) {
	return request({
		url: '/tax/import/' + id,
		method: 'get'
	})
}

// 新增导入文件记录
export function addImport(data) {
	return request({
		url: '/tax/import',
		method: 'post',
		data: data
	})
}

// 修改导入文件记录
export function updateImport(data) {
	return request({
		url: '/tax/import',
		method: 'put',
		data: data
	})
}

// 删除导入文件记录
export function delImport(id) {
	return request({
		url: '/tax/import/' + id,
		method: 'delete'
	})
}

export function downloadFile(bucketName, fileName) {
	return request({
		url: '/minio/files/download?bucketName=' + bucketName + '&objectName=' + fileName,
		method: 'get'
		//data: {'bucketName':bucketName,'fileName':fileName}
	})
}

export function genNotice(id) {
 return request({
	 url: '/tax/import/genNotice/'+id,
	 method: 'post'
 })
}
