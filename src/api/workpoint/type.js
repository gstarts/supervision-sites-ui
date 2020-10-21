import request from '@/utils/request'

// 查询 工分类型列表
export function listType(query) {
  return request({
    url: '/workpoint/type/list',
    method: 'get',
    params: query
  })
}

// 查询 工分类型详细
export function getType(id) {
  return request({
    url: '/workpoint/type/' + id,
    method: 'get'
  })
}

// 新增 工分类型
export function addType(data) {
  return request({
    url: '/workpoint/type',
    method: 'post',
    data: data
  })
}

// 修改 工分类型
export function updateType(data) {
  return request({
    url: '/workpoint/type',
    method: 'put',
    data: data
  })
}

// 删除 工分类型
export function delType(id) {
  return request({
    url: '/workpoint/type/' + id,
    method: 'delete'
  })
}
