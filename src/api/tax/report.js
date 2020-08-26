import request from '@/utils/request'

// 报表
export function listReport(query) {
  return request({
    url: '/tax/report/company',
    method: 'get',
    params: query
  })
}
