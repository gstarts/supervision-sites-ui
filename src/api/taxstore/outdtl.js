import request from '@/utils/request'

// 查询出库明细列表
export function listOutdtl(query) {
  return request({
    url: '/taxstore/outdtl/list',
    method: 'get',
    params: query
  })
}

// 查询出库明细详细
export function getOutdtl(outDtlId) {
  return request({
    url: '/taxstore/outdtl/' + outDtlId,
    method: 'get'
  })
}

// 新增出库明细
export function addOutdtl(data) {
  return request({
    url: '/taxstore/outdtl',
    method: 'post',
    data: data
  })
}

// 修改出库明细
export function updateOutdtl(data) {
  return request({
    url: '/taxstore/outdtl',
    method: 'put',
    data: data
  })
}

// 删除出库明细
export function delOutdtl(outDtlId) {
  return request({
    url: '/taxstore/outdtl/' + outDtlId,
    method: 'delete'
  })
}

// 查询出库细单列表
export function listIndtlbydocid(outDocId) {
  return request({
    url: '/taxstore/outdtl/docId/'+outDocId,
    method: 'get'
  })
}
