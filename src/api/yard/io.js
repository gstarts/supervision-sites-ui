import request from '@/utils/request'

// 查询集装箱进出记录 列表
export function listIo(query) {
  return request({
    url: '/yard/io/list',
    method: 'get',
    params: query
  })
}

// 查询集装箱进出记录 详细
export function getIo(id) {
  return request({
    url: '/yard/io/' + id,
    method: 'get'
  })
}

// 新增集装箱进出记录
export function addIo(data) {
  return request({
    url: '/yard/io',
    method: 'post',
    data: data
  })
}

// 新增集装箱进出记录
export function reduceIo(data) {
	return request({
		url: '/yard/io/reduce',
		method: 'post',
		data: data
	})
}

// 修改集装箱进出记录
export function updateIo(data) {
  return request({
    url: '/yard/io',
    method: 'put',
    data: data
  })
}

// 删除集装箱进出记录
export function delIo(id) {
  return request({
    url: '/yard/io/' + id,
    method: 'delete'
  })
}
