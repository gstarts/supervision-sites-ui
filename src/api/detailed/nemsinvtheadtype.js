import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listNemsinvtheadtype(query) {
  return request({
    url: '/manifest/nemsinvtheadtype/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getNemsinvtheadtype(id) {
  return request({
    url: '/manifest/nemsinvtheadtype/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addNemsinvtheadtype(data) {
  return request({
    url: '/manifest/nemsinvtheadtype',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateNemsinvtheadtype(data) {
  return request({
    url: '/manifest/nemsinvtheadtype',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delNemsinvtheadtype(id) {
  return request({
    url: '/manifest/nemsinvtheadtype/' + id,
    method: 'delete'
  })
}

// 批量申报
export function declareBonded(data) {
  return request({
    url: '/manifest/nemsinvtheadtype/declare',
    method: 'post',
    data:{ids:data} 
  })
}
