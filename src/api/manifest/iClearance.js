import request from '@/utils/request'

// 查询通关单 列表
export function listIClearance(query) {
  return request({
    url: '/manifest/iClearance/list',
    method: 'get',
    params: query
  })
}

// 查询通关单 详细
export function getIClearance(id) {
  return request({
    url: '/manifest/iClearance/' + id,
    method: 'get'
  })
}

// 新增通关单 
export function addIClearance(data) {
  return request({
    url: '/manifest/iClearance',
    method: 'post',
    data: data
  })
}

// 修改通关单 
export function updateIClearance(data) {
  return request({
    url: '/manifest/iClearance',
    method: 'put',
    data: data
  })
}

// 删除通关单 
export function delIClearance(id) {
  return request({
    url: '/manifest/iClearance/' + id,
    method: 'delete'
  })
}
