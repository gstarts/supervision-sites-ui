import request from '@/utils/request'

// 查询入库单明细列表
export function listInstore_doc_detail(query) {
  return request({
    url: '/tax/instore_doc_detail/list',
    method: 'get',
    params: query
  })
}

// 查询入库单明细详细
export function getInstore_doc_detail(id) {
  return request({
    url: '/tax/instore_doc_detail/' + id,
    method: 'get'
  })
}

// 新增入库单明细
export function addInstore_doc_detail(data) {
  return request({
    url: '/tax/instore_doc_detail',
    method: 'post',
    data: data
  })
}

// 修改入库单明细
export function updateInstore_doc_detail(data) {
  return request({
    url: '/tax/instore_doc_detail',
    method: 'put',
    data: data
  })
}

// 删除入库单明细
export function delInstore_doc_detail(id) {
  return request({
    url: '/tax/instore_doc_detail/' + id,
    method: 'delete'
  })
}
