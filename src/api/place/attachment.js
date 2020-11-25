import request from '@/utils/request'

// 查询附件列表
export function listAttachment(query) {
  return request({
    url: '/place/attachment/list',
    method: 'get',
    params: query
  })
}

// 查询附件详细
export function getAttachment(id) {
  return request({
    url: '/place/attachment/' + id,
    method: 'get'
  })
}

// 新增附件
export function addAttachment(data) {
  return request({
    url: '/place/attachment',
    method: 'post',
    data: data
  })
}

// 修改附件
export function updateAttachment(data) {
  return request({
    url: '/place/attachment',
    method: 'put',
    data: data
  })
}

// 删除附件
export function delAttachment(id) {
  return request({
    url: '/place/attachment/' + id,
    method: 'delete'
  })
}

export function getPreview(id) {
  return request({
    url: '/place/attachment/getPreview/' + id,
    method: 'get'
  })
}
