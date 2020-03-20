import request from '@/frame_src/utils/request'

export function GetCheckPlan(query) {
  return request({
    url: '/CheckPlan/GetCheckPlan',
    method: 'get',
    params: query
  })
}

export function GetCheckPlanDetail(query) {
    return request({
      url: '/CheckPlan/GetCheckPlanDetail',
      method: 'get',
      params: query
    })
  }

  export function DeleteCheckPlan(query) {
    return request({
      url: '/CheckPlan/DeleteCheckPlan',
      method: 'get',
      params: query
    })
  }
  export function DeleteCheckPlanDetail(query) {
    return request({
      url: '/CheckPlan/DeleteCheckPlanDetail',
      method: 'get',
      params: query
    })
  }

export function CreateCheckPlan(data) {
    return request({
      url: '/CheckPlan/CreateCheckPlan',
      method: 'post',
      data
    })
  }

  export function UpdateCheckPlan(data) {
    return request({
      url: '/CheckPlan/UpdateCheckPlan',
      method: 'post',
      data
    })
  }