import request from '@/utils/request'

// 查询导入文件记录 列表
export function listImport(query) {
  return request({
    url: '/place/import/list',
    method: 'get',
    params: query
  })
}

// 查询导入文件记录 详细
export function getImport(id) {
  return request({
    url: '/place/import/' + id,
    method: 'get'
  })
}

// 新增导入文件记录
export function addImport(data) {
  return request({
    url: '/place/import',
    method: 'post',
    data: data
  })
}

// 修改导入文件记录
export function updateImport(data) {
  return request({
    url: '/place/import',
    method: 'put',
    data: data
  })
}

// 删除导入文件记录
export function delImport(id) {
  return request({
    url: '/place/import/' + id,
    method: 'delete'
  })
}

export function genNotice(id) {
  return request({
    url: '/place/import/genNotice/'+id,
    method: 'post'
  })
}
