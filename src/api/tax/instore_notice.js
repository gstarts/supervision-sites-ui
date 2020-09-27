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


export function getInstore_notice_with_details(placeId, noticeNo) {
	return request({
		url: '/tax/instore_notice/' + placeId + '/' + noticeNo,
		method: 'get'
	})
}

/*export function getInstore_notice_with_vehicle(placeId, vehicleNo) {
	return request({
		url: '/tax/instore_notice/notice/' + placeId + '/' + vehicleNo,
		method: 'get'
	})
}*/

/**
 * 通过车号查出入库通知单
 * @param placeId  场所ID 整数
 * @param direction 方向整数 1 入库通知单 0 出库通知单
 * @param vehicleNo  车牌号 字符串
 * @returns {AxiosPromise}
 */
///doc/{placeId}/{direction}/{noticeNo}/{storeCode}
export function getNoticeByVehicle(placeId, direction, vehicleNo) {
	let data = {
		'placeId': placeId,
		'direction': direction,
		'vehicleNo': vehicleNo,
	}
	return request({
		url: '/tax/notice/getNoticeInfo',
		method: 'post',
		data: data
	})
}
//生成出库通知单
//重进空出，生成入库单 storeCode 和noticeNo
//空进重出，生成出库单  需要 noticeNo weight
export function genStoreDoc(placeId, direction, noticeNo, storeCode, weight) {
	let data = {
		'placeId': placeId,
		'direction': direction,
		'noticeNo': noticeNo,
		'storeCode': storeCode,
		'weight': weight
	}
	return request({
		url: '/place/pound/doc',
		method: 'post',
		data: data
	})
}

//更新通知单状态
export function updateDocNotice(placeId, noticeNo, type, state) {
	return request({
		url: '/tax/notice/update/' + placeId + '/' + noticeNo + '/' + type + '/' + state,
		method: 'post'
	})
}

