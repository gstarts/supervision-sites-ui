import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listPrint(query) {
  return request({
    url: '/place/print/list',
    method: 'get',
    params: query
  })
}

// 查询 磅单查询审批详细
export function getPrint(id) {
  return request({
    url: '/place/print/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addPrint(data) {
  return request({
    url: '/place/print',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updatePrint(data) {
  return request({
    url: '/place/print',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delPrint(id) {
  return request({
    url: '/place/print/' + id,
    method: 'delete'
  })
}

// 查询 磅单查询审批详细
export function checkPrint(poundId) {
  return request({
    url: '/place/print/checkPoundInfo/' + poundId,
    method: 'get'
  })
}
