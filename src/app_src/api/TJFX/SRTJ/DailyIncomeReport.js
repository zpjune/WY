import request from '@/frame_src/utils/request'
export function GetWYIncomeReport(query) {
    return request({
      url: '/IncomeReport/GetWYIncomeReport',
      method: 'get',
      params: query
    })
  }


  export function GetPFIncomeReport(query) {
    return request({
      url: '/IncomeReport/GetPFIncomeReport',
      method: 'get',
      params: query
    })
  }