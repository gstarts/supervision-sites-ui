import request from '@/utils/request'

// 查询堆场作业 列表
export function listOperation(query) {
  return request({
    url: '/yard/operation/list',
    method: 'get',
    params: query
  })
}

// 查询堆场作业 详细
export function getOperation(id) {
  return request({
    url: '/yard/operation/' + id,
    method: 'get'
  })
}

// 新增堆场作业 
export function addOperation(data) {
  return request({
    url: '/yard/operation',
    method: 'post',
    data: data
  })
}

// 修改堆场作业 
export function updateOperation(data) {
  return request({
    url: '/yard/operation',
    method: 'put',
    data: data
  })
}

// 删除堆场作业 
export function delOperation(id) {
  return request({
    url: '/yard/operation/' + id,
    method: 'delete'
  })
}
