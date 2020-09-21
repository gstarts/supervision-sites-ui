import request from '@/utils/request'

// 查询客户货位列表
export function listCustomer_has_store(query) {
  return request({
    url: '/tax/customer_has_store/list',
    method: 'get',
    params: query
  })
}

// 查询客户货位详细
export function getCustomer_has_store(id) {
  return request({
    url: '/tax/customer_has_store/' + id,
    method: 'get'
  })
}

// 新增客户货位
export function addCustomer_has_store(data) {
  return request({
    url: '/tax/customer_has_store',
    method: 'post',
    data: data
  })
}

// 修改客户货位
export function updateCustomer_has_store(data) {
  return request({
    url: '/tax/customer_has_store',
    method: 'put',
    data: data
  })
}

// 删除客户货位
export function delCustomer_has_store(id) {
  return request({
    url: '/tax/customer_has_store/' + id,
    method: 'delete'
  })
}
