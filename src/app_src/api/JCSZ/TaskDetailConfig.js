import request from '@/frame_src/utils/request'

export function GetTaskDetailConfig(query) {
  return request({
    url: '/TaskDetailConfig/GetTaskDetailConfig',
    method: 'get',
    params: query
  })
}

export function DeleteTaskDetailConfig(query) {
    return request({
      url: '/TaskDetailConfig/DeleteTaskDetailConfig',
      method: 'get',
      params: query
    })
  }

  export function CreateTaskDetailConfig(data) {
    return request({
      url: '/TaskDetailConfig/CreateTaskDetailConfig',
      method: 'post',
      data
    })
  } 

  export function UpdateTaskDetailConfig(data) {
    return request({
      url: '/TaskDetailConfig/UpdateTaskDetailConfig',
      method: 'post',
      data
    })
  } 

  export function GetParentCodeConfig(data) {
    return request({
      url: '/TaskDetailConfig/GetParentCodeConfig',
      method: 'get',
      data
    })
  } 