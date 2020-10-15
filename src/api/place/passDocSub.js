import request from '@/utils/request'

// 查询放行单明细列表
export function listPassDocSub(query) {
  return request({
    url: '/place/passDocSub/list',
    method: 'get',
    params: query
  })
}

// 查询放行单明细详细
export function getPassDocSub(id) {
  return request({
    url: '/place/passDocSub/' + id,
    method: 'get'
  })
}

// 新增放行单明细
export function addPassDocSub(data) {
  return request({
    url: '/place/passDocSub',
    method: 'post',
    data: data
  })
}

// 修改放行单明细
export function updatePassDocSub(data) {
  return request({
    url: '/place/passDocSub',
    method: 'put',
    data: data
  })
}

// 删除放行单明细
export function delPassDocSub(id) {
  return request({
    url: '/place/passDocSub/' + id,
    method: 'delete'
  })
}
