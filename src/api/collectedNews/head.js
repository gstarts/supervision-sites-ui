import request from '@/utils/request'
import { data } from 'autoprefixer'



// 新增【请填写功能名称】
export function add(data) {
  return request({
    url: '/manifest/concentratedeclare_head/add',
    method: 'post',
    data: data
  })
}


