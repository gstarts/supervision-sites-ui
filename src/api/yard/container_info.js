import request from '@/utils/request'

// 查询集装箱基本信息列表
export function listContainer_info(query) {
  return request({
    url: '/container/info/list',
    method: 'get',
    params: query
  })
}

// 查询集装箱基本信息详细
export function getContainer_info(id) {
  return request({
    url: '/container/info/' + id,
    method: 'get'
  })
}

// 新增集装箱基本信息
export function addContainer_info(data) {
  return request({
    url: '/container/info',
    method: 'post',
    data: data
  })
}

// 修改集装箱基本信息
export function updateContainer_info(data) {
  return request({
    url: '/container/info',
    method: 'put',
    data: data
  })
}

// 删除集装箱基本信息
export function delContainer_info(id) {
  return request({
    url: '/container/info/' + id,
    method: 'delete'
  })
}
