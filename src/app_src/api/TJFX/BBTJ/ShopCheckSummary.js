import request from '@/frame_src/utils/request'
export function ShopCheckSummary(query) {
    return request({
      url: '/CheckReport/ShopCheckSummary',
      method: 'get',
      params: query
    })
  }