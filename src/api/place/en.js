import request from '@/utils/request'

// 查询场站日报列表
export function listEn(query) {
  return request({
    url: '/place/en/list',
    method: 'get',
    params: query
  })
}

// 查询场站日报详细
export function getEn(id) {
  return request({
    url: '/place/en/' + id,
    method: 'get'
  })
}

// 新增场站日报
export function addEn(data) {
  return request({
    url: '/place/en',
    method: 'post',
    data: data
  })
}

// 修改场站日报
export function updateEn(data) {
  return request({
    url: '/place/en',
    method: 'put',
    data: data
  })
}

// 删除场站日报
export function delEn(id) {
  return request({
    url: '/place/en/' + id,
    method: 'delete'
  })
}

// 模糊查询场站日报列表
export function listEnLike(query) {
  return request({
    url: '/place/en/listLike',
    method: 'get',
    params: query
  })
}
