import request from '@/utils/request'

// 查询磅单修改记录 列表
export function listModify(query) {
  return request({
    url: '/place/modify/list',
    method: 'get',
    params: query
  })
}

// 查询磅单修改记录 详细
export function getModify(id) {
  return request({
    url: '/place/modify/' + id,
    method: 'get'
  })
}

// 新增磅单修改记录 
export function addModify(data) {
  return request({
    url: '/place/modify',
    method: 'post',
    data: data
  })
}

// 修改磅单修改记录 
export function updateModify(data) {
  return request({
    url: '/place/modify',
    method: 'put',
    data: data
  })
}

// 删除磅单修改记录 
export function delModify(id) {
  return request({
    url: '/place/modify/' + id,
    method: 'delete'
  })
}
