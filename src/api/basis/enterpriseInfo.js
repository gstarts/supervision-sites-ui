import request from '@/utils/request'

// 查询企业信息备案列表
export function listInfo(query) {
  return request({
    url: '/place/enterprise/info/list',
    method: 'get',
    params: query
  })
}
export function listInfoIn(query) {
  return request({
    url: '/place/enterprise/info/listIn',
    method: 'get',
    params: query
  })
}
// 查询企业信息备案详细
export function getInfo(id) {
  return request({
    url: '/place/enterprise/info/' + id,
    method: 'get'
  })
}

// 新增企业信息备案
export function addInfo(data) {
  return request({
    url: '/place/enterprise/info',
    method: 'post',
    data: data
  })
}

// 修改企业信息备案
export function updateInfo(data) {
  return request({
    url: '/place/enterprise/info',
    method: 'put',
    data: data
  })
}

// 删除企业信息备案
export function delInfo(id) {
  return request({
    url: '/place/enterprise/info/' + id,
    method: 'delete'
  })
}


