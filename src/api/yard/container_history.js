import request from '@/utils/request'

// 查询集装箱信息历史记录 列表
export function listHistory(query) {
	return request({
		url: '/container/history/list',
		method: 'get',
		params: query
	})
}

// 查询集装箱信息历史记录 详细
export function getHistory(id) {
	return request({
		url: '/container/history/' + id,
		method: 'get'
	})
}

// 新增集装箱信息历史记录
export function addHistory(data) {
	return request({
		url: '/container/history',
		method: 'post',
		data: data
	})
}

// 修改集装箱信息历史记录
export function updateHistory(data) {
	return request({
		url: '/container/history',
		method: 'put',
		data: data
	})
}

// 删除集装箱信息历史记录
export function delHistory(id) {
	return request({
		url: '/container/history/' + id,
		method: 'delete'
	})
}
