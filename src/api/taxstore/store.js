import request from '@/utils/request'

// 查询库位列表
export function listStore(query) {
  return request({
    url: '/taxstore/store/list',
    method: 'get',
    params: query
  })
}

// 查询库位详细
export function getStore(storeId) {
  return request({
    url: '/taxstore/store/' + storeId,
    method: 'get'
  })
}

// 新增库位
export function addStore(data) {
  return request({
    url: '/taxstore/store',
    method: 'post',
    data: data
  })
}

// 修改库位
export function updateStore(data) {
  return request({
    url: '/taxstore/store',
    method: 'put',
    data: data
  })
}

// 删除库位
export function delStore(storeId) {
  return request({
    url: '/taxstore/store/' + storeId,
    method: 'delete'
  })
}

