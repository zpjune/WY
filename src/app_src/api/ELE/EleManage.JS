import request from '@/frame_src/utils/request'

export function GetData(query) {
    return request({
      url: '/EleManage/GetData',
      method: 'get',
      params: query
    })
  }
  export function QingLing(data) {
    return request({
      url: '/EleManage/QingLing',
      method: 'post',
      data
    })
  } 
  export function KaiHu(data) {
    return request({
      url: '/EleManage/KaiHu',
      method: 'post',
      data
    })
  } 