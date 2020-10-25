import request from '@/utils/request'

// 查询入门证 列表
export function listCard(query) {
  return request({
    url: '/place/card/list',
    method: 'get',
    params: query
  })
}

// 查询入门证 详细
export function getCard(id) {
  return request({
    url: '/place/card/' + id,
    method: 'get'
  })
}

// 新增入门证 
export function addCard(data) {
  return request({
    url: '/place/card',
    method: 'post',
    data: data
  })
}

// 修改入门证 
export function updateCard(data) {
  return request({
    url: '/place/card',
    method: 'put',
    data: data
  })
}

// 删除入门证 
export function delCard(id) {
  return request({
    url: '/place/card/' + id,
    method: 'delete'
  })
}
