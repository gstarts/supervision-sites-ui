import request from '@/utils/request'

// 查询出库通知明细列表
export function listOutnoticedtl(query) {
  return request({
    url: '/tax/outnoticedtl/list',
    method: 'get',
    params: query
  })
}

// 查询出库通知明细详细
export function getOutnoticedtl(outNoticeDtlId) {
  return request({
    url: '/tax/outnoticedtl/' + outNoticeDtlId,
    method: 'get'
  })
}

// 新增出库通知明细
export function addOutnoticedtl(data) {
  return request({
    url: '/tax/outnoticedtl',
    method: 'post',
    data: data
  })
}

// 修改出库通知明细
export function updateOutnoticedtl(data) {
  return request({
    url: '/tax/outnoticedtl',
    method: 'put',
    data: data
  })
}

// 删除出库通知明细
export function delOutnoticedtl(outNoticeDtlId) {
  return request({
    url: '/tax/outnoticedtl/' + outNoticeDtlId,
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
    url: '/tax/outnoticedtl/batch',
    method: 'post',
    data: dtlList
  })
}

// 查询出库通知细单列表
export function listIndtlbydocid(outNoticeDocId) {
  return request({
    url: '/tax/outnoticedtl/docId/'+outNoticeDocId,
    method: 'get'
  })
}



