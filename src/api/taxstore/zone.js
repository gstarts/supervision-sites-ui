import request from '@/utils/request'

// 查询保税库分区库位信息 列表
export function listZone(query) {
  return request({
    url: '/taxstore/zone/list',
    method: 'get',
    params: query
  })
}

// 查询保税库分区库位信息 详细
export function getZone(id) {
  return request({
    url: '/taxstore/zone/' + id,
    method: 'get'
  })
}

// 新增保税库分区库位信息
export function addZone(data) {
  return request({
    url: '/taxstore/zone',
    method: 'post',
    data: data
  })
}

// 修改保税库分区库位信息
export function updateZone(data) {
  return request({
    url: '/taxstore/zone',
    method: 'put',
    data: data
  })
}

// 删除保税库分区库位信息
export function delZone(id) {
  return request({
    url: '/taxstore/zone/' + id,
    method: 'delete'
  })
}
