import request from '@/frame_src/utils/request'

export function GetCheckResult(query) {
  return request({
    url: '/CheckResult/GetCheckResult',
    method: 'get',
    params: query
  })
}

export function GetCheckResultDetail(query) {
  return request({
    url: '/CheckResult/GetCheckResultDetail',
    method: 'get',
    params: query
  })
}

export function GetTaskProcessInfo(query) {
    return request({
      url: '/CheckResult/GetTaskProcessInfo',
      method: 'get',
      params: query
    })
  }

  export function Rectification(data) {
    return request({
      url: '/CheckResult/Rectification',
      method: 'post',
      data
    })
  }