import request from '@/utils/request'

// 查询放行单与入库单关系 列表
export function listPassInstoreRelation(query) {
  return request({
    url: '/place/passInstoreRelation/list',
    method: 'get',
    params: query
  })
}

// 查询放行单与入库单关系 详细
export function getPassInstoreRelation(id) {
  return request({
    url: '/place/passInstoreRelation/' + id,
    method: 'get'
  })
}

// 新增放行单与入库单关系 
export function addPassInstoreRelation(data) {
  return request({
    url: '/place/passInstoreRelation',
    method: 'post',
    data: data
  })
}

// 修改放行单与入库单关系 
export function updatePassInstoreRelation(data) {
  return request({
    url: '/place/passInstoreRelation',
    method: 'put',
    data: data
  })
}

// 删除放行单与入库单关系 
export function delPassInstoreRelation(id) {
  return request({
    url: '/place/passInstoreRelation/' + id,
    method: 'delete'
  })
}
