import request from '@/utils/request'

// 查询堆场库存明细 列表
export function listStore_detail(query) {
	return request({
		url: '/place/store_detail/list',
		method: 'get',
		params: query
	})
}

// 查询堆场库存明细 详细
export function getStore_detail(id) {
	return request({
		url: '/place/store_detail/' + id,
		method: 'get'
	})
}

// 查询堆场库存明细 详细
export function getStore_detail_byStoreCode(placeId, storeCode) {
	return request({
		url: '/place/store_detail/' + placeId + '/' + storeCode,
		method: 'get'
	})
}

// 新增堆场库存明细
export function addStore_detail(data) {
	return request({
		url: '/place/store_detail',
		method: 'post',
		data: data
	})
}

// 修改堆场库存明细
export function updateStore_detail(data) {
	return request({
		url: '/place/store_detail',
		method: 'put',
		data: data
	})
}

// 删除堆场库存明细
export function delStore_detail(id) {
	return request({
		url: '/place/store_detail/' + id,
		method: 'delete'
	})
}
