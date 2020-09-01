import request from '@/utils/request'

// 查询堆场库存明细 列表
export function listStore(query) {
  return request({
    url: '/yard/store/list',
    method: 'get',
    params: query
  })
}

// 查询堆场库存明细 详细
export function getStore(id) {
  return request({
    url: '/yard/store/' + id,
    method: 'get'
  })
}

// 新增堆场库存明细
export function addStore(data) {
  return request({
    url: '/yard/store',
    method: 'post',
    data: data
  })
}

// 修改堆场库存明细
export function updateStore(data) {
  return request({
    url: '/yard/store',
    method: 'put',
    data: data
  })
}

// 删除堆场库存明细
export function delStore(id) {
  return request({
    url: '/yard/store/' + id,
    method: 'delete'
  })
}

// 查询堆场库存明细 列表
export function listStoreCanUse(query) {
	return request({
		url: '/yard/store/listCanUse',
		method: 'get',
		params: query
	})
}

export function getStoreUse(id) {
	return request({
		url: '/yard/store/' + id,
		method: 'get'
	})
}
