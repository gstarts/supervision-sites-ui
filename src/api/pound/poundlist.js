import request from '@/utils/request'

// 查询计量单列表
export function listSheet(query) {
  return request({
    url: '/pound/measurement/sheet/list',
    method: 'get',
    params: query
  })
}


export function listSheetLike(query) {
  return request({
    url: '/pound/measurement/sheet/listLike',
    method: 'get',
    params: query
  })
}

// 查询计量单列表
export function listIESheet(query) {
  return request({
    url: '/pound/measurement/sheet/IElist',
    method: 'get',
    params: query
  })
}

//统计分析数据
export function analysis(query) {
  return request({
    url: '/pound/measurement/sheet/analysisList',
    method: 'get',
    params: query
  })
}

// 通过车号查询数据
export function getSheet(event, stationId) {
  return request({
    url: '/pound/measurement/sheet/inrecord?vehicleNo=' + event + '&stationId=' + stationId,
    method: 'get'
  })
}

// 新增计量单
export function addSheet(data) {
  return request({
    url: '/pound/measurement/sheet',
    method: 'post',
    data: data
  })
}

export function addSheetPlace(data) {
  return request({
    url: '/place/measurement/sheet',
    method: 'post',
    data: data
  })
}

//磅单查询页(根据条件查询)
export function queryPoundStatisticsList(query) {
  return request({
    url: '/pound/measurement/sheet/queryPoundStatisticsList',
    method: 'get',
    params: query
  })
}

//磅单查询页(根据明细查询)
export function queryPoundStatisticsList1(query) {
  return request({
    url: '/pound/measurement/sheet/queryPoundStatisticsList1',
    method: 'get',
    params: query
  })
}

//111
// 修改计量单
export function updateSheet(data) {
  return request({
    url: '/pound/measurement/sheet',
    method: 'put',
    data: data
  })
}

// 删除计量单
export function delSheet(id) {
  return request({
    url: '/pound/measurement/sheet/' + id,
    method: 'delete'
  })
}

// 导出计量单
export function exportSheet(query) {
  return request({
    url: '/pound/measurement/sheet/export',
    method: 'get',
    params: query
  })
}

export function getSheetById(id) {
  return request({
    url: '/pound/measurement/sheet//byId/' + id,
    method: 'get',
  })
}

//redis获取实时地磅重量
export function poundSelect(event) {
  return request({
    url: '/pound/poundInfo/getWeight/' + event,
    method: 'get',
  })
}


