import request from '@/utils/request'

// 查询 工分记录列表
export function listRecord(query) {
  return request({
    url: '/workpoint/record/list',
    method: 'get',
    params: query
  })
}

// 查询 工分记录详细
export function getRecord(id) {
  return request({
    url: '/workpoint/record/' + id,
    method: 'get'
  })
}

// 新增 工分记录
export function addRecord(data) {
  return request({
    url: '/workpoint/record',
    method: 'post',
    data: data
  })
}

// 修改 工分记录
export function updateRecord(data) {
  return request({
    url: '/workpoint/record',
    method: 'put',
    data: data
  })
}

// 删除 工分记录
export function delRecord(id) {
  return request({
    url: '/workpoint/record/' + id,
    method: 'delete'
  })
}
