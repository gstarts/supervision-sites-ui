import request from '@/utils/request'

// 查询集装箱属性 列表
export function listContainer_attribute(query) {
  return request({
    url: '/container/attribute/list',
    method: 'get',
    params: query
  })
}

// 查询集装箱属性 详细
export function getContainer_attribute(id) {
  return request({
    url: '/container/attribute/' + id,
    method: 'get'
  })
}

// 新增集装箱属性
export function addContainer_attribute(data) {
  return request({
    url: '/container/attribute',
    method: 'post',
    data: data
  })
}

// 修改集装箱属性
export function updateContainer_attribute(data) {
  return request({
    url: '/container/attribute',
    method: 'put',
    data: data
  })
}

// 删除集装箱属性
export function delContainer_attribute(id) {
  return request({
    url: '/container/attribute/' + id,
    method: 'delete'
  })
}
