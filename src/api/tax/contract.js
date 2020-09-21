import request from '@/utils/request'

// 查询仓储合同列表
export function listContract(query) {
  return request({
    url: '/tax/contract/list',
    method: 'get',
    params: query
  })
}

// 查询仓储合同详细
export function getContract(id) {
  return request({
    url: '/tax/contract/' + id,
    method: 'get'
  })
}

// 新增仓储合同
export function addContract(data) {
  return request({
    url: '/tax/contract',
    method: 'post',
    data: data
  })
}

// 修改仓储合同
export function updateContract(data) {
  return request({
    url: '/tax/contract',
    method: 'put',
    data: data
  })
}

// 删除仓储合同
export function delContract(id) {
  return request({
    url: '/tax/contract/' + id,
    method: 'delete'
  })
}
