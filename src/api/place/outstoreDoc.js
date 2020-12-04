import request from '@/utils/request'

// 查询出库明细单列表
export function listOutstoreDoc(query) {
  return request({
    url: '/place/outstoreDoc/list',
    method: 'get',
    params: query
  })
}

// 查询出库明细单列表
export function listOutstoreDocLike(query) {
  return request({
    url: '/place/outstoreDoc/listLike',
    method: 'get',
    params: query
  })
}

// 查询出库明细单详细
export function getOutstoreDoc(id) {
  return request({
    url: '/place/outstoreDoc/' + id,
    method: 'get'
  })
}

// 新增出库明细单
export function addOutstoreDoc(data) {
  return request({
    url: '/place/outstoreDoc',
    method: 'post',
    data: data
  })
}

// 修改出库明细单
export function updateOutstoreDoc(data) {
  return request({
    url: '/place/outstoreDoc',
    method: 'put',
    data: data
  })
}

// 删除出库明细单
export function delOutstoreDoc(id) {
  return request({
    url: '/place/outstoreDoc/' + id,
    method: 'delete'
  })
}

export function addOutstoreDocByCar(data, num) {
  return request({
    url: '/place/outstoreDoc/addCar/' + num,
    method: 'post',
    data: data
  })
}
// 修改出库明细单
export function updatePrintByIds(ids) {
  return request({
    url: '/place/outstoreDoc/update/'+ids,
    method: 'post'
  })
}

export function updateVoidCar(data) {
  return request({
    url: '/place/outstoreDoc/void',
    method: 'post',
    data: data
  })
}

export function multiVoidCar(vehicleNos) {
  return request({
    url: '/place/outstoreDoc/multiVoid/' + vehicleNos,
    method: 'post'
  })
}
