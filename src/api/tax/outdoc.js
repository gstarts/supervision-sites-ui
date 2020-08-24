import request from '@/utils/request'

// 查询出库单列表
export function listOutdoc(query) {
  return request({
    url: '/tax/outdoc/list',
    method: 'get',
    params: query
  })
}

// 查询出库单详细
export function getOutdoc(outDocId) {
  return request({
    url: '/tax/outdoc/' + outDocId,
    method: 'get'
  })
}

// 新增出库单
export function addOutdoc(data) {
  return request({
    url: '/tax/outdoc',
    method: 'post',
    data: data
  })
}

// 修改出库单
export function updateOutdoc(data) {
  return request({
    url: '/tax/outdoc',
    method: 'put',
    data: data
  })
}

// 删除出库单
export function delOutdoc(outDocId) {
  return request({
    url: '/tax/outdoc/' + outDocId,
    method: 'delete'
  })
}

// 状态修改
export function changeDocStatus(outDocId) {
  return request({
    url: '/tax/outdoc/changeStatus/'+outDocId,
    method: 'post'
  })
}
