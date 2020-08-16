import request from '@/utils/request'

// 查询区域库位管理列表
export function listZone(query) {
  return request({
    url: '/yard/zone/list',
    method: 'get',
    params: query
  })
}

// 查询区域库位管理详细
export function getZone(id) {
  return request({
    url: '/yard/zone/' + id,
    method: 'get'
  })
}

// 新增区域库位管理
export function addZone(data) {
  return request({
    url: '/yard/zone',
    method: 'post',
    data: data
  })
}

// 修改区域库位管理
export function updateZone(data) {
  return request({
    url: '/yard/zone',
    method: 'put',
    data: data
  })
}

// 删除区域库位管理
export function delZone(id) {
  return request({
    url: '/yard/zone/' + id,
    method: 'delete'
  })
}
