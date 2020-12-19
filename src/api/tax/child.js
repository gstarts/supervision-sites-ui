import request from '@/utils/request'

// 查询司机食宿管理子列表
export function listChild(query) {
  return request({
    url: '/tax/child/list',
    method: 'get',
    params: query
  })
}

// 查询司机食宿管理子详细
export function getChild(id) {
  return request({
    url: '/tax/child/' + id,
    method: 'get'
  })
}

// 新增司机食宿管理子
export function addChild(data) {
  return request({
    url: '/tax/child',
    method: 'post',
    data: data
  })
}

// 修改司机食宿管理子
export function updateChild(data) {
  return request({
    url: '/tax/child',
    method: 'put',
    data: data
  })
}

// 删除司机食宿管理子
export function delChild(id) {
  return request({
    url: '/tax/child/' + id,
    method: 'delete'
  })
}
