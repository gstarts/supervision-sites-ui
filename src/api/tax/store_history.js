import request from '@/utils/request'

// 查询库存历史记录列表
export function listStore_history(query) {
  return request({
    url: '/tax/store_history/list',
    method: 'get',
    params: query
  })
}

// 查询库存历史记录详细
export function getStore_history(id) {
  return request({
    url: '/tax/store_history/' + id,
    method: 'get'
  })
}

// 新增库存历史记录
export function addStore_history(data) {
  return request({
    url: '/tax/store_history',
    method: 'post',
    data: data
  })
}

// 修改库存历史记录
export function updateStore_history(data) {
  return request({
    url: '/tax/store_history',
    method: 'put',
    data: data
  })
}

// 删除库存历史记录
export function delStore_history(id) {
  return request({
    url: '/tax/store_history/' + id,
    method: 'delete'
  })
}
