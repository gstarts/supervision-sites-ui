import request from '@/utils/request'

// 查询放行单 列表
export function listPassDoc(query) {
  return request({
    url: '/place/passDoc/list',
    method: 'get',
    params: query
  })
}

// 查询放行单 详细
export function getPassDoc(id) {
  return request({
    url: '/place/passDoc/' + id,
    method: 'get'
  })
}

// 新增放行单
export function addPassDoc(data) {
  return request({
    url: '/place/passDoc',
    method: 'post',
    data: data
  })
}

// 修改放行单
export function updatePassDoc(data) {
  return request({
    url: '/place/passDoc',
    method: 'put',
    data: data
  })
}

// 删除放行单
export function delPassDoc(id) {
  return request({
    url: '/place/passDoc/' + id,
    method: 'delete'
  })
}

export function listPassDocLike(query) {
  return request({
    url: '/place/passDoc/listLike',
    method: 'get',
    params: query
  })
}
