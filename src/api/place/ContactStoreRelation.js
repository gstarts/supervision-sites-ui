import request from '@/utils/request'

// 查询合同库位关系 列表
export function listContactStoreRelation(query) {
  return request({
    url: '/place/ContactStoreRelation/list',
    method: 'get',
    params: query
  })
}

// 查询合同库位关系 详细
export function getContactStoreRelation(id) {
  return request({
    url: '/place/ContactStoreRelation/' + id,
    method: 'get'
  })
}

// 新增合同库位关系 
export function addContactStoreRelation(data) {
  return request({
    url: '/place/ContactStoreRelation',
    method: 'post',
    data: data
  })
}

// 修改合同库位关系 
export function updateContactStoreRelation(data) {
  return request({
    url: '/place/ContactStoreRelation',
    method: 'put',
    data: data
  })
}

// 删除合同库位关系 
export function delContactStoreRelation(id) {
  return request({
    url: '/place/ContactStoreRelation/' + id,
    method: 'delete'
  })
}
