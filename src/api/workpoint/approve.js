import request from '@/utils/request'

// 查询工分审批列表
export function listApprove(query) {
  return request({
    url: '/workpoint/approve/list',
    method: 'get',
    params: query
  })
}

// 查询工分审批详细
export function getApprove(id) {
  return request({
    url: '/workpoint/approve/' + id,
    method: 'get'
  })
}

// 新增工分审批
export function addApprove(data) {
  return request({
    url: '/workpoint/approve',
    method: 'post',
    data: data
  })
}

// 修改工分审批
export function updateApprove(data) {
  return request({
    url: '/workpoint/approve',
    method: 'put',
    data: data
  })
}

// 删除工分审批
export function delApprove(id) {
  return request({
    url: '/workpoint/approve/' + id,
    method: 'delete'
  })
}
