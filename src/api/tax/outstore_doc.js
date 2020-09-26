import request from '@/utils/request'

// 查询出库单列表
export function listOutstore_doc(query) {
  return request({
    url: '/tax/outstore_doc/list',
    method: 'get',
    params: query
  })
}

// 查询出库单详细
export function getOutstore_doc(id) {
  return request({
    url: '/tax/outstore_doc/' + id,
    method: 'get'
  })
}

// 新增出库单
export function addOutstore_doc(data) {
  return request({
    url: '/tax/outstore_doc',
    method: 'post',
    data: data
  })
}

// 修改出库单
export function updateOutstore_doc(data) {
  return request({
    url: '/tax/outstore_doc',
    method: 'put',
    data: data
  })
}

// 删除出库单
export function delOutstore_doc(id) {
  return request({
    url: '/tax/outstore_doc/' + id,
    method: 'delete'
  })
}

export function getOutstore_doc_with_details(placeId, noticeNo) {
	return request({
		url: '/tax/outstore_doc/' + placeId + '/' + noticeNo,
		method: 'get'
	})
}
