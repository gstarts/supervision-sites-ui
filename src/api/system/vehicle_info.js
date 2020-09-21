import request from '@/utils/request'

// 查询vehicle列表
export function listVehicle_info(query) {
	return request({
		url: '/system/vehicle_info/list',
		method: 'get',
		params: query
	})
}

//获取车牌信息
export function listVehicleNoList(placeId) {
	let query = ''
	if (placeId) {
		query = '?placeId=' + placeId
	}
	return request({
		url: '/system/vehicle_info/vehicleList' + query,
		method: 'get',
	})
}

// 查询vehicle详细
export function getVehicle_info(id) {
	return request({
		url: '/system/vehicle_info/' + id,
		method: 'get'
	})
}

// 新增vehicle
export function addVehicle_info(data) {
	return request({
		url: '/system/vehicle_info',
		method: 'post',
		data: data
	})
}

// 修改vehicle
export function updateVehicle_info(data) {
	return request({
		url: '/system/vehicle_info',
		method: 'put',
		data: data
	})
}

// 删除vehicle
export function delVehicle_info(id) {
	return request({
		url: '/system/vehicle_info/' + id,
		method: 'delete'
	})
}
