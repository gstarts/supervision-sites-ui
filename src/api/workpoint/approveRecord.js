import request from '@/utils/request'

// 查询审批记录 列表
export function listApproveRecord(query) {
  return request({
    url: '/workpoint/approveRecord/list',
    method: 'get',
    params: query
  })
}

// 查询审批记录 详细
export function getApproveRecord(id) {
  return request({
    url: '/workpoint/approveRecord/' + id,
    method: 'get'
  })
}

// 新增审批记录 
export function addApproveRecord(data) {
  return request({
    url: '/workpoint/approveRecord',
    method: 'post',
    data: data
  })
}

// 修改审批记录 
export function updateApproveRecord(data) {
  return request({
    url: '/workpoint/approveRecord',
    method: 'put',
    data: data
  })
}

// 删除审批记录 
export function delApproveRecord(id) {
  return request({
    url: '/workpoint/approveRecord/' + id,
    method: 'delete'
  })
}
