import request from '@/utils/request'

// 查询日报明细 列表
export function listDetail(query) {
  return request({
    url: '/tax/summary/detail/list',
    method: 'get',
    params: query
  })
}

// 查询日报明细 详细
export function getDetail(id) {
  return request({
    url: '/tax/summary/detail/' + id,
    method: 'get'
  })
}

// 新增日报明细
export function addDetail(data) {
  return request({
    url: '/tax/summary/detail',
    method: 'post',
    data: data
  })
}

// 修改日报明细
export function updateDetail(data) {
  return request({
    url: '/tax/summary/detail',
    method: 'put',
    data: data
  })
}

// 删除日报明细
export function delDetail(id) {
  return request({
    url: '/tax/summary/detail/' + id,
    method: 'delete'
  })
}
