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