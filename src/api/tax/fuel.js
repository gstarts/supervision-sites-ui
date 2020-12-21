import request from '@/utils/request'

// 查询加油费管理主列表
export function listFuel(query) {
  return request({
    url: '/tax/fuel/list',
    method: 'get',
    params: query
  })
}

// 查询加油费管理主详细
export function getFuel(id) {
  return request({
    url: '/tax/fuel/' + id,
    method: 'get'
  })
}

// 新增加油费管理主
export function addFuel(data) {
  return request({
    url: '/tax/fuel',
    method: 'post',
    data: data
  })
}

// 修改加油费管理主
export function updateFuel(data) {
  return request({
    url: '/tax/fuel',
    method: 'put',
    data: data
  })
}

// 删除加油费管理主
export function delFuel(id) {
  return request({
    url: '/tax/fuel/' + id,
    method: 'delete'
  })
}
