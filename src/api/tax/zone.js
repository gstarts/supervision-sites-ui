import request from '@/utils/request'

// 查询库存区域列表
export function listZone(query) {
  return request({
    url: '/tax/zone/list',
    method: 'get',
    params: query
  })
}

// 查询库存区域详细
export function getZone(id) {
  return request({
    url: '/tax/zone/' + id,
    method: 'get'
  })
}

// 新增库存区域
export function addZone(data) {
  return request({
    url: '/tax/zone',
    method: 'post',
    data: data
  })
}

// 修改库存区域
export function updateZone(data) {
  return request({
    url: '/tax/zone',
    method: 'put',
    data: data
  })
}

// 删除库存区域
export function delZone(id) {
  return request({
    url: '/tax/zone/' + id,
    method: 'delete'
  })
}
