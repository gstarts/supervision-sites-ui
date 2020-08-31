import request from '@/utils/request'

// 查询动植物申报列表
export function listAnimals(query) {
  return request({
    url: '/manifest/animals/head/list',
    method: 'get',
    params: query
  })
}

// 查询动植物申报详细
export function getAnimals(id) {
  return request({
    url: '/manifest/animals/head/' + id,
    method: 'get'
  })
}

// 新增动植物申报
export function addAnimals(data) {
  return request({
    url: '/manifest/animals/head',
    method: 'post',
    data: data
  })
}

// 修改动植物申报
export function updateAnimals(data) {
  return request({
    url: '/manifest/animals/head',
    method: 'put',
    data: data
  })
}

// 动植物申报
export function declareAnimals(id) {
  return request({
    url: '/manifest/animals/head/' +id,
    method: 'delete',
  })
}

// 导出动植物申报
export function exportAnimals(query) {
  return request({
    url: '/manifest/animals/head/export',
    method: 'get',
    params: query
  })
}

// 初始化页面方法
export function init(){
  return request({
    url: '/manifest/animals/init' ,
    method: 'get',
  })
}