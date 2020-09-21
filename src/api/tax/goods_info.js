import request from '@/utils/request'

// 查询货物信息列表
export function listGoods_info(query) {
  return request({
    url: '/tax/goods_info/list',
    method: 'get',
    params: query
  })
}

// 查询货物信息详细
export function getGoods_info(id) {
  return request({
    url: '/tax/goods_info/' + id,
    method: 'get'
  })
}

// 新增货物信息
export function addGoods_info(data) {
  return request({
    url: '/tax/goods_info',
    method: 'post',
    data: data
  })
}

// 修改货物信息
export function updateGoods_info(data) {
  return request({
    url: '/tax/goods_info',
    method: 'put',
    data: data
  })
}

// 删除货物信息
export function delGoods_info(id) {
  return request({
    url: '/tax/goods_info/' + id,
    method: 'delete'
  })
}
