import request from '@/utils/request'

// 查询库位明细列表
export function listStorelst(query) {
  return request({
    url: '/tax/storelst/list',
    method: 'get',
    params: query
  })
}

// 查询库位明细详细
export function getStorelst(storeLstId) {
  return request({
    url: '/tax/storelst/' + storeLstId,
    method: 'get'
  })
}

// 新增库位明细
export function addStorelst(data) {
  return request({
    url: '/tax/storelst',
    method: 'post',
    data: data
  })
}

// 修改库位明细
export function updateStorelst(data) {
  return request({
    url: '/tax/storelst',
    method: 'put',
    data: data
  })
}

// 删除库位明细
export function delStorelst(storeLstId) {
  return request({
    url: '/tax/storelst/' + storeLstId,
    method: 'delete'
  })
}

// 查询入库细单列表
export function listByStoreid(storeId) {
  return request({
    url: '/tax/storelst/storeId/'+storeId,
    method: 'get'
  })
}

