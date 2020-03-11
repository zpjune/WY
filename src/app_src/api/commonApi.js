import request from '@/frame_src/utils/request'
export function GetOptions(query) {
    return request({
      url: '/TaxConfig/GetOptions',
      method: 'get',
      params: query
    })
  }