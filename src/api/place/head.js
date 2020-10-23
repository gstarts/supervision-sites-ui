import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listHead(query) {
  return request({
    url: '/place/head/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】列表
export function detailsHead(query) {
  return request({
    url: '/place/head/details',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getHead(id) {
  return request({
    url: '/place/head/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addHead(data) {
  return request({
    url: '/place/head',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateHead(data) {
  return request({
    url: '/place/head',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delHead(id) {
  return request({
    url: '/place/head/' + id,
    method: 'delete'
  })
}
