import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listDechead(query) {
  return request({
    url: '/manifest/dechead/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】列表
export function listAll(query) {
  return request({
    url: '/manifest/dechead//all/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getDechead(id) {
  return request({
    url: '/manifest/dechead/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addDechead(data) {
  return request({
    url: '/manifest/dechead',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateDechead(data) {
  return request({
    url: '/manifest/dechead',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delDechead(id) {
  return request({
    url: '/manifest/dechead/' + id,
    method: 'delete'
  })
}

// 批量申报
export function declare(id) {
  return request({
    url: '/manifest/dechead/declare/' + id,
    method: 'delete'
  })
}

// 删除【请填写功能名称】
export function delDeclare(id) {
  return request({
    url: '/manifest/dechead/del/' + id,
    method: 'delete'
  })
}
