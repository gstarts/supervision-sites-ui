import request from '@/utils/request'

// 查询审批主表列表
export function listApproveHead(query) {
  return request({
    url: '/workpoint/approveHead/list',
    method: 'get',
    params: query
  })
}

// 查询审批主表详细
export function getApproveHead(id) {
  return request({
    url: '/workpoint/approveHead/' + id,
    method: 'get'
  })
}

// 新增审批主表
export function addApproveHead(data) {
  return request({
    url: '/workpoint/approveHead',
    method: 'post',
    data: data
  })
}

// 修改审批主表
export function updateApproveHead(data) {
  return request({
    url: '/workpoint/approveHead',
    method: 'put',
    data: data
  })
}

// 删除审批主表
export function delApproveHead(id) {
  return request({
    url: '/workpoint/approveHead/' + id,
    method: 'delete'
  })
}
