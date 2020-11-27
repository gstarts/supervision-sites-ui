import request from '@/utils/request'


// 查询库位表中的库存明细 详细
export function getPlaceWeight(query) {
  return request({
    url: '/place/loss/getPlaceWeight',
    method: 'get',
    params: query
  })
}

//审批
export function auditLoss(data) {
  return request({
    url: '/place/loss/audit',
    method: 'put',
    data: data
  })
}

// 查询亏吨列表
export function listLoss(query) {
  return request({
    url: '/place/loss/list',
    method: 'get',
    params: query
  })
}

// 查询亏吨详细
export function getLoss(id) {
  return request({
    url: '/place/loss/' + id,
    method: 'get'
  })
}

// 新增亏吨
export function addLoss(data) {
  return request({
    url: '/place/loss',
    method: 'post',
    data: data
  })
}

// 修改亏吨
export function updateLoss(data) {
  return request({
    url: '/place/loss',
    method: 'put',
    data: data
  })
}

// 删除亏吨
export function delLoss(id) {
  return request({
    url: '/place/loss/' + id,
    method: 'delete'
  })
}

// 删除传入的文件
export function delImportFile(id) {
  return request({
    url: '/place/loss/del/' + id,
    method: 'delete'
  })
}
