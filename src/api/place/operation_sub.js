import request from '@/utils/request'

// 查询作业子单列表
export function listOperation_sub(query) {
  return request({
    url: '/place/operation_detail/list',
    method: 'get',
    params: query
  })
}

// 查询作业子单详细
export function getOperation_sub(id) {
  return request({
    url: '/place/operation_detail/' + id,
    method: 'get'
  })
}

// 新增作业子单
export function addOperation_sub(data) {
  return request({
    url: '/place/operation_detail',
    method: 'post',
    data: data
  })
}

// 修改作业子单
export function updateOperation_sub(data) {
  return request({
    url: '/place/operation_detail',
    method: 'put',
    data: data
  })
}

// 删除作业子单
export function delOperation_sub(id) {
  return request({
    url: '/place/operation_detail/' + id,
    method: 'delete'
  })
}
