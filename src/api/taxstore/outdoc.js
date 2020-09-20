import request from '@/utils/request'

// 查询出库单列表
export function listOutdoc(query) {
  return request({
    url: '/taxstore/outdoc/list',
    method: 'get',
    params: query
  })
}

// 查询出库单详细
export function getOutdoc(outDocId) {
  return request({
    url: '/taxstore/outdoc/' + outDocId,
    method: 'get'
  })
}

// 新增出库单
export function addOutdoc(data) {
  return request({
    url: '/taxstore/outdoc',
    method: 'post',
    data: data
  })
}

// 修改出库单
export function updateOutdoc(data) {
  return request({
    url: '/taxstore/outdoc',
    method: 'put',
    data: data
  })
}

// 删除出库单
export function delOutdoc(outDocId) {
  return request({
    url: '/taxstore/outdoc/' + outDocId,
    method: 'delete'
  })
}

// 状态修改
export function changeDocStatusOnly(outDocId, status) {
  const data = {
    outDocId,
    status
  }
  return request({
    url: '/taxstore/outdoc',
    method: 'put',
    data: data
  })
}

// 确认
export function changeDocStatus(outDocId) {
  return request({
    url: '/taxstore/outdoc/changeStatus/'+outDocId,
    method: 'post'
  })
}

// 查询未入库的
export function getOutNoticeList() {
  return request({
    url: '/taxstore/outnoticedoc/notOutList/',
    method: 'get'
  })
}
