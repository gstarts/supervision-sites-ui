import request from '@/utils/request'

// 查询加油费管理子列表
export function listFuelchild(query) {
  return request({
    url: '/tax/fuelchild/list',
    method: 'get',
    params: query
  })
}

// 查询加油费管理子详细
export function getFuelchild(id) {
  return request({
    url: '/tax/fuelchild/' + id,
    method: 'get'
  })
}

// 新增加油费管理子
export function addFuelchild(data) {
  return request({
    url: '/tax/fuelchild',
    method: 'post',
    data: data
  })
}

// 修改加油费管理子
export function updateFuelchild(data) {
  return request({
    url: '/tax/fuelchild',
    method: 'put',
    data: data
  })
}

// 删除加油费管理子
export function delFuelchild(id) {
  return request({
    url: '/tax/fuelchild/' + id,
    method: 'delete'
  })
}
