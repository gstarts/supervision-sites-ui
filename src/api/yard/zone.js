import request from '@/utils/request'

<<<<<<< HEAD
// 查询堆场库位信息 列表
=======
// 查询堆场分区信息列表
>>>>>>> 56cd18f4605da2c3602d9868db08979e394997b5
export function listZone(query) {
  return request({
    url: '/yard/zone/list',
    method: 'get',
    params: query
  })
}

<<<<<<< HEAD
// 查询堆场库位信息 详细
=======
// 查询堆场分区信息详细
>>>>>>> 56cd18f4605da2c3602d9868db08979e394997b5
export function getZone(id) {
  return request({
    url: '/yard/zone/' + id,
    method: 'get'
  })
}

<<<<<<< HEAD
// 新增堆场库位信息 
=======
// 新增堆场分区信息
>>>>>>> 56cd18f4605da2c3602d9868db08979e394997b5
export function addZone(data) {
  return request({
    url: '/yard/zone',
    method: 'post',
    data: data
  })
}

<<<<<<< HEAD
// 修改堆场库位信息 
=======
// 修改堆场分区信息
>>>>>>> 56cd18f4605da2c3602d9868db08979e394997b5
export function updateZone(data) {
  return request({
    url: '/yard/zone',
    method: 'put',
    data: data
  })
}

<<<<<<< HEAD
// 删除堆场库位信息 
=======
// 删除堆场分区信息
>>>>>>> 56cd18f4605da2c3602d9868db08979e394997b5
export function delZone(id) {
  return request({
    url: '/yard/zone/' + id,
    method: 'delete'
  })
}
