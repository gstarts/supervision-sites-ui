import request from '@/utils/request'

// 查询入库通知单列表
export function listInnotice(query) {
  return request({
    url: '/tax/innotice/list',
    method: 'get',
    params: query
  })
}

// 查询入库通知单详细
export function getInnotice(inNoticeDocId) {
  return request({
    url: '/tax/innotice/' + inNoticeDocId,
    method: 'get'
  })
}

// 新增入库通知单
export function addInnotice(data) {
  return request({
    url: '/tax/innotice',
    method: 'post',
    data: data
  })
}

// 修改入库通知单
export function updateInnotice(data) {
  return request({
    url: '/tax/innotice',
    method: 'put',
    data: data
  })
}

// 删除入库通知单
export function delInnotice(inNoticeDocId) {
  return request({
    url: '/tax/innotice/' + inNoticeDocId,
    method: 'delete'
  })
}

// 审核状态修改
export function changeDocStatus(inNoticeDocId, status) {
  console.info("ok");
  const data = {
    inNoticeDocId,
    status
  }
  return request({

    url: '/tax/innotice/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询车辆
export function getCarList(carNo) {
  return request({
    url: '/tax/car/carNo/',
    method: 'get'
  })
}
