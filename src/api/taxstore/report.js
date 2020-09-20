import request from '@/utils/request'

// 报表
export function listReport(query) {
  return request({
    url: '/taxstore/report/company',
    method: 'get',
    params: query
  })
}
