import request from '@/utils/request'

// 查询移库细单列表
export function listMovedtl(query) {
  return request({
    url: '/tax/movedtl/list',
    method: 'get',
    params: query
  })
}

// 查询移库细单详细
export function getMovedtl(moveDtlId) {
  return request({
    url: '/tax/movedtl/' + moveDtlId,
    method: 'get'
  })
}

// 新增移库细单
export function addMovedtl(data) {
  return request({
    url: '/tax/movedtl',
    method: 'post',
    data: data
  })
}

// 修改移库细单
export function updateMovedtl(data) {
  return request({
    url: '/tax/movedtl',
    method: 'put',
    data: data
  })
}

// 删除移库细单
export function delMovedtl(moveDtlId) {
  return request({
    url: '/tax/movedtl/' + moveDtlId,
    method: 'delete'
  })
}

// 查询移库细单列表
export function listIndtlbydocid(moveDocId) {
  return request({
    url: '/tax/movedtl/docId/'+moveDocId,
    method: 'get'
  })
}
