import request from '@/utils/request'

// 查询 工分标准列表
export function listStandard(query) {
  return request({
    url: '/workpoint/standard/list',
    method: 'get',
    params: query
  })
}

// 查询 工分标准详细
export function getStandard(id) {
  return request({
    url: '/workpoint/standard/' + id,
    method: 'get'
  })
}

// 新增 工分标准
export function addStandard(data) {
  return request({
    url: '/workpoint/standard',
    method: 'post',
    data: data
  })
}

// 修改 工分标准
export function updateStandard(data) {
  return request({
    url: '/workpoint/standard',
    method: 'put',
    data: data
  })
}

// 删除 工分标准
export function delStandard(id) {
  return request({
    url: '/workpoint/standard/' + id,
    method: 'delete'
  })
}
