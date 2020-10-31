import request from '@/utils/request'

// 查询堆场基本信息列表
export function listplace_info(query) {
  return request({
    url: '/place/info/list',
    method: 'get',
    params: query
  })
}

// 查询堆场基本信息详细
export function getplace_info(id) {
  return request({
    url: '/place/info/' + id,
    method: 'get'
  })
}

// 新增堆场基本信息
export function addplace_info(data) {
  return request({
    url: '/place/info',
    method: 'post',
    data: data
  })
}

// 修改堆场基本信息
export function updateplace_info(data) {
  return request({
    url: '/place/info',
    method: 'put',
    data: data
  })
}

// 删除堆场基本信息
export function delplace_info(id) {
  return request({
    url: '/place/info/' + id,
    method: 'delete'
  })
}

export function getNoticeByVehicle(placeId, direction, vehicleNo) {
	let data = {
		'placeId': placeId,
		'direction': direction,
		'vehicleNo': vehicleNo,
	}
	return request({
		url: '/place/notice/getNoticeInfo',
		method: 'post',
		data: data
	})
}
export function genStoreDoc(params) {
	return request({
		url: '/place/notice/doc',
		method: 'post',
		data: params
	})
}

export function getVehicleList(placeId, type) {
  return request({
    url: '/place/notice/vehicleNo/' + placeId + '/' + type,
    method: 'get'
  })
}

export function updateDocTime(params) {
  return request({
    url: '/place/notice/updateDocTime',
    method: 'post',
    data: params
  })
}

export function statistics(params) {
  return request({
    url: '/place/notice/statistics',
    method: 'post',
    data: params
  })
}

