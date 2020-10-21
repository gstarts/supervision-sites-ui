import request from '@/utils/request'

// 查询作业小组列表
export function listGroup(query) {
  return request({
    url: '/workpoint/group/list',
    method: 'get',
    params: query
  })
}

// 查询作业小组详细
export function getGroup(id) {
  return request({
    url: '/workpoint/group/' + id,
    method: 'get'
  })
}

// 新增作业小组
export function addGroup(data) {
  return request({
    url: '/workpoint/group',
    method: 'post',
    data: data
  })
}

// 修改作业小组
export function updateGroup(data) {
  return request({
    url: '/workpoint/group',
    method: 'put',
    data: data
  })
}

// 删除作业小组
export function delGroup(id) {
  return request({
    url: '/workpoint/group/' + id,
    method: 'delete'
  })
}
