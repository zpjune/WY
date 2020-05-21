import request from '@/frame_src/utils/request'
export function GetWYIncomeReport(query) {
    return request({
      url: '/IncomeReport/GetWYIncomeReport',
      method: 'get',
      params: query
    })
  }