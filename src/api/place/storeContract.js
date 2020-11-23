import request from '@/utils/request'

// 查询仓储合同 列表
export function listStoreContract(query) {
  return request({
    url: '/place/storeContract/list',
    method: 'get',
    params: query
  })
}
// 查询仓储合同 列表(模糊查询)
export function listStoreContractLike(query) {
  return request({
    url: '/place/storeContract/listLike',
    method: 'get',
    params: query
  })
}

// 查询仓储合同 详细
export function getStoreContract(id) {
  return request({
    url: '/place/storeContract/' + id,
    method: 'get'
  })
}

// 新增仓储合同
export function addStoreContract(data) {
  return request({
    url: '/place/storeContract',
    method: 'post',
    data: data
  })
}

// 修改仓储合同
export function updateStoreContract(data) {
  return request({
    url: '/place/storeContract',
    method: 'put',
    data: data
  })
}

// 删除仓储合同
export function delStoreContract(id) {
  return request({
    url: '/place/storeContract/' + id,
    method: 'delete'
  })
}
