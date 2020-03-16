import request from '@/frame_src/utils/request'

export function GetHouseInfo(query) {
  return request({
    url: '/HouseInfo/GetHouseInfo',
    method: 'get',
    params: query
  })
}
export function uploadHouseImg(data) {
  return request({
    url: '/HouseInfo/uploadHouseImg',
    method: 'post',
    data
  })
}

export function CreateHouseInfo(data) {
    return request({
      url: '/HouseInfo/CreateHouseInfo',
      method: 'post',
      data
    })
  }
  export function UpdateHouseInfo(data) {
    return request({
      url: '/HouseInfo/UpdateHouseInfo',
      method: 'post',
      data
    })
  }
  export function DeleteHouseInfo(query) {
    return request({
      url: '/HouseInfo/DeleteHouseInfo',
      method: 'get',
      params:query
    })
  }

  export function ExportHouseInfo(query) {
    return request({
      url: '/HouseInfo/ExportHouseInfo',
      method: 'get',
      params:query
    })
  }
