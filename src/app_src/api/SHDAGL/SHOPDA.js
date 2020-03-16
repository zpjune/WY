import request from '@/frame_src/utils/request'

export function GetShopInfo(query) {
  return request({
    url: '/ShopInfo/GetShopInfo',
    method: 'get',
    params: query
  })
}

export function GetShopInfoDetail(query) {
  return request({
    url: '/ShopInfo/GetShopInfoDetail',
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

  export function CreateShopInfo(data) {
    return request({
      url: '/ShopInfo/CreateShopInfo',
      method: 'post',
      data
    })
  }

  export function UpdateShopInfo(data) {
    return request({
      url: '/ShopInfo/UpdateShopInfo',
      method: 'post',
      data
    })
  }

  export function PassInfo(query) {
    return request({
      url: '/ShopInfo/PassInfo',
      method: 'get',
      params:query
    })
  }

  export function UnpassInfo(query) {
    return request({
      url: '/ShopInfo/UnpassInfo',
      method: 'get',
      params:query
    })
  }

  export function EndLease(query) {
    return request({
      url: '/ShopInfo/EndLease',
      method: 'get',
      params:query
    })
  }

  export function SecondHand(data) {
    return request({
      url: '/ShopInfo/SecondHand',
      method: 'post',
      data
    })
  }

  export function GetShopDetailUserInfo(query) {
    return request({
      url: '/ShopInfo/GetShopDetailUserInfo',
      method: 'get',
      params:query
    })
  }

  export function GetShopUserInfo(query) {
    return request({
      url: '/ShopInfo/GetShopUserInfo',
      method: 'get',
      params:query
    })
  }

  export function ExportShopInfo(query) {
    return request({
      url: '/ShopInfo/ExportShopInfo',
      method: 'get',
      params:query
    })
  }



