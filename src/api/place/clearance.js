import request from '@/utils/request'

// 查询通关单 列表
export function listClearance(query) {
  return request({
    url: '/place/clearance/list',
    method: 'get',
    params: query
  })
}

// 查询通关单 详细
export function getClearance(id) {
  return request({
    url: '/place/clearance/' + id,
    method: 'get'
  })
}

// 新增通关单
export function addClearance(data) {
  return request({
    url: '/place/clearance',
    method: 'post',
    data: data
  })
}

// 修改通关单
export function updateClearance(data) {
  return request({
    url: '/place/clearance',
    method: 'put',
    data: data
  })
}

// 删除通关单
export function delClearance(id) {
  return request({
    url: '/place/clearance/' + id,
    method: 'delete'
  })
}

export function listClearanceLike(query) {
  return request({
    url: '/place/clearance/listLike',
    method: 'get',
    params: query
  })
}
