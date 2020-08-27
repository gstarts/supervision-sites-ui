import request from '@/utils/request'

// 查询入库通知单明细管理列表
export function listTax_innoticedtl(query) {
  return request({
    url: '/tax/tax_innoticedtl/list',
    method: 'get',
    params: query
  })
}

// 查询入库通知单明细管理详细
export function getTax_innoticedtl(inNoticeDtlId) {
  return request({
    url: '/tax/tax_innoticedtl/' + inNoticeDtlId,
    method: 'get'
  })
}

// 查询入库通知单明细管理详细
export function listTax_innoticedtlbydocid(inNoticeDocId) {
  console.info("dffa");
  return request({
    url: '/tax/tax_innoticedtl/docId/' + inNoticeDocId,
    method: 'get'
  })
}

// 新增入库通知单明细管理
export function addTax_innoticedtl(data) {
  return request({
    url: '/tax/tax_innoticedtl',
    method: 'post',
    data: data
  })
}

// 修改入库通知单明细管理
export function updateTax_innoticedtl(data) {
  return request({
    url: '/tax/tax_innoticedtl',
    method: 'put',
    data: data
  })
}

// 删除入库通知单明细管理
export function delTax_innoticedtl(inNoticeDtlId) {
  return request({
    url: '/tax/tax_innoticedtl/' + inNoticeDtlId,
    method: 'delete'
  })
}

// 获取库位
export function listByDept(deptId) {
  return request({
    url: '/tax/store/listByDept/'+deptId,
    method: 'get'
  })
}
