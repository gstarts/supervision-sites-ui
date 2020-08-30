import request from '@/utils/request'

// 查询堆场报表列表
export function listReport(query) {
  return request({
    url: '/place/report/list',
    method: 'get',
    params: query
  })
}

// 查询堆场报表详细
export function getReport(id) {
  return request({
    url: '/place/report/' + id,
    method: 'get'
  })
}

// 新增堆场报表
export function addReport(data) {
  return request({
    url: '/place/report',
    method: 'post',
    data: data
  })
}

// 修改堆场报表
export function updateReport(data) {
  return request({
    url: '/place/report',
    method: 'put',
    data: data
  })
}

// 删除堆场报表
export function delReport(id) {
  return request({
    url: '/place/report/' + id,
    method: 'delete'
  })
}
