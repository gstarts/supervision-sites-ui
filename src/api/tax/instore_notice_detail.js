import request from '@/utils/request'

// 查询入库通知单明细列表
export function listInstore_notice_detail(query) {
  return request({
    url: '/tax/instore_notice_detail/list',
    method: 'get',
    params: query
  })
}

// 查询入库通知单明细详细
export function getInstore_notice_detail(id) {
  return request({
    url: '/tax/instore_notice_detail/' + id,
    method: 'get'
  })
}

// 新增入库通知单明细
export function addInstore_notice_detail(data) {
  return request({
    url: '/tax/instore_notice_detail',
    method: 'post',
    data: data
  })
}

// 修改入库通知单明细
export function updateInstore_notice_detail(data) {
  return request({
    url: '/tax/instore_notice_detail',
    method: 'put',
    data: data
  })
}

// 删除入库通知单明细
export function delInstore_notice_detail(id) {
  return request({
    url: '/tax/instore_notice_detail/' + id,
    method: 'delete'
  })
}
