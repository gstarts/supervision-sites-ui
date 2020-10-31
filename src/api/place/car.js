import request from '@/utils/request'

// 查询外调车 列表
export function listCar(query) {
  return request({
    url: '/place/car/list',
    method: 'get',
    params: query
  })
}

// 查询外调车 详细
export function getCar(id) {
  return request({
    url: '/place/car/' + id,
    method: 'get'
  })
}

// 新增外调车
export function addCar(data) {
  return request({
    url: '/place/car',
    method: 'post',
    data: data
  })
}

// 修改外调车
export function updateCar(data) {
  return request({
    url: '/place/car',
    method: 'put',
    data: data
  })
}

// 删除外调车
export function delCar(id) {
  return request({
    url: '/place/car/' + id,
    method: 'delete'
  })
}
// 获取外调车车牌号列表
export function getCarInfo() {
  return request({
    url: '/place/car/info',
    method: 'get'
  })
}
