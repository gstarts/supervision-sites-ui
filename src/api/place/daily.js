import request from '@/utils/request'

// 查询场站日报列表
export function listDaily(query) {
  return request({
    url: '/place/daily/list',
    method: 'get',
    params: query
  })
}

// 查询场站日报详细
export function getDaily(id) {
  return request({
    url: '/place/daily/' + id,
    method: 'get'
  })
}

// 新增场站日报
export function addDaily(data) {
  return request({
    url: '/place/daily',
    method: 'post',
    data: data
  })
}

// 修改场站日报
export function updateDaily(data) {
  return request({
    url: '/place/daily',
    method: 'put',
    data: data
  })
}

// 删除场站日报
export function delDaily(id) {
  return request({
    url: '/place/daily/' + id,
    method: 'delete'
  })
}

// 模糊查询场站日报列表
export function listDailyLike(query) {
  return request({
    url: '/place/daily/listLike',
    method: 'get',
    params: query
  })
}
