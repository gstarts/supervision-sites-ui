import request from '@/utils/request'

// 查询工人名单 列表
export function listWorker(query) {
  return request({
    url: '/workpoint/worker/list',
    method: 'get',
    params: query
  })
}

// 查询工人名单 详细
export function getWorker(id) {
  return request({
    url: '/workpoint/worker/' + id,
    method: 'get'
  })
}

// 新增工人名单 
export function addWorker(data) {
  return request({
    url: '/workpoint/worker',
    method: 'post',
    data: data
  })
}

// 修改工人名单 
export function updateWorker(data) {
  return request({
    url: '/workpoint/worker',
    method: 'put',
    data: data
  })
}

// 删除工人名单 
export function delWorker(id) {
  return request({
    url: '/workpoint/worker/' + id,
    method: 'delete'
  })
}
