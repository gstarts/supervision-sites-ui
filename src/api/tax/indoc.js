import request from '@/utils/request'

// 查询入库单列表
export function listIndoc(query) {
  return request({
    url: '/tax/indoc/list',
    method: 'get',
    params: query
  })
}

// 查询入库单详细
export function getIndoc(inDocId) {
  return request({
    url: '/tax/indoc/' + inDocId,
    method: 'get'
  })
}

// 新增入库单
export function addIndoc(data) {
  return request({
    url: '/tax/indoc',
    method: 'post',
    data: data
  })
}

// 修改入库单
export function updateIndoc(data) {
  return request({
    url: '/tax/indoc',
    method: 'put',
    data: data
  })
}

// 删除入库单
export function delIndoc(inDocId) {
  return request({
    url: '/tax/indoc/' + inDocId,
    method: 'delete'
  })
}


// 状态修改
export function changeDocStatus(inDocId) {
  return request({
    url: '/tax/indoc/changeStatus/'+inDocId,
    method: 'post'
  })
}

// 查询车辆
export function getCarList(carNo) {
  return request({
    url: '/tax/car/carNo/',
    method: 'get'
  })
}