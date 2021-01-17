import request from '@/utils/request'

// 查询工分信息列表
export function listHead(query) {
  return request({
    url: '/workpoint/head/list',
    method: 'get',
    params: query
  })
}

// 查询工分信息详细
export function getHead(id) {
  return request({
    url: '/workpoint/head/' + id,
    method: 'get'
  })
}

// 新增工分信息
export function addHead(data) {
  return request({
    url: '/workpoint/head',
    method: 'post',
    data: data
  })
}

// 修改工分信息
export function updateHead(data) {
  return request({
    url: '/workpoint/head',
    method: 'put',
    data: data
  })
}

// 删除工分信息
export function delHead(id) {
  return request({
    url: '/workpoint/head/' + id,
    method: 'delete'
  })
}

export function getRecordCountByHeadId(id) {
  return request({
    url: '/workpoint/head/recordCount/' + id,
    method: 'get'
  })
}

//全部
export function statisticsAll(data) {
  return request({
    url: '/workpoint/head/statistics/all',
    method: 'get',
    params: data
  })
}
//工分类型分组
export function statisticsType(data) {
  return request({
    url: '/workpoint/head/statistics/type',
    method: 'get',
    params: data
  })
}
//明细
export function statisticsDetail(data) {
  return request({
    url: '/workpoint/head/statistics/detail',
    method: 'get',
    params: data
  })
}
