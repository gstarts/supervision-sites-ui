import request from '@/utils/request'

// 查询入库通知单列表
export function listInnotice(query) {
  return request({
    url: '/taxstore/instore/notice/list',
    method: 'get',
    params: query
  })
}

// 查询入库通知单详细
export function getInnotice(inNoticeDocId) {
  return request({
    url: '/taxstore/innotice/' + inNoticeDocId,
    method: 'get'
  })
}

// 新增入库通知单
export function addInnotice(data) {
  return request({
    url: '/taxstore/innotice',
    method: 'post',
    data: data
  })
}

// 修改入库通知单
export function updateInnotice(data) {
  return request({
    url: '/taxstore/innotice',
    method: 'put',
    data: data
  })
}

// 删除入库通知单
export function delInnotice(inNoticeDocId) {
  return request({
    url: '/taxstore/innotice/' + inNoticeDocId,
    method: 'delete'
  })
}

// 状态修改
export function changeDocStatus(inNoticeDocId, status) {
  const data = {
    inNoticeDocId,
    status
  }
  return request({
    url: '/taxstore/innotice/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询车辆
export function getCarList(carNo) {
  return request({
    url: '/taxstore/car/carNo/',
    method: 'get'
  })
}
