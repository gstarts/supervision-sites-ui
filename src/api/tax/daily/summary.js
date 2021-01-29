import request from '@/utils/request'

// 查询日报汇总列表
export function listSummary(query) {
  return request({
    url: '/tax/summary/list',
    method: 'get',
    params: query
  })
}

// 查询日报汇总详细
export function getSummary(id) {
  return request({
    url: '/tax/summary/' + id,
    method: 'get'
  })
}

// 新增日报汇总
export function addSummary(data) {
  return request({
    url: '/tax/summary',
    method: 'post',
    data: data
  })
}

// 修改日报汇总
export function updateSummary(data) {
  return request({
    url: '/tax/summary',
    method: 'put',
    data: data
  })
}

// 删除日报汇总
export function delSummary(id) {
  return request({
    url: '/tax/summary/' + id,
    method: 'delete'
  })
}
