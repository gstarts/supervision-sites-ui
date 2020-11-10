import request from '@/utils/request'

// 查询出库明细单列表
export function listOutstoreDoc(query) {
  return request({
    url: '/place/outstoreDoc/list',
    method: 'get',
    params: query
  })
}

// 查询出库明细单列表
export function listOutstoreDocLike(query) {
  return request({
    url: '/place/outstoreDoc/listLike',
    method: 'get',
    params: query
  })
}

// 查询出库明细单详细
export function getOutstoreDoc(id) {
  return request({
    url: '/place/outstoreDoc/' + id,
    method: 'get'
  })
}

// 新增出库明细单
export function addOutstoreDoc(data) {
  return request({
    url: '/place/outstoreDoc',
    method: 'post',
    data: data
  })
}

// 修改出库明细单
export function updateOutstoreDoc(data) {
  return request({
    url: '/place/outstoreDoc',
    method: 'put',
    data: data
  })
}

// 删除出库明细单
export function delOutstoreDoc(id) {
  return request({
    url: '/place/outstoreDoc/' + id,
    method: 'delete'
  })
}
