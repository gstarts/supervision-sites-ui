import request from '@/utils/request'

// 查询移库单列表
export function listMovedoc(query) {
  return request({
    url: '/tax/movedoc/list',
    method: 'get',
    params: query
  })
}

// 查询移库单详细
export function getMovedoc(moveDocId) {
  return request({
    url: '/tax/movedoc/' + moveDocId,
    method: 'get'
  })
}

// 新增移库单
export function addMovedoc(data) {
  return request({
    url: '/tax/movedoc',
    method: 'post',
    data: data
  })
}

// 修改移库单
export function updateMovedoc(data) {
  return request({
    url: '/tax/movedoc',
    method: 'put',
    data: data
  })
}

// 删除移库单
export function delMovedoc(moveDocId) {
  return request({
    url: '/tax/movedoc/' + moveDocId,
    method: 'delete'
  })
}

// 状态修改
export function changeDocStatus(moveDocId) {
  return request({
    url: '/tax/movedoc/changeStatus/'+moveDocId,
    method: 'post'
  })
}
