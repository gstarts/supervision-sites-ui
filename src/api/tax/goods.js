import request from '@/utils/request'

// 查询货品列表
export function listGoods(query) {
  return request({
    url: '/tax/goods/list',
    method: 'get',
    params: query
  })
}

// 查询货品详细
export function getGoods(goodsId) {
  return request({
    url: '/tax/goods/' + goodsId,
    method: 'get'
  })
}

// 新增货品
export function addGoods(data) {
  return request({
    url: '/tax/goods',
    method: 'post',
    data: data
  })
}

// 修改货品
export function updateGoods(data) {
  return request({
    url: '/tax/goods',
    method: 'put',
    data: data
  })
}

// 删除货品
export function delGoods(goodsId) {
  return request({
    url: '/tax/goods/' + goodsId,
    method: 'delete'
  })
}

// 获取库位
export function listStores() {
  return request({
    url: '/tax/store/list',
    method: 'get'
  })
}
