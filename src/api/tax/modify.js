import request from '@/utils/request'

// 查询库位修改记录 列表
export function listModify(query) {
  return request({
    url: '/tax/modify/list',
    method: 'get',
    params: query
  })
}

// 查询库位修改记录 详细
export function getModify(id) {
  return request({
    url: '/tax/modify/' + id,
    method: 'get'
  })
}

// 新增库位修改记录 
export function addModify(data) {
  return request({
    url: '/tax/modify',
    method: 'post',
    data: data
  })
}

// 修改库位修改记录 
export function updateModify(data) {
  return request({
    url: '/tax/modify',
    method: 'put',
    data: data
  })
}

// 修改库位同意审批操作
export function modifyAgree(data) {
  return request({
    url: '/tax/modify/modifyAgree',
    method: 'put',
    data: data
  })
}

// 删除库位修改记录 
export function delModify(id) {
  return request({
    url: '/tax/modify/' + id,
    method: 'delete'
  })
}

// 模糊查询库位修改记录 列表
export function listModifyLike(query) {
  return request({
    url: '/tax/modify/listLike',
    method: 'get',
    params: query
  })
}