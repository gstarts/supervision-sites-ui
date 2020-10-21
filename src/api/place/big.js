import request from '@/utils/request'

// 查询大提煤单 大提煤单列表
export function listBig(query) {
  return request({
    url: '/place/big/list',
    method: 'get',
    params: query
  })
}

// 查询大提煤单 大提煤单详细
export function getBig(id) {
  return request({
    url: '/place/big/' + id,
    method: 'get'
  })
}

// 新增大提煤单 大提煤单
export function addBig(data) {
  return request({
    url: '/place/big',
    method: 'post',
    data: data
  })
}

// 修改大提煤单 大提煤单
export function updateBig(data) {
  return request({
    url: '/place/big',
    method: 'put',
    data: data
  })
}

// 删除大提煤单 大提煤单
export function delBig(id) {
  return request({
    url: '/place/big/' + id,
    method: 'delete'
  })
}
export function selectCoalBillNo(query){
  return request({
    url:'/place/big/SelectCoalBillNo',
    method:'get',
    params:query
  })
}