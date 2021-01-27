import request from '@/utils/request'

// 查询计费规则记录列表
export function listCostRule(query) {
  return request({
    url: '/place/costRule/list',
    method: 'get',
    params: query
  })
}

// 查询计费规则记录详细
export function getCostRule(id) {
  return request({
    url: '/place/costRule/' + id,
    method: 'get'
  })
}

// 新增计费规则记录
export function addCostRule(data) {
  return request({
    url: '/place/costRule',
    method: 'post',
    data: data
  })
}
// 新增计费规则记录
export function addCostRuleList(data) {
  return request({
    url: '/place/costRule/addList',
    method: 'post',
    data: data
  })
}

// 修改计费规则记录
export function updateCostRule(data) {
  return request({
    url: '/place/costRule',
    method: 'put',
    data: data
  })
}

// 删除计费规则记录
export function delCostRule(id) {
  return request({
    url: '/place/costRule/' + id,
    method: 'delete'
  })
}

// 模糊查询计费规则记录列表
export function listCostRuleLike(query) {
  return request({
    url: '/place/costRule/listLike',
    method: 'get',
    params: query
  })
}
