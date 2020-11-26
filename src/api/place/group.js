import request from '@/utils/request'

// 查询工作小组列表
export function listGroup(query) {
  return request({
    url: '/place/group/list',
    method: 'get',
    params: query
  })
}

// 查询工作小组详细
export function getGroup(id) {
  return request({
    url: '/place/group/' + id,
    method: 'get'
  })
}

// 新增工作小组
export function addGroup(data) {
  return request({
    url: '/place/group',
    method: 'post',
    data: data
  })
}

// 修改工作小组
export function updateGroup(data) {
  return request({
    url: '/place/group',
    method: 'put',
    data: data
  })
}

// 删除工作小组
export function delGroup(id) {
  return request({
    url: '/place/group/' + id,
    method: 'delete'
  })
}
