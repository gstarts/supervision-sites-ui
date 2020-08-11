import request from '@/utils/request'

// 查询库位库存列表
export function listStore(query) {
  return request({
    url: '/yard/store/list',
    method: 'get',
    params: query
  })
}

// 查询库位库存详细
export function getStore(id) {
  return request({
    url: '/yard/store/' + id,
    method: 'get'
  })
}

// 新增库位库存
export function addStore(data) {
  return request({
    url: '/yard/store',
    method: 'post',
    data: data
  })
}

// 修改库位库存
export function updateStore(data) {
  return request({
    url: '/yard/store',
    method: 'put',
    data: data
  })
}

// 删除库位库存
export function delStore(id) {
  return request({
    url: '/yard/store/' + id,
    method: 'delete'
  })
}
