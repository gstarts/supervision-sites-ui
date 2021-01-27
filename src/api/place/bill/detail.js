import request from '@/utils/request'

// 查询计费单明细列表
export function listBillDetail(query) {
  return request({
    url: '/place/billDetail/list',
    method: 'get',
    params: query
  })
}

// 查询计费单明细详细
export function getBillDetail(id) {
  return request({
    url: '/place/billDetail/' + id,
    method: 'get'
  })
}

// 新增计费单明细
export function addBillDetail(data) {
  return request({
    url: '/place/billDetail',
    method: 'post',
    data: data
  })
}

// 修改计费单明细
export function updateBillDetail(data) {
  return request({
    url: '/place/billDetail',
    method: 'put',
    data: data
  })
}

// 删除计费单明细
export function delBillDetail(id) {
  return request({
    url: '/place/billDetail/' + id,
    method: 'delete'
  })
}

// 模糊查询计费单明细列表
export function listBillDetailLike(query) {
  return request({
    url: '/place/billDetail/listLike',
    method: 'get',
    params: query
  })
}
