import request from '@/utils/request'

// 查询库存历史记录 列表
export function listHistory(query) {
  return request({
    url: '/yard/history/list',
    method: 'get',
    params: query
  })
}

// 查询库存历史记录 详细
export function getHistory(id) {
  return request({
    url: '/yard/history/' + id,
    method: 'get'
  })
}

// 新增库存历史记录 
export function addHistory(data) {
  return request({
    url: '/yard/history',
    method: 'post',
    data: data
  })
}

// 修改库存历史记录 
export function updateHistory(data) {
  return request({
    url: '/yard/history',
    method: 'put',
    data: data
  })
}

// 删除库存历史记录 
export function delHistory(id) {
  return request({
    url: '/yard/history/' + id,
    method: 'delete'
  })
}
