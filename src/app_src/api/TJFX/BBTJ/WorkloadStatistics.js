import request from '@/frame_src/utils/request'
export function WorkloadStatistics(query) {
    return request({
      url: '/CheckReport/WorkloadStatistics',
      method: 'get',
      params: query
    })
  }

   export function WorkloadStatisticsDetail(query) {
    return request({
      url: '/CheckReport/WorkloadStatisticsDetail',
      method: 'get',
      params: query
    })
  }