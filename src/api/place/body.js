import request from '@/utils/request'

// 查询小提煤单body 列表
export function listBody(query) {
  return request({
    url: '/place/body/list',
    method: 'get',
    params: query
  })
}

// 查询小提煤单body 详细
export function getBody(id) {
  return request({
    url: '/place/body/' + id,
    method: 'get'
  })
}

// 新增小提煤单body 
export function addBody(data) {
  return request({
    url: '/place/body',
    method: 'post',
    data: data
  })
}

// 修改小提煤单body 
export function updateBody(data) {
  return request({
    url: '/place/body',
    method: 'put',
    data: data
  })
}

// 删除小提煤单body 
export function delBody(id) {
  return request({
    url: '/place/body/' + id,
    method: 'delete'
  })
}
