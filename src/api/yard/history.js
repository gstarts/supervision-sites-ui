import request from '@/utils/request'

// 查询堆场库存明细历史 列表
export function listHistory(query) {
  return request({
    url: '/yard/history/list',
    method: 'get',
    params: query
  })
}

// 查询堆场库存明细历史 详细
export function getHistory(id) {
  return request({
    url: '/yard/history/' + id,
    method: 'get'
  })
}

// 新增堆场库存明细历史 
export function addHistory(data) {
  return request({
    url: '/yard/history',
    method: 'post',
    data: data
  })
}

// 修改堆场库存明细历史 
export function updateHistory(data) {
  return request({
    url: '/yard/history',
    method: 'put',
    data: data
  })
}

// 删除堆场库存明细历史 
export function delHistory(id) {
  return request({
    url: '/yard/history/' + id,
    method: 'delete'
  })
}
