import request from '@/utils/request'

// 查询入库细单列表
export function listIndtl(query) {
  return request({
    url: '/tax/indtl/list',
    method: 'get',
    params: query
  })
}

// 查询入库细单列表
export function listIndtlbydocid(inDocId) {
  return request({
    url: '/tax/indtl/docId/'+inDocId,
    method: 'get'
  })
}

// 查询入库细单详细
export function getIndtl(inDtlId) {
  return request({
    url: '/tax/indtl/' + inDtlId,
    method: 'get'
  })
}

// 新增入库细单
export function addIndtl(data) {
  return request({
    url: '/tax/indtl',
    method: 'post',
    data: data
  })
}

// 修改入库细单
export function updateIndtl(data) {
  return request({
    url: '/tax/indtl',
    method: 'put',
    data: data
  })
}

// 删除入库细单
export function delIndtl(inDtlId) {
  return request({
    url: '/tax/indtl/' + inDtlId,
    method: 'delete'
  })
}

// 获取库位
export function listStores() {
  return request({
    url: '/tax/store/listNotUse',
    method: 'get'
  })
}


