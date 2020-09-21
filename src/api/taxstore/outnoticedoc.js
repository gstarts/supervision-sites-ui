import request from '@/utils/request'

// 查询出库通知单列表
export function listOutnoticedoc(query) {
  return request({
    url: '/taxstore/outnoticedoc/list',
    method: 'get',
    params: query
  })
}

// 查询出库通知单详细
export function getOutnoticedoc(outNoticeDocId) {
  return request({
    url: '/taxstore/outnoticedoc/' + outNoticeDocId,
    method: 'get'
  })
}

// 新增出库通知单
export function addOutnoticedoc(data) {
  return request({
    url: '/taxstore/outnoticedoc',
    method: 'post',
    data: data
  })
}

// 修改出库通知单
export function updateOutnoticedoc(data) {
  return request({
    url: '/taxstore/outnoticedoc',
    method: 'put',
    data: data
  })
}

// 删除出库通知单
export function delOutnoticedoc(outNoticeDocId) {
  return request({
    url: '/taxstore/outnoticedoc/' + outNoticeDocId,
    method: 'delete'
  })
}

// 审核状态修改
export function changeDocStatus(outNoticeDocId, status) {
  const data = {
    outNoticeDocId,
    status
  }
  return request({
    url: '/taxstore/outnoticedoc/changeStatus',
    method: 'put',
    data: data
  })
}

