import request from '@/frame_src/utils/request'

export function GetShopInfo(query) {
  return request({
    url: '/ShopInfo/GetShopInfo',
    method: 'get',
    params: query
  })
}

export function DeleteShopInfo(query) {
    return request({
      url: '/ShopInfo/DeleteShopInfo',
      method: 'get',
      params: query
    })
  }