import request from '@/utils/request'

// 查询入库单列表
export function listInstore_doc(query) {
  return request({
    url: '/tax/instore_doc/list',
    method: 'get',
    params: query
  })
}

// 查询入库单详细
export function getInstore_doc(id) {
  return request({
    url: '/tax/instore_doc/' + id,
    method: 'get'
  })
}

// 新增入库单
export function addInstore_doc(data) {
  return request({
    url: '/tax/instore_doc',
    method: 'post',
    data: data
  })
}

// 修改入库单
export function updateInstore_doc(data) {
  return request({
    url: '/tax/instore_doc',
    method: 'put',
    data: data
  })
}

// 删除入库单
export function delInstore_doc(id) {
  return request({
    url: '/tax/instore_doc/' + id,
    method: 'delete'
  })
}

export function getDocByBusinessNo(placeId, businessNo) {
  return request({
    url: '/tax/instore_doc/businessNo/' + placeId + '/' + businessNo,
    method: 'post',
  })
}
