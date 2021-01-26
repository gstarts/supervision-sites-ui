import request from '@/utils/request'

// 查询计费单列表
export function listBill(query) {
  return request({
    url: '/place/bill/list',
    method: 'get',
    params: query
  })
}

// 查询计费单详细
export function getBill(id) {
  return request({
    url: '/place/bill/' + id,
    method: 'get'
  })
}

// 新增计费单
export function addBill(data) {
  return request({
    url: '/place/bill',
    method: 'post',
    data: data
  })
}

// 修改计费单
export function updateBill(data) {
  return request({
    url: '/place/bill',
    method: 'put',
    data: data
  })
}

// 删除计费单
export function delBill(id) {
  return request({
    url: '/place/bill/' + id,
    method: 'delete'
  })
}

// 模糊查询计费单列表
export function listBillLike(query) {
  return request({
    url: '/place/bill/listLike',
    method: 'get',
    params: query
  })
}