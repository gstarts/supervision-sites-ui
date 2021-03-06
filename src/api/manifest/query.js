import request from '@/utils/request'

// 查询提运单申报列表
export function manifestList(query) {
  return request({
    url: '/manifest/head/list',
    method: 'get',
    params: query
  })
}

// 批量申报
export function declareManifest(data) {
  return request({
    url: '/manifest/head/declare',
    method: 'post',
    data:{ids:data}
  })
}
// 根据id查询
export function queryById(id) {
  return request({
    url: '/manifest/head/query/mt1401/'+id,
    method: 'get'
  })
}

// 根据id查询4403/4404/4406
export function queryDetailsById(id) {
  return request({
    url: '/manifest/head/query/4403_4404_4406/'+id,
    method: 'get'
  })
}

export function logicDetailsByIds(id) {
  return request({
    url: '/manifest/head/logic/'+id,
    method: 'delete'
  })
}
