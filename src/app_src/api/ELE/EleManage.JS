import request from '@/frame_src/utils/request'

export function GetData(query) {
    return request({
      url: '/EleManage/GetData',
      method: 'get',
      params: query
    })
  }