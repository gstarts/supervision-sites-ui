import request from '@/utils/request'

// 查询入库单列表
export function listIndoc(query) {
  return request({
    url: '/taxstore/indoc/list',
    method: 'get',
    params: query
  })
}

// 查询入库单详细
export function getIndoc(inDocId) {
  return request({
    url: '/taxstore/indoc/' + inDocId,
    method: 'get'
  })
}

// 新增入库单
export function addIndoc(data) {
  return request({
    url: '/taxstore/indoc',
    method: 'post',
    data: data
  })
}

// 修改入库单
export function updateIndoc(data) {
  return request({
    url: '/taxstore/indoc',
    method: 'put',
    data: data
  })
}

// 删除入库单
export function delIndoc(inDocId) {
  return request({
    url: '/taxstore/indoc/' + inDocId,
    method: 'delete'
  })
}


// 状态修改
export function changeDocStatusOnly(inDocId, status) {
  const data = {
    inDocId,
    status
  }
  return request({
    url: '/taxstore/indoc',
    method: 'put',
    data: data
  })
}

// 确认
export function changeDocStatus(inDocId) {
  return request({
    url: '/taxstore/indoc/changeStatus/'+inDocId,
    method: 'post'
  })
}


// 查询车辆
export function getCarList(carNo) {
  return request({
    url: '/taxstore/car/carNo/',
    method: 'get'
  })
}

// 查询未入库的
export function getInNoticeList() {
  return request({
    url: '/taxstore/innotice/notInList/',
    method: 'get'
  })
}


