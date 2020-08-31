import request from '@/utils/request'

// 查询动物体列表
export function listBody(query) {
  return request({
    url: '/manifest/animals/body/list',
    method: 'get',
    params: query
  })
}

// 查询动物体详细
export function getBody(id) {
  return request({
    url: '/manifest/animals/body/' + id,
    method: 'get'
  })
}

// 新增动物体
export function addBody(data) {
  return request({
    url: '/manifest/animals/body',
    method: 'post',
    data: data
  })
}

// 修改动物体
export function updateBody(data) {
  return request({
    url: '/manifest/animals/body',
    method: 'put',
    data: data
  })
}

// 删除动物体
export function delBody(id) {
  return request({
    url: '/manifest/animals/body/' + id,
    method: 'delete'
  })
}

// 导出动物体
export function exportBody(query) {
  return request({
    url: '/manifest/animals/body/export',
    method: 'get',
    params: query
  })
}

// 下载导入模板
export function importTemplate() {
  return request({
    url: '/manifest/animals/importTemplate',
    method: 'get'
  })
}