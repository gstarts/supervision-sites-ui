import request from '@/utils/request'

// 查询
export function carList(query) {
  return request({
    url: '/applet/v1/carList',
    method: 'get',
    params: query
  })
}


