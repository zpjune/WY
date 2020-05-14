import request from '@/frame_src/utils/request'

export function GetData(query) {
    return request({
      url: '/EleManage/GetData',
      method: 'get',
      params: query
    })
  }
  export function QingLing(data) {
    return request({
      url: '/EleManage/QingLing',
      method: 'post',
      data
    })
  } 
  export function KaiHu(data) {
    return request({
      url: '/EleManage/KaiHu',
      method: 'post',
      data
    })
  } 
  export function GetWaterData(query) {
    return request({
      url: '/EleManage/GetWaterData',
      method: 'get',
      params: query
    })
  }
  export function ExportWaterData(query) {
    return request({
      url: '/EleManage/ExportWaterData',
      method: 'get',
      params: query
    })
  }
  export function GetEleData(query) {
    return request({
      url: '/EleManage/GetEleData',
      method: 'get',
      params: query
    })
  }
  export function ExportEleData(query) {
    return request({
      url: '/EleManage/ExportEleData',
      method: 'get',
      params: query
    })
  }
  export function getEleWaterWarningMsg(query) {
    return request({
      url: '/EleManage/getEleWaterWarningMsg',
      method: 'get',
      params: query
    })
  }