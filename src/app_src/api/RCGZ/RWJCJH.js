import request from '@/frame_src/utils/request'

export function GetTaskInfo(query) {
  return request({
    url: '/Task/GetTaskInfo',
    method: 'get',
    params: query
  })
}


export function GetPlanCheckAndDetail(query) {
    return request({
      url: '/Task/GetPlanCheckAndDetail',
      method: 'get',
      params: query
    })
  }
export function DeleteTask(query) {
    return request({
      url: '/Task/DeleteTask',
      method: 'get',
      params: query
    })
  }
  export function CreateTask(data) {
    return request({
      url: '/Task/CreateTask',
      method: 'post',
      data
    })
  }

  export function UpdateTask(data) {
    return request({
      url: '/Task/UpdateTask',
      method: 'post',
      data
    })
  }