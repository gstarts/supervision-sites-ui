import request from '@/utils/request'

// 查询大提煤单 大提煤单列表
export function listBig(query) {
  return request({
    url: '/place/big/list',
    method: 'get',
    params: query
  })
}

// 查询大提煤单 大提煤单列表
export function listBigLike(query) {
  return request({
    url: '/place/big/listLike',
    method: 'get',
    params: query
  })
}

// 查询大提煤单详情页 大提煤单列表
export function detailsBig(query) {
  return request({
    url: '/place/big/details',
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

export function updateVoidCar(data) {
  return request({
    url: '/place/big/void',
    method: 'post',
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

// 删除传入的文件
export function delImport(id) {
  return request({
    url: '/place/big/del/' + id,
    method: 'delete'
  })
}

export function selectCoalBillNo(query) {
  return request({
    url: '/place/big/SelectCoalBillNo',
    method: 'get',
    params: query
  })
}

// 获取校验重量
export function getReleaseWeight(query) {
  return request({
    url: '/place/big/checkWeight',
    method: 'get',
    params: query
  })
}

// 获取校验重量
export function getBigCanUse(billNo) {
  return request({
    url: '/place/big/canUse/' + billNo,
    method: 'get',
  })
}

export function addBigFile(data) {
  return request({
    url: '/place/big/addFile',
    method: 'post',
    data: data
  })
}
