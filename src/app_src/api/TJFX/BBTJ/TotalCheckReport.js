import request from '@/frame_src/utils/request'

export function GetCheckResult(query) {
  return request({
    url: '/CheckReport/GetCheckResult',
    method: 'get',
    params: query
  })
}

export function GetCheckResultDetail(query) {
  return request({
    url: '/CheckReport/GetCheckResultDetail',
    method: 'get',
    params: query
  })
}

export function GetParentCheckCodeOptions(query) {
    return request({
      url: '/CheckReport/GetParentCheckCodeOptions',
      method: 'get',
      params: query
    })
  }

  export function ExportTotalCheckReport(query) {
    return request({
      url: '/CheckReport/ExportTotalCheckReport',
      method: 'get',
      params: query
    })
  }