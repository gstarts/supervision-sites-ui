import request from '@/utils/request'

// 查询计量单列表
export function listSheet(query) {
  return request({
    url: '/pound/measurement/sheet/list',
    method: 'get',
    params: query
  })
}
//统计分析数据
export function analysis(query) {
  return request({
    url: '/pound/measurement/sheet/analysisList',
    method: 'get',
    params: query
  })
}
// 查询计量单详细
export function getSheet(id) {
  return request({
    url: '/pound/measurement/sheet/' + id,
    method: 'get'
  })
}

// 新增计量单
export function addSheet(data) {
  return request({
    url: '/pound/measurement/sheet',
    method: 'post',
    data: data
  })
}

// 修改计量单
export function updateSheet(data) {
  return request({
    url: '/pound/measurement/sheet',
    method: 'put',
    data: data
  })
}

// 删除计量单
export function delSheet(id) {
  return request({
    url: '/pound/measurement/sheet/' + id,
    method: 'delete'
  })
}

// 导出计量单
export function exportSheet(query) {
  return request({
    url: '/pound/measurement/sheet/export',
    method: 'get',
    params: query
  })
}