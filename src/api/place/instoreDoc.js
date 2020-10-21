import request from '@/utils/request'

// 查询入库通知单列表
export function listInstoreDoc(query) {
  return request({
    url: '/place/instoreDoc/list',
    method: 'get',
    params: query
  })
}

// 查询入库通知单详细
export function getInstoreDoc(id) {
  return request({
    url: '/place/instoreDoc/' + id,
    method: 'get'
  })
}

// 新增入库通知单
export function addInstoreDoc(data) {
  return request({
    url: '/place/instoreDoc',
    method: 'post',
    data: data
  })
}

// 修改入库通知单
export function updateInstoreDoc(data) {
  return request({
    url: '/place/instoreDoc',
    method: 'put',
    data: data
  })
}

// 删除入库通知单
export function delInstoreDoc(id) {
  return request({
    url: '/place/instoreDoc/' + id,
    method: 'delete'
  })
}