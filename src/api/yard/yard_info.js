import request from '@/utils/request'

// 查询堆场基本信息列表
export function listYard_info(query) {
  return request({
    url: '/yard/yard_info/list',
    method: 'get',
    params: query
  })
}

// 查询堆场基本信息详细
export function getYard_info(id) {
  return request({
    url: '/yard/yard_info/' + id,
    method: 'get'
  })
}

// 新增堆场基本信息
export function addYard_info(data) {
  return request({
    url: '/yard/yard_info',
    method: 'post',
    data: data
  })
}

// 修改堆场基本信息
export function updateYard_info(data) {
  return request({
    url: '/yard/yard_info',
    method: 'put',
    data: data
  })
}

// 删除堆场基本信息
export function delYard_info(id) {
  return request({
    url: '/yard/yard_info/' + id,
    method: 'delete'
  })
}
