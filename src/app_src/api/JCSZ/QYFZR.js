import request from '@/frame_src/utils/request'

export function GetRegionDirector(query) {
  return request({
    url: '/RegionDirector/GetRegionDirector',
    method: 'get',
    params: query
  })
}

export function DeleteRegionDirector(query) {
    return request({
      url: '/RegionDirector/DeleteRegionDirector',
      method: 'get',
      params: query
    })
  }

  export function CreateRegionDirector(data) {
    return request({
      url: '/RegionDirector/CreateRegionDirector',
      method: 'post',
      data
    })
  } 

  export function UpdateRegionDirector(data) {
    return request({
      url: '/RegionDirector/UpdateRegionDirector',
      method: 'post',
      data
    })
  } 