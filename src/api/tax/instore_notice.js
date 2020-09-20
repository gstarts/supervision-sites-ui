import request from '@/utils/request'

// 查询入库通知单列表
export function listInstore_notice(query) {
  return request({
    url: '/tax/instore_notice/list',
    method: 'get',
    params: query
  })
}

// 查询入库通知单详细
export function getInstore_notice(id) {
  return request({
    url: '/tax/instore_notice/' + id,
    method: 'get'
  })
}

// 新增入库通知单
export function addInstore_notice(data) {
  return request({
    url: '/tax/instore_notice',
    method: 'post',
    data: data
  })
}

// 修改入库通知单
export function updateInstore_notice(data) {
  return request({
    url: '/tax/instore_notice',
    method: 'put',
    data: data
  })
}

// 删除入库通知单
export function delInstore_notice(id) {
  return request({
    url: '/tax/instore_notice/' + id,
    method: 'delete'
  })
}


export function getInstore_notice_with_details(placeId,noticeNo) {
	return request({
		url: '/tax/instore_notice/'+placeId+'/'+noticeNo,
		method: 'get'
	})
}
