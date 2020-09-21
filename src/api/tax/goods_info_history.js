import request from '@/utils/request'

// 查询货物历史信息列表
export function listGoods_info_history(query) {
  return request({
    url: '/tax/goods_info_history/list',
    method: 'get',
    params: query
  })
}

// 查询货物历史信息详细
export function getGoods_info_history(id) {
  return request({
    url: '/tax/goods_info_history/' + id,
    method: 'get'
  })
}

// 新增货物历史信息
export function addGoods_info_history(data) {
  return request({
    url: '/tax/goods_info_history',
    method: 'post',
    data: data
  })
}

// 修改货物历史信息
export function updateGoods_info_history(data) {
  return request({
    url: '/tax/goods_info_history',
    method: 'put',
    data: data
  })
}

// 删除货物历史信息
export function delGoods_info_history(id) {
  return request({
    url: '/tax/goods_info_history/' + id,
    method: 'delete'
  })
}
