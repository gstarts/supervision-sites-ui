import request from '@/utils/request'

// 查询集装箱进出场子单 列表
export function listIo_sub(query) {
	return request({
		url: '/place/goods_io_detail/list',
		method: 'get',
		params: query
	})
}

// 查询集装箱进出场子单 详细
export function getIo_sub(id) {
	return request({
		url: '/place/goods_io_detail/' + id,
		method: 'get'
	})
}

// 新增集装箱进出场子单
export function addIo_sub(data) {
	return request({
		url: '/place/goods_io_detail',
		method: 'post',
		data: data
	})
}

// 修改集装箱进出场子单
export function updateIo_sub(data) {
	return request({
		url: '/place/goods_io_detail',
		method: 'put',
		data: data
	})
}

// 删除集装箱进出场子单
export function delIo_sub(id) {
	return request({
		url: '/place/goods_io_detail/' + id,
		method: 'delete'
	})
}
