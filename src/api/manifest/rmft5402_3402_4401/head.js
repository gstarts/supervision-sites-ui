import request from '@/utils/request'
import { data } from 'autoprefixer'



// 新增【请填写功能名称】
export function add(data) {
  return request({
    url: '/manifest/head/addMt5402_3402_4401',
    method: 'post',
    data: data
  })
}
// 5402根据id查询
export function queryById(id) {
  return request({
    url: '/manifest/head/query/mt5402/'+id,
    method: 'get'
  })
}


