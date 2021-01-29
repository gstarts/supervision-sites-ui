import request from '@/utils/request'

// 查询出库通知单列表
export function listOutstore_notice(query) {
  return request({
    url: '/tax/outstore_notice/list',
    method: 'get',
    params: query
  })
}

// 查询出库通知单详细
export function getOutstore_notice(id) {
  return request({
    url: '/tax/outstore_notice/' + id,
    method: 'get'
  })
}

// 新增出库通知单
export function addOutstore_notice(data) {
  return request({
    url: '/tax/outstore_notice',
    method: 'post',
    data: data
  })
}

// 修改出库通知单
export function updateOutstore_notice(data) {
  return request({
    url: '/tax/outstore_notice',
    method: 'put',
    data: data
  })
}

// 删除出库通知单
export function delOutstore_notice(id) {
  return request({
    url: '/tax/outstore_notice/' + id,
    method: 'delete'
  })
}

export function getOutstore_notice_with_details(placeId, noticeNo) {
  let data = {
    'placeId': placeId,
    'noticeNos': noticeNo,
  }
	return request({
		url: '/tax/outstore_notice/print/test',
    method: 'post',
    data: data
	})
}
