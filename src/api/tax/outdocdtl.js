import request from '@/utils/request'

// 查询出库明细列表
export function listOutdocdtl(query) {
  return request({
    url: '/tax/outdocdtl/list',
    method: 'get',
    params: query
  })
}

// 查询出库明细详细
export function getOutdocdtl(outDtlId) {
  return request({
    url: '/tax/outdocdtl/' + outDtlId,
    method: 'get'
  })
}

// 新增出库明细
export function addOutdocdtl(data) {
  return request({
    url: '/tax/outdocdtl',
    method: 'post',
    data: data
  })
}

// 修改出库明细
export function updateOutdocdtl(data) {
  return request({
    url: '/tax/outdocdtl',
    method: 'put',
    data: data
  })
}

// 删除出库明细
export function delOutdocdtl(outDtlId) {
  return request({
    url: '/tax/outdocdtl/' + outDtlId,
    method: 'delete'
  })
}

// 查询入库细单列表
export function getIndtl() {
  return request({
    url: '/tax/goods/wclist',
    method: 'get'
  })
}

//导入商品明细
export function addOutnoticedtlByGoodsIds(dtlList) {
  return request({
    url: '/tax/outdocdtl/batch',
    method: 'post',
    data: dtlList
  })
}

// 查询出库细单列表
export function listIndtlbydocid(outDocId) {
  return request({
    url: '/tax/outdocdtl/docId/'+outDocId,
    method: 'get'
  })
}
