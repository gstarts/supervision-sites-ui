import request from '@/utils/request'

// 查询工分信息列表
export function listHead(query) {
  return request({
    url: '/workpoint/head/list',
    method: 'get',
    params: query
  })
}

// 查询工分信息详细
export function getHead(id) {
  return request({
    url: '/workpoint/head/' + id,
    method: 'get'
  })
}

// 新增工分信息
export function addHead(data) {
  return request({
    url: '/workpoint/head',
    method: 'post',
    data: data
  })
}

// 修改工分信息
export function updateHead(data) {
  return request({
    url: '/workpoint/head',
    method: 'put',
    data: data
  })
}

// 删除工分信息
export function delHead(id) {
  return request({
    url: '/workpoint/head/' + id,
    method: 'delete'
  })
}
